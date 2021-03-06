export const taskScenariofieldConfig = {
  _id: '5a977492a4e7b30012b6437c',
  name: '需求',
  _creatorId: '5795ae540add8b24078fcb7d',
  objectType: 'task',
  _projectId: '5a977492a4e7b30012b6436b',
  _taskflowId: '5a977492a4e7b30012b6436c',
  icon: 'requirement',
  proTemplateConfigType: 'story',
  scenariofields: [
    {
      fieldType: 'note',
      _id: '5a98e63858f6300012e544c5',
      required: false,
      displayed: true,
      _roleIds: []
    },
    {
      fieldType: 'storyPoint',
      _id: '5a98e63858f6300012e544c4',
      required: false,
      displayed: true,
      _roleIds: []
    },
    {
      fieldType: 'priority',
      _id: '5a98e63858f6300012e544c3',
      required: false,
      displayed: true,
      _roleIds: []
    },
    {
      fieldType: 'sprint',
      _id: '5a98e63858f6300012e544c2',
      required: false,
      displayed: true,
      _roleIds: []
    },
    {
      fieldType: 'taskProgress',
      _id: '5a98e63858f6300012e544c1',
      required: false,
      displayed: true,
      _roleIds: []
    },
    {
      fieldType: 'tag',
      _id: '5a98e63858f6300012e544c0',
      required: false,
      displayed: true,
      _roleIds: []
    }
  ],
  created: '2018-03-01T03:33:38.829Z',
  updated: '2018-03-02T05:50:48.968Z',
  isDefault: true,
  displayed: true,
  taskflowstatuses: [
    {
      _id: '5a977492a4e7b30012b6436f',
      _taskflowId: '5a977492a4e7b30012b6436c',
      name: '待处理待处理待处理待处理待处理待处理待处理待处理',
      kind: 'start',
      rejectStatusIds: [],
      pos: 34304
    },
    {
      _id: '5a9903ccc552e600126784db',
      _taskflowId: '5a977492a4e7b30012b6436c',
      name: '第三个',
      kind: 'start',
      rejectStatusIds: [],
      pos: 34560
    },
    {
      _id: '5a977492a4e7b30012b64370',
      _taskflowId: '5a977492a4e7b30012b6436c',
      name: '开发中',
      kind: 'unset',
      rejectStatusIds: [],
      pos: 34816
    },
    {
      _id: '5a9903c5c552e600126784d4',
      _taskflowId: '5a977492a4e7b30012b6436c',
      name: '开发3',
      kind: 'unset',
      rejectStatusIds: [],
      pos: 99840
    },
    {
      _id: '5a97d118e5f65d00127c5f46',
      _taskflowId: '5a977492a4e7b30012b6436c',
      name: '测试',
      kind: 'unset',
      rejectStatusIds: [],
      pos: 105216
    },
    {
      _id: '5a977492a4e7b30012b64371',
      _taskflowId: '5a977492a4e7b30012b6436c',
      name: '已完成-没有的',
      kind: 'end',
      rejectStatusIds: [],
      pos: 107008
    },
    {
      _id: '5a97a44d2530350012583511',
      _taskflowId: '5a977492a4e7b30012b6436c',
      name: '待处理',
      kind: 'end',
      rejectStatusIds: [],
      pos: 638976
    }
  ]
}

export const eventScenariofieldConfig = {
  _id: '59fa8b97d564c422688da661',
  name: '日程',
  _creatorId: '56efaff50e5a879506e2dbb4',
  objectType: 'event',
  _projectId: '59ef11dfb29c94454cd453d7',
  _taskflowId: null,
  icon: 'event',
  proTemplateConfigType: null,
  scenariofields: [
    {
      fieldType: 'location',
      _id: '59fa8b9774d33ffedc74f12f',
      required: false,
      displayed: true,
      _roleIds: []
    },
    {
      fieldType: 'content',
      _id: '59fa8b9774d33ffedc74f12e',
      required: false,
      displayed: true,
      _roleIds: []
    },
    {
      fieldType: 'tag',
      _id: '59fa8b9774d33ffedc74f12d',
      required: false,
      displayed: true,
      _roleIds: []
    }
  ],
  created: '2017-11-02T03:05:59.121Z',
  updated: '2017-11-02T03:05:59.121Z',
  isDefault: true,
  displayed: false
}
