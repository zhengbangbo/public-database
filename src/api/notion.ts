import { Client } from '@notionhq/client'
import * as dotenv from 'dotenv'

dotenv.config()
const notion = new Client({ auth: process.env.NOTION_TOKEN })

const database_id = '75dc1174b0394f04acde30a004683f68'

type page_id = string

// Query a database
export const reqPagesId = () => notion.databases.query({ database_id }).then(
  (res) => {
    const pageIdList: page_id[] = []
    res.results.forEach((item) => {
      pageIdList.push(item.id)
    })
    return pageIdList
  },
)

// Retrieve a page
export const reqNpmName = (page_id: string) => notion.pages.retrieve({ page_id }).then(
  (res) => {
    // https://github.com/makenotion/notion-sdk-js/issues/331#issuecomment-1196940929
    if ('properties' in res) {
      const npm = res.properties.npm
      if ('rich_text' in npm) {
        if (npm.rich_text.length !== 1) {
          return ''
        }
        else {
          const text = npm.rich_text[0].plain_text
          return text
        }
      }
      else {
        return ''
      }
    }
    else {
      return ''
    }
  },
)

export interface PackageData {
  weeklyDownload: number | null
  githubStar: number | null
  lastPublish: string

}

export const reqPackageData = (page_id: page_id) => notion.pages.retrieve({ page_id }).then(
  (res) => {
    const data: PackageData = {
      weeklyDownload: 0,
      githubStar: 0,
      lastPublish: '',
    }
    if ('properties' in res) {
      // Note: The following three property names are hard-coded and fail here when the header is modified
      const weeklyDownload = res.properties['Npm Weekly Downloads']
      const githubStar = res.properties['GitHub Star']
      const lastPublish = res.properties['Last Publish']

      if ('number' in weeklyDownload)
        data.weeklyDownload = weeklyDownload.number

      if ('number' in githubStar)
        data.githubStar = githubStar.number

      if ('rich_text' in lastPublish)
        data.lastPublish = lastPublish.rich_text.length === 1 ? lastPublish.rich_text[0].plain_text : ''
    }
    return data
  },
)

export const patchPackageData = (page_id: page_id, properties: any) => notion.pages.update({ page_id, properties })
