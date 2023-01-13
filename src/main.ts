import { reqGithubStar } from './api/github'
import { getAllPageIdsFromDatabase, getNpmNameBy, patchPackageData } from './api/notion'
import { type PackageMetadata, getWeeklyDownloadCountBy, reqPackageMetadata } from './api/npm'
import { getNpmMirrorWeeklyDownloadCountBy } from './api/npmmirror'
import { NpmPackageBlocks } from './services/notion'
import { getOwnerAndRepo, getRepositoryUrl } from './utils/utils'

async function run() {
  try {
    const pageIds = await getAllPageIdsFromDatabase()
    if (!pageIds) return
    const AllPackages = await Promise.all(
      pageIds.map(async (pageId) => {
        return { pageId, npmName: await getNpmNameBy(pageId) }
      }))

    for (const aPackage of AllPackages) {
      /* eslint-disable no-console */
      console.log('aPackage', aPackage)
      const { pageId, npmName } = aPackage
      const packageMetadata = await reqPackageMetadata(npmName)
      const lastPublish = packageMetadata.time.modified
      const Repository = transRepositoryUrl(packageMetadata)
      const githubStar = await reqGithubStar(Repository)
      const weeklyDownload = await getWeeklyDownloadCountBy(npmName)
      const npmMirrorWeeklyDownload = await getNpmMirrorWeeklyDownloadCountBy(npmName)
      const homePage = packageMetadata?.homepage

      console.log('weeklyDownload', weeklyDownload)
      console.log('npmMirrorWeeklyDownload', npmMirrorWeeklyDownload)
      console.log('lastPublish', lastPublish)
      console.log('githubStar', githubStar)
      /* eslint-enable no-console */

      const { starCount, npmWeeklyDownloadsCount, npmMirrorWeeklyDownloadsCount, lastPublishDate, githubURL, homepageURL } = NpmPackageBlocks

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
          url: Repository,
        },
        [homepageURL]: {
          url: homePage,
        },
      }
      await patchPackageData(pageId, properties)
    }
  }
  catch (e) {
    console.error(e)
  }
}

function transRepositoryUrl(packageMetadata: PackageMetadata) {
  /* eslint-disable no-console */
  console.log('# packageMetadata.bugs', packageMetadata.bugs)
  console.log('# packageMetadata.repository', packageMetadata.repository)
  console.log('# getRepositoryUrl(packageMetadata.repository.url)', getRepositoryUrl(packageMetadata.repository.url))
  console.log('# packageMetadata.homepage', packageMetadata.homepage)
  /* eslint-enable no-console */
  const repositoryUrl: string = packageMetadata.bugs.url.slice(0, -7) || getRepositoryUrl(packageMetadata.repository.url) || packageMetadata.homepage
  return getOwnerAndRepo(repositoryUrl)
}

run()
