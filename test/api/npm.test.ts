import { beforeAll, describe, expect, it } from 'vitest'
import { getWeeklyDownloadCountBy, reqPackageMetadata } from '../../src/api/npm'

describe('getWeeklyDownloadCountBy', () => {
  it('should return Weekly Download Count', async () => {
    expect(await getWeeklyDownloadCountBy('qwik')).toBeTypeOf('number')
  })
})

describe('reqPackageMetadata', () => {
  let data: any
  beforeAll(async () => {
    data = await reqPackageMetadata('vue')
  })
  it('should return data', async () => {
    expect(data).toBeTypeOf('object')
  })
  it('should return data with homepage', async () => {
    expect(data).toHaveProperty('homepage')
  })
  it('should return data with repository', async () => {
    expect(data).toHaveProperty('repository')
  })
  it('should return data with bugs', async () => {
    expect(data).toHaveProperty('bugs')
  })
  it('should return data with time', async () => {
    expect(data).toHaveProperty('time')
  })
})
