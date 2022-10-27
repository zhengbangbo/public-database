export function getRepositoryUrl(url: string) {
  const re = /github\.com\/(\d|\w|\-|\_)+\/(\d|\w|\-|\_)+/
  const fixedUrl: string[] | null = re.exec(url)
  return fixedUrl ? `https://${fixedUrl[0]}` : ''
}

export function isRepositoryUrl(url: string) {
  const re = /^https:\/\/github\.com\/(\d|\w|\-|\_)+\/(\d|\w|\-|\_)+\/?$/
  return re.test(url)
}

export function getOwnerAndRepo(url: string) {
  return url.charAt(url.length - 1) === '/' ? url.slice(19).slice(0, -1) : url.slice(19)
}
