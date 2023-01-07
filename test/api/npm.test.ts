import { describe, expect, it } from 'vitest'
import { getWeeklyDownloadCountBy, reqPackageMetadata } from '../../src/api/npm'

describe('getWeelkyDownloadCountBy', () => {
  it('should return Weekly Download Count', async () => {
    expect(await getWeeklyDownloadCountBy('vue')).toBeTypeOf('number')
  })
})

describe('reqPackageMetadata', () => {
  it('should return data', async () => {
    expect(await reqPackageMetadata('vue')).toBeTypeOf('object')
  })
})
