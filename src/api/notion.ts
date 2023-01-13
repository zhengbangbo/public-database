import { Client } from '@notionhq/client'
import type {
  PageObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints'
import * as dotenv from 'dotenv'
import { NpmPackageBlocks } from '../services/notion'

dotenv.config()
const notion = new Client({ auth: process.env.NOTION_TOKEN })

const database_id = '75dc1174b0394f04acde30a004683f68'

export const getAllPageIdsFromDatabase = async () => {
  try {
    const res: QueryDatabaseResponse = await notion.databases.query({ database_id })
    return res.results.map(item => item.id)
  }
  catch (e) {
    console.error(e)
  }
}
export const getNpmNameBy = async (page_id: string) => {
  try {
    // https://github.com/makenotion/notion-sdk-js/issues/331#issuecomment-1196940929
    const response: PageObjectResponse | PartialPageObjectResponse = await notion.pages.retrieve({ page_id })
    if ('properties' in response) {
      const title = response.properties[NpmPackageBlocks.title]
      if ('title' in title)
        return title.title[0].plain_text
    }
    //   {
    //   id: 'title',
    //   type: 'title',
    //   title: [
    //     {
    //       type: 'text',
    //       text: [Object],
    //       annotations: [Object],
    //       plain_text: 'reveal.js',
    //       href: null
    //     }
    //   ]
    // }
  }
  catch (e) {
    console.error(e)
  }
}

export const patchPackageData = (page_id: string, properties: any) => notion.pages.update({ page_id, properties })
