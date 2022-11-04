import { reqGithubStar } from './api/github'
import { type PackageData, patchPackageData, reqNpmName, reqPackageData, reqPagesId } from './api/notion'
import { reqPackageMetadata, reqWeeklyDownload } from './api/npm'
import { getOwnerAndRepo, getRepositoryUrl } from './util/utils'

interface ComponentLibraryData extends PackageData {
  pageId: string
  npmName?: string
}
const componentLibraryData: ComponentLibraryData[] = []

function transRepositoryUrl(packageMetadata: any) {
  const repositoryUrl: string = getRepositoryUrl(packageMetadata?.repository?.url) || packageMetadata?.bugs?.url?.slice(0, -7) || packageMetadata?.homepage
  return getOwnerAndRepo(repositoryUrl)
}

async function getNotionData() {
  const pagesId = await reqPagesId()
  await Promise.all(pagesId.map(async (pageId) => {
    const npmName = await reqNpmName(pageId)
    const { weeklyDownload, githubStar, lastPublish } = await reqPackageData(pageId)
    const eachPage: ComponentLibraryData = { pageId, npmName, weeklyDownload, githubStar, lastPublish }
    componentLibraryData.push(eachPage)
    return Promise.resolve()
  }))
}

async function run() {
  await getNotionData()

  if (!componentLibraryData.length) return

  await Promise.all(componentLibraryData.map(async (each) => {
    const npmName = each.npmName
    if (!npmName) return Promise.resolve()
    const packageMetadata = await reqPackageMetadata(npmName)
    const weeklyDownload = await reqWeeklyDownload(npmName)
    const lastPublish = packageMetadata.time.modified
    const Repository = transRepositoryUrl(packageMetadata)
    const githubStar = await reqGithubStar(Repository)
    /* eslint-disable no-console */
    console.log(npmName)
    console.log('weeklyDownload', weeklyDownload)
    console.log('lastPublish', lastPublish)
    // console.log('homePage', homePage)
    console.log('githubStar', githubStar)
    /* eslint-enable no-console */
    const properties = {
      'GitHub Star': {
        number: githubStar,
      },
      'Weekly Downloads': {
        number: weeklyDownload,
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
    }
    await patchPackageData(each.pageId, properties)
    return Promise.resolve()
  }))
}

run()
