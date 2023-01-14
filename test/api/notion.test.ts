import { describe, expect, it } from 'vitest'
import { getAllPageIdsFromDatabase, getNpmNameBy } from '../../src/api/notion'
import { NotionPageIds } from '../../src/config/notion'

const database_id = NotionPageIds.npmPackage
describe('getNpmNameBy', () => {
  it('should return npm name', async () => {
    const pageIds = await getAllPageIdsFromDatabase(database_id)
    const npmName = await getNpmNameBy(pageIds[0])
    expect(npmName).toBeTypeOf('string')
  })
})

describe('getAllPageIdsFromDatabase', () => {
  it('should return page id', async () => {
    const pageIds: string[] = await getAllPageIdsFromDatabase(database_id)
    expect(pageIds[0]).toBeTypeOf('string')
  })
})
