import dayjs from 'dayjs'
import type { PackageMetadata } from '../api/npm'

export function transRepositoryUrl(packageMetadata: PackageMetadata) {
  const { bugs, repository, homepage } = packageMetadata
  const try1 = bugs?.url.slice(0, -7)
  const try2 = getRepositoryUrl(repository.url)
  const try3 = homepage
  if (try1 && isRepositoryUrl(try1))
    return try1
  if (try2 && isRepositoryUrl(try2))
    return try2
  if (try3 && isRepositoryUrl(try3))
    return try3
  throw new Error(`cannot trans repository url:
  bugs: ${bugs?.url}
  repository: ${repository.url}
  homepage: ${homepage}`)
}

export function getRepositoryUrl(url: string) {
  const re = /github\.com\/[^\/]+\/[^\/]+\.git/
  const fixedUrl: string[] | null = re.exec(url)
  return fixedUrl ? `https://${fixedUrl[0].slice(0, -4)}` : url
}

export function isRepositoryUrl(url: string) {
  const re = /^https:\/\/github\.com\/(\w|-|_|\.)+\/(\w|-|_|\.)+\/?$/
  return re.test(url)
}

export function getOwnerAndRepo(url: string) {
  return url.charAt(url.length - 1) === '/' ? url.slice(19).slice(0, -1) : url.slice(19)
}

export function getTodayDate() {
  return dayjs().format('YYYY-MM-DD')
}

export function getLastWeekDate() {
  return dayjs().subtract(6, 'day').format('YYYY-MM-DD')
}
