import { describe, expect, it } from 'vitest'
import { getAllPageIdsFromDatabase, getNpmNameBy } from '../../src/api/notion'

describe('getNpmNameBy', () => {
  it('should return npm name', async () => {
    const pageIds = await getAllPageIdsFromDatabase()
    expect(await getNpmNameBy(pageIds[0])).toMatchInlineSnapshot('"@antv/s2"')
  })
})

describe('getAllPageIdsFromDatabase', () => {
  it('should return page id', async () => {
    expect((await getAllPageIdsFromDatabase())[0]).toMatchInlineSnapshot('"f0cd9abe-5654-44d4-af88-c0bff25bdc27"')
  })
})
