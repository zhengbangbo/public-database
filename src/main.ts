import { reqGithubStar } from './api/github'
import { getAllPageIdsFromDatabase, getNpmNameBy, patchPackageData } from './api/notion'
import { type PackageMetadata, getWeeklyDownloadCountBy, reqPackageMetadata } from './api/npm'
import { getNpmMirrorWeeklyDownloadCountBy } from './api/npmmirror'
import { getOwnerAndRepo, getRepositoryUrl } from './utils/utils'

async function run() {
  try {
    const pageIds = await getAllPageIdsFromDatabase()
    const AllPackages = await Promise.all(
      pageIds.map(async (pageId) => {
        return { pageId, npmName: await getNpmNameBy(pageId) }
      }))

    for (const aPackage of AllPackages) {
      const { pageId, npmName } = aPackage
      const packageMetadata = await reqPackageMetadata(npmName)
      const lastPublish = packageMetadata.time.modified
      const Repository = transRepositoryUrl(packageMetadata)
      const githubStar = await reqGithubStar(Repository)

      const weeklyDownload = await getWeeklyDownloadCountBy(npmName)
      const npmMirrorWeeklyDownload = await getNpmMirrorWeeklyDownloadCountBy(npmName)

      /* eslint-disable no-console */
      console.log('npmName', npmName)
      console.log('weeklyDownload', weeklyDownload)
      console.log('npmMirrorWeeklyDownload', npmMirrorWeeklyDownload)
      console.log('lastPublish', lastPublish)
      // console.log('homePage', homePage)
      console.log('githubStar', githubStar)
      /* eslint-enable no-console */

      const properties = {
        'GitHub Star': {
          number: githubStar,
        },
        'Npm Weekly Downloads': {
          number: weeklyDownload,
        },
        'NpmMirror Weekly Downloads': {
          number: npmMirrorWeeklyDownload,
        },
        'Last Publish': {
          rich_text: [
            {
              plain_text: lastPublish,
              text: {
                content: lastPublish,
              },
            },
          ],
        },
        'GitHub': {
          url: getRepositoryUrl(packageMetadata.repository.url) || packageMetadata.bugs.url.slice(0, -7) || packageMetadata.homepage,
        },
        'Homepage': {
          url: packageMetadata?.homepage,
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
  const repositoryUrl: string = getRepositoryUrl(packageMetadata.repository.url) || packageMetadata.bugs.url.slice(0, -7) || packageMetadata.homepage
  return getOwnerAndRepo(repositoryUrl)
}

run()
