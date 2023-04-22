import { describe, expect, it } from 'vitest'
import { getNpmNameAndPageIdBy, getNpmNameBy, queryDatabase } from '../../src/api/notion'
import { NotionPageIds } from '../../src/config/notion'

const database_id = NotionPageIds.npmPackage

describe('queryDatabase', () => {
  it('should return npm name', async () => {
    const result = await queryDatabase(database_id)
    expect(result).toBeTypeOf('object')
  })
})

describe('getNpmNameAndPageIdBy', () => {
  it('should return npm name and page id pairs', async () => {
    const result = await getNpmNameAndPageIdBy(database_id)
    expect(result).toBeTypeOf('object')
    expect(result[0]).toHaveProperty('npmName')
    expect(result[0]).toHaveProperty('pageId')
  })
})

describe('getNpmNameBy', () => {
  it('should return npm name', async () => {
    const pageId = await getNpmNameAndPageIdBy(database_id).then(result => result[0].pageId)
    const result = await getNpmNameBy(pageId)
    expect(result).toBeTypeOf('string')
  })
})
