import { Client } from '@notionhq/client'
import * as dotenv from 'dotenv'
import { NpmPackagesProperties } from '../config/notion'

dotenv.config()
const notion = new Client({ auth: process.env.NOTION_TOKEN })

export const getAllPageIdsFromDatabase = async (database_id: string) => {
  if (!database_id) throw new Error('empty database id')
  const response = await notion.databases.query({ database_id })
  return response.results.map(item => item.id)
}

export const getNpmNameBy = async (page_id: string) => {
  if (!page_id) throw new Error('empty page id')
  // https://github.com/makenotion/notion-sdk-js/issues/331#issuecomment-1196940929
  const response = await notion.pages.retrieve({ page_id })
  if ('properties' in response) {
    const titleObj = response.properties[NpmPackagesProperties.title]
    if ('title' in titleObj)
      return titleObj.title[0].plain_text
  }
}

export const patchPackageData = (page_id: string, properties: any) => notion.pages.update({ page_id, properties })
