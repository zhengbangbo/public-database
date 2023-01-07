import { describe, expect, it } from 'vitest'
import { reqGithubStar } from '../../src/api/github'

describe('reqGithubStar', () => {
  it('should return github star count', async () => {
    expect(await reqGithubStar('zhengbangbo/eslint-config')).toBeTypeOf('number')
  })
})
