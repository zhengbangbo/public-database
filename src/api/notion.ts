import { Client } from '@notionhq/client'
import * as dotenv from 'dotenv'

dotenv.config()
const notion = new Client({ auth: process.env.NOTION_TOKEN })

const database_id = '75dc1174b0394f04acde30a004683f68'

export const getAllPageIdsFromDatabase = () => notion.databases.query({ database_id }).then(
  (res) => {
    const result: string[] = []
    res.results.forEach((item) => {
      result.push(item.id)
    })
    return result
  },
)

export const getNpmNameBy = (page_id: string) => notion.pages.retrieve({ page_id }).then(
  (res) => {
    // https://github.com/makenotion/notion-sdk-js/issues/331#issuecomment-1196940929
    if (!('properties' in res)) return

    const npmName = res.properties.Name

    if (!('title' in npmName)) return

    for (const item of npmName.title) {
      if (item.plain_text !== '')
        return item.plain_text
    }
  },
)

export const patchPackageData = (page_id: string, properties: any) => notion.pages.update({ page_id, properties })
