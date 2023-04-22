import { reqGithubStar } from './api/github'
import { getNpmNameAndPageIdBy, patchPackageData } from './api/notion'
import { getWeeklyDownloadCountBy, reqPackageMetadata } from './api/npm'
import { getNpmMirrorWeeklyDownloadCountBy } from './api/npmmirror'
import { NotionPageIds, NpmPackagesProperties } from './config/notion'
import { transRepositoryUrl } from './utils/utils'

export async function syncNotionDateNpmPackages() {
  const AllPackages = await getNpmNameAndPageIdBy(NotionPageIds.npmPackage)
  if (!AllPackages)
    throw new Error('empty packages')

  for (const aPackage of AllPackages) {
    // eslint-disable-next-line no-console
    console.log('aPackage', aPackage)
    const { pageId, npmName } = aPackage
    if (!npmName)
      throw new Error('empty npm name')
    const { time, bugs, homepage, repository } = await reqPackageMetadata(npmName)

    const lastPublish = time.modified
    const github = transRepositoryUrl({ time, bugs, homepage, repository })
    const homePage = homepage

    const weeklyDownload = await getWeeklyDownloadCountBy(npmName)
    const npmMirrorWeeklyDownload = await getNpmMirrorWeeklyDownloadCountBy(npmName)
    const githubStar = await reqGithubStar(github)

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

    await patchPackageData(pageId, properties)
  }
}
