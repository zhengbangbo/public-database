import { Client } from '@notionhq/client'
import * as dotenv from 'dotenv'
import { NpmPackagesProperties } from '../config/notion'

dotenv.config()
const notion = new Client({ auth: process.env.NOTION_TOKEN })

export async function queryDatabase(database_id: string) {
  if (!database_id)
    throw new Error('Empty database id')
  return (await notion.databases.query({ database_id })).results
}

export async function getNpmNameAndPageIdBy(database_id: string) {
  const data = await queryDatabase(database_id)
  if (data.length === 0)
    throw new Error('Empty database')

  return data.map(
    (item: any) => ({
      pageId: item.id,
      npmName: item.properties[NpmPackagesProperties.title].title[0].plain_text || item.properties[NpmPackagesProperties.title].title[1].plain_text,
    }))
}

export async function getNpmNameBy(page_id: string) {
  if (!page_id)
    throw new Error('empty page id')
  // https://github.com/makenotion/notion-sdk-js/issues/331#issuecomment-1196940929
  const response = await notion.pages.retrieve({ page_id })

  if ('properties' in response) {
    const titleObj = response.properties[NpmPackagesProperties.title]
    if ('title' in titleObj)
      return titleObj.title[0].plain_text
  }
}

export function patchPackageData(page_id: string, properties: any) {
  return notion.pages.update({ page_id, properties })
}
