import { describe, expect, it } from 'vitest'
import { getAllPageIdsFromDatabase, getNpmNameBy } from '../../src/api/notion'

describe('getNpmNameBy', () => {
  it('should return npm name', async () => {
    const pageIds = await getAllPageIdsFromDatabase()
    // expect(await getNpmNameBy(pageIds[0])).toBeTypeOf('string')
    expect(await getNpmNameBy(pageIds[0])).toBeTypeOf('string')
  })
})

describe('getAllPageIdsFromDatabase', () => {
  it('should return page id', async () => {
    expect((await getAllPageIdsFromDatabase())[0]).toBeTypeOf('string')
  })
})
