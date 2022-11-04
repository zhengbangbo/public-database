import { $fetch } from 'ohmyfetch'

// https://github.com/npm/registry/blob/master/docs/download-counts.md
export const reqWeeklyDownload = async (npmName: string | undefined) => {
  if (!npmName) return

  const url = `https://api.npmjs.org/downloads/point/last-week/${npmName}`
  try {
    const { downloads } = await $fetch(url)
    return downloads
  }
  catch (error) {
    console.error(error)
  }
}

// https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md
export interface PackageMetadata {
  time: {
    modified: string
  }
  homepage: string
  repository: {
    url: string
  }
  bugs: {
    url: string
  }
}
export const reqPackageMetadata = async (npmName: string | undefined) => {
  if (!npmName) throw new Error('empty npmName')

  return await $fetch(`https://registry.npmjs.org/${npmName}`) as PackageMetadata
}
