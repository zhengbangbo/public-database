export interface NpmPackage {
  Name: string
  'Npm Weekly Download': string
  'NpmMirror Weekly Download': string
  'GitHub Star': number
  'Last Publish': number
  'GitHub': string
  'Homepage': string
}

export const NpmPackageBlocks = {
  title: 'Name',
  npmWeeklyDownloadsCount: 'Npm Weekly Downloads',
  npmMirrorWeeklyDownloadsCount: 'NpmMirror Weekly Downloads',
  starCount: 'GitHub Star',
  lastPublishDate: 'Last Publish',
  githubURL: 'GitHub',
  homepageURL: 'Homepage',
}
