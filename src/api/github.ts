import { Octokit } from '@octokit/core'

const octokit = new Octokit()

export const reqGithubStar = async (repo: string) => {
  const data = await octokit.request(`GET /repos/${repo}`)
  return 'stargazers_count' in data.data ? data.data.stargazers_count : ''
}

