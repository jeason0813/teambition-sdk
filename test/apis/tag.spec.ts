import { describe, before, beforeEach, afterEach, it, after } from 'tman'
import { Scheduler } from 'rxjs'
import { expect } from 'chai'

import { SDKFetch, createSdk, SDK } from '../'
import { projectTag, organizationTag } from '../fixtures/tags.fixture'
import { mock, expectToDeepEqualForFieldsOfTheExpected } from '../utils'
import { OrganizationId, ProjectId } from 'teambition-types'

const fetchMock = require('fetch-mock')

describe('TagApi request spec: ', () => {
  before(() => {
    SDKFetch.fetchTail = '666'
  })

  after(() => {
    SDKFetch.fetchTail = undefined
  })

  let sdkFetch: SDKFetch

  beforeEach(() => {
    sdkFetch = new SDKFetch()
    sdkFetch.setAPIHost('')
  })

  afterEach(() => {
    fetchMock.restore()
  })

  it('should return a Project Tag array', function* () {
    const projectId: ProjectId = projectTag._projectId
    const tags = [projectTag]
    const url = `/tags?tagType=project&_projectId=${projectId}&_=666`

    fetchMock.once(url, tags)

    yield sdkFetch.getTags(projectId)
      .subscribeOn(Scheduler.asap)
      .do((result) => expect(result).to.deep.equal(tags))
  })

  it('should return an Organization Tag array', function* () {
    const orgId: OrganizationId = organizationTag._organizationId
    const tags = [projectTag]
    const url = `/tags?tagType=organization&_organizationId=${orgId}&_=666`

    fetchMock.once(url, tags)

    yield sdkFetch.getTags(orgId, 'organization')
      .subscribeOn(Scheduler.asap)
      .do((result) => expect(result).to.deep.equal(tags))
  })
})

describe('TagApi spec: ', () => {
  let sdk: SDK
  let mockResponse: <T>(m: T, schedule?: number | Promise<any>) => void

  beforeEach(() => {
    sdk = createSdk()
    mockResponse = mock(sdk)
  })

  it('should return a Project Tag array', function* () {
    const projectId: ProjectId = projectTag._projectId
    const tags = [projectTag]
    mockResponse(tags)

    yield sdk.getTags(projectId)
      .values()
      .subscribeOn(Scheduler.asap)
      .do(([result]) => {
        expectToDeepEqualForFieldsOfTheExpected(result, tags[0])
      })
  })

  it('should return an Organization Tag array', function* () {
    const orgId: OrganizationId = organizationTag._organizationId
    const tags = [organizationTag]
    mockResponse(tags)

    yield sdk.getTags(orgId, 'organization')
      .values()
      .subscribeOn(Scheduler.asap)
      .do(([result]) => {
        expectToDeepEqualForFieldsOfTheExpected(result, tags[0])
      })
  })
})
