import { reqGithubStar } from './api/github'
import { type PackageData, patchPackageData, reqNpmName, reqPackageData, reqPagesId } from './api/notion'
import { type PackageMetadata, reqPackageMetadata, reqWeeklyDownload } from './api/npm'
import { getOwnerAndRepo, getRepositoryUrl } from './util/utils'
import { reqNpmMirrorWeeklyDownload } from './api/npmmirror'

interface ComponentLibraryData extends PackageData {
  pageId: string
  npmName?: string
}
const componentLibraryData: ComponentLibraryData[] = []

function transRepositoryUrl(packageMetadata: PackageMetadata) {
  const repositoryUrl: string = getRepositoryUrl(packageMetadata.repository.url) || packageMetadata.bugs.url.slice(0, -7) || packageMetadata.homepage
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
    const npmMirrorWeeklyDownload = await reqNpmMirrorWeeklyDownload(npmName)
    const lastPublish = packageMetadata.time.modified
    const Repository = transRepositoryUrl(packageMetadata)
    const githubStar = await reqGithubStar(Repository)
    /* eslint-disable no-console */
    console.log(npmName)
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
      'Name': {
        title: [
          {
            type: 'text',
            text: { content: Repository },
          },
        ],
      },
      'github': {
        url: getRepositoryUrl(packageMetadata.repository.url) || packageMetadata.bugs.url.slice(0, -7) || packageMetadata.homepage,
      },
      'homepage': {
        url: packageMetadata?.homepage,
      },
    }
    await patchPackageData(each.pageId, properties)
    return Promise.resolve()
  }))
}

run()
