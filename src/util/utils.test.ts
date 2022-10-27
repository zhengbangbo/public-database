import { getOwnerAndRepo, getRepositoryUrl, isRepositoryUrl } from './utils'

describe('getRepositoryUrl', () => {
  const happyPath = [
    ['git+ssh://git@github.com/ElemeFE/element.git', 'https://github.com/ElemeFE/element'],
    ['git+https://github.com/FightingDesign/fighting-design.git', 'https://github.com/FightingDesign/fighting-design'],
  ]
  happyPath.forEach(([url, fixedUrl]) => {
    it(`happy path: ${url}`, () => {
      const getUrl = getRepositoryUrl(url)
      // expect(isRepositoryUrl(getUrl)).toBeTruthy()
      expect(getUrl).toBe(fixedUrl)
    })
  })
})

describe('isRepositoryUrl', () => {
  const happyUrl = [
    'https://github.com/FightingDesign/fighting-design',
    'https://github.com/npm/registry/',
    'https://github.com/npm/registry',
  ]
  const sadUrl = [
    'https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md',
    'https://github.com/npm/',
    'https://github.com/npm',
    'https://github.com/',
  ]
  happyUrl.forEach((url) => {
    it(`sad path: ${url}`, () => {
      expect(isRepositoryUrl(url)).toBeTruthy()
    })
  })
  sadUrl.forEach((url) => {
    it(`sad path: ${url}`, () => {
      expect(isRepositoryUrl(url)).toBeFalsy()
    })
  })
})

describe('getOwnerAndRepo', () => {
  const happyUrl = [
    ['https://github.com/npm/registry/', 'npm/registry'],
    ['https://github.com/npm/registry', 'npm/registry'],
    ['https://github.com/npm/app', 'npm/app'],
  ]
  happyUrl.forEach(([url, owner_repo]) => {
    it(`happy path: ${url}`, () => {
      expect(getOwnerAndRepo(url)).toBe(owner_repo)
    })
  })
})
