import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  getLastWeekDate,
  getOwnerAndRepo,
  getRepositoryUrl,
  getTodayDate,
  isRepositoryUrl,
  transRepositoryUrl,
} from '../../src/utils/utils'

describe('transRepositoryUrl', () => {
  it('should return the repository url', () => {
    const input = {
      time: {
        modified: '',
      },
      homepage: 'https://vuetifyjs.com',
      repository: {
        type: 'git',
        url: 'git+https://github.com/vuetifyjs/vuetify.git',
        directory: 'packages/vuetify',
      },
      bugs: {
        url: 'https://issues.vuetifyjs.com',
      },
    }
    const output = 'https://github.com/vuetifyjs/vuetify'

    expect(transRepositoryUrl(input)).toBe(output)
  })

  it('should return the repository url when contains decimal sign', () => {
    const input = {
      time: {
        modified: '',
      },
      homepage: 'https://revealjs.com',
      repository: {
        type: 'git',
        url: 'git://github.com/hakimel/reveal.js.git',
      },
      bugs: {
        url: 'https://github.com/hakimel/reveal.js/issues',
      },
    }
    const output = 'https://github.com/hakimel/reveal.js'

    expect(transRepositoryUrl(input)).toBe(output)
  })

  it('should return the repository url when bugs.url have not issues', () => {
    const input = {
      time: {
        'created': '2022-12-14T14:46:30.215Z',
        '0.1.0': '2022-12-14T14:46:30.416Z',
        'modified': '2023-02-12T09:40:36.787Z',
        '0.2.0': '2023-01-02T12:17:55.665Z',
        '0.2.1': '2023-02-12T09:40:36.640Z',
      },
      homepage: 'https://floating-ui.com/docs/vue',
      repository: {
        type: 'git',
        url: 'git+https://github.com/floating-ui/floating-ui.git',
        directory: 'packages/vue',
      },
      bugs: {
        url: 'https://github.com/floating-ui/floating-ui',
      },
      url: 'https://github.com/floating-ui/floating-ui',
    }
    const output = 'https://github.com/floating-ui/floating-ui'

    expect(transRepositoryUrl(input)).toBe(output)
  })
})
// {
//   name: 'reveal.js',
// },
// {
//   name: '@floating-ui/vue',
// },

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
    it(`should return true: ${url}`, () => {
      expect(isRepositoryUrl(url)).toBeTruthy()
    })
  })
  sadUrl.forEach((url) => {
    it(`should return false: ${url}`, () => {
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
    it(`should return true: ${url}`, () => {
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
