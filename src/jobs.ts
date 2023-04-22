import { reqGithubStar } from './api/github'
import { getNpmNameAndPageIdBy, patchPackageData } from './api/notion'
import { getWeeklyDownloadCountBy, reqPackageMetadata } from './api/npm'
import { getNpmMirrorWeeklyDownloadCountBy } from './api/npmmirror'
import { NotionPageIds, NpmPackagesProperties } from './config/notion'
import { transRepositoryUrl } from './utils/utils'

export async function syncNotionDateNpmPackages() {
  const AllPackages = await getNpmNameAndPageIdBy(NotionPageIds.npmPackage)

  await setAllPackages(AllPackages)
}

export async function setAllPackages(AllPackages: any) {
  for (const aPackage of AllPackages) {
    const { pageId, npmName } = aPackage
    console.log(`start sync ${npmName}...${pageId}`)

    const { time, bugs, homepage, repository } = await reqPackageMetadata(npmName)

    const lastPublish = time.modified
    const github = transRepositoryUrl({ time, bugs, homepage, repository })
    const homePage = homepage

    const weeklyDownload = await getWeeklyDownloadCountBy(npmName)
    const npmMirrorWeeklyDownload = await getNpmMirrorWeeklyDownloadCountBy(npmName)
    const githubStar = await reqGithubStar(github)

    const properties = readyProps(githubStar, weeklyDownload, npmMirrorWeeklyDownload, lastPublish, github, homePage)

    await patchPackageData(pageId, properties)
  }
}

function readyProps(githubStar: any, weeklyDownload: any, npmMirrorWeeklyDownload: any, lastPublish: string, github: string, homePage: string | undefined) {
  const { starCount, npmWeeklyDownloadsCount, npmMirrorWeeklyDownloadsCount, lastPublishDate, githubURL, homepageURL } = NpmPackagesProperties

  const properties = {
    [starCount]: {
      number: githubStar,
    },
    [npmWeeklyDownloadsCount]: {
      number: weeklyDownload,
    },
    [npmMirrorWeeklyDownloadsCount]: {
      number: npmMirrorWeeklyDownload,
    },
    [lastPublishDate]: {
      date: {
        start: lastPublish,
      },
    },
    [githubURL]: {
      url: github,
    },
    [homepageURL]: {
      url: homePage,
    },
  }
  return properties
}
