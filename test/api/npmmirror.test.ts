import { describe, expect, it } from 'vitest'
import { getNpmMirrorWeeklyDownloadCountBy } from '../../src/api/npmmirror'

describe('getNpmMirrorWeeklyDownloadCountBy', () => {
  it('should return weekly download count ', async () => {
    expect(await getNpmMirrorWeeklyDownloadCountBy('vue')).toBeTypeOf('number')
  })
})
