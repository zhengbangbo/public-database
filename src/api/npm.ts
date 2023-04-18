import { $fetch } from 'ohmyfetch'

// https://github.com/npm/registry/blob/master/docs/download-counts.md
export async function getWeeklyDownloadCountBy(npmName: string) {
  if (!npmName)
    throw new Error('empty npmName')

  const url = `https://api.npmjs.org/downloads/point/last-week/${npmName}`
  const { downloads } = await $fetch(url)
  return downloads
}

// https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md
export interface PackageMetadata {
  time: {
    modified: string
  }
  homepage?: string
  repository: {
    url: string
    type?: string
    directory?: string
  }
  bugs?: {
    url: string
  }
}
export async function reqPackageMetadata(npmName: string) {
  if (!npmName)
    throw new Error('empty npmName')

  return await $fetch(`https://registry.npmjs.org/${npmName}`) as PackageMetadata
}
