import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getLastWeekDate, getOwnerAndRepo, getRepositoryUrl, getTodayDate, isRepositoryUrl } from '../../src/utils/utils'

describe('getRepositoryUrl', () => {
  const happyPath = [
    ['git+ssh://git@github.com/ElemeFE/element.git', 'https://github.com/ElemeFE/element'],
    ['git+https://github.com/FightingDesign/fighting-design.git', 'https://github.com/FightingDesign/fighting-design'],
    ['git://github.com/hakimel/reveal.js.git', 'https://github.com/hakimel/reveal.js'],
    ['https://github.com/tusen-ai/naive-ui', 'https://github.com/tusen-ai/naive-ui'],
  ]
  happyPath.forEach(([url, fixedUrl]) => {
    it(`happy path: ${url}`, () => {
      const getUrl = getRepositoryUrl(url)
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
    it(`happy path: ${url}`, () => {
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

describe('getDate', () => {
  // https://vitest.dev/guide/mocking.html#dates
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('today', () => {
    const date = new Date(2000, 1, 1, 13)
    vi.setSystemTime(date)

    expect(getTodayDate()).toMatchInlineSnapshot('"2000-02-01"')
  })
  it('last week', () => {
    const date = new Date(2000, 1, 1, 13)
    vi.setSystemTime(date)

    expect(getLastWeekDate()).toMatchInlineSnapshot('"2000-01-26"')
  })
})
