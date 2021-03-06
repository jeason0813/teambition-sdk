/**
 * 这里的代码用来处理坏掉的后端 API
 * 做一些很脏的事情
 */
import { Observable } from 'rxjs/Observable'
import { Database, ExecutorResult } from 'reactivedb'
import { TaskSchema } from '../schemas/Task'
import { forEach, ParsedWSMessage } from './index'
import { mapWSMsgTypeToTable } from '../sockets/MapToTable'
import { marshaler as eventMarshaler } from '../apis/event/marshaler'
import { EventSchema } from '../schemas/Event'

export class Dirty {

  /**
   * 处理任务列表中坏掉的 subtaskCount 字段
   */
  handleMytasksApi (tasks: TaskSchema[]): TaskSchema[] {
    forEach(tasks, task => {
      delete task.subtaskCount
    })
    return tasks
  }

  handleSocketMessage(msg: ParsedWSMessage, db: Database): Observable<any> | null {
    const methods = [ '_handleLikeMessage', '_handleTaskUpdateFromSocket', '_handleMessage', '_handleEventMessage']
    let signal: Observable<any> | null = null
    forEach(methods, method => {
      const result = this[method](msg, db)
      if (result) {
        signal = result
        return false
      }
      return null
    })
    return signal
  }

  /**
   * 后端通知和消息存的是同一个模型，只是 msgType 以及 objectType 不同 (通知的objectType是'activity')
   * 所以前端如果要把这两个东西存成两个模型的话，需要在socket区分
   * 这里在重构chat的时候，直接过滤掉通知消息，当重构通知的时候，需要改动这里代码，把通知消息
   * 存在自己的表里
   */
  _handleMessage({ data }: ParsedWSMessage): Observable<any> | null {
    if ((data.msgType && data.msgType !== 'pm')) {
      // return db.upsert('ActivityMessage | PostMessage | ...', data)
      return Observable.of(null)
    }
    if (data === 'readAll:private' || data === 'readAll:normal' || data === 'readAll:later') {
      return Observable.of(null)
    }
    if (data.msgType === 'pm') {
      delete data.updated
    }
    return null
  }

  /**
   * 处理 socket 推送点赞数据变动的场景下
   * 后端认为这种数据应该被 patch 到它的实体上
   * 而前端需要将点赞数据分开存储
   */
  _handleLikeMessage({ id, type, data }: ParsedWSMessage, database: Database): Observable<ExecutorResult[]> | null {
    if (!data.likesGroup || !Array.isArray(data.likesGroup)) {
      return null
    }

    const ops: Observable<ExecutorResult>[] = []

    const like = mapWSMsgTypeToTable.getTableInfo('like')
    if (like) {
      ops.push(database.upsert(like.tabName, { ...data, [like.pkName]: `${id}:like` }))
    }

    const tabInfo = mapWSMsgTypeToTable.getTableInfo(type)
    if (tabInfo && tabInfo.tabName === 'Task') {
      const task = tabInfo
      ops.push(database.upsert(task.tabName, { ...data, [task.pkName]: id }))
    }

    return ops.length > 0 ? Observable.forkJoin(ops) : null
  }

  _handleTaskUpdateFromSocket({ data }: ParsedWSMessage): void {
    if (data &&
        !data._executorId &&
        typeof data.executor !== 'undefined') {
      delete data.executor
    }
  }

  _handleEventMessage({ id, type, method, data }: ParsedWSMessage, database: Database): void | Observable<ExecutorResult> {
    const tabInfo = mapWSMsgTypeToTable.getTableInfo(type)

    if (!tabInfo || tabInfo.tabName !== 'Event') {
      return
    }

    if (method === 'new') { // mutate data
      Object.assign(data, eventMarshaler.parse(data))
      return
    }

    if (method === 'change') {
      const { tabName, pkName } = tabInfo
      const patches: Partial<EventSchema>[] = Array.isArray(data)
        ? data
        : [{ ...data, [pkName]: id }]

      return database.get<EventSchema>(tabName, { where: {
        [pkName]: { $in: patches.map((update) => update[pkName]) }
      }}).values()
        .switchMap((existingEvents) => {
          return Observable.from(patches)
            .map((patch) => {
              const pkValue = patch[pkName]
              const target = existingEvents.find((x) => x[pkName] === pkValue)
              const parsed = eventMarshaler.parsePatch(patch, target)
              return database.upsert(tabName, parsed)
            })
            .mergeAll()
        })
    }
  }

  prefixWithColonIfItIsMissing(eventStr: string) {
    if (!eventStr.length) {
      return ':'
    }
    if (eventStr.charAt(0) !== ':') {
      return ':' + eventStr
    }
    return eventStr
  }
}

export default new Dirty
