import { Octokit } from '@octokit/core'
import { getOwnerAndRepo } from '../utils/utils'

const octokit = new Octokit()

export const reqGithubStar = async (repoUrl: string) => {
  const repo = getOwnerAndRepo(repoUrl)
  const data = await octokit.request(`GET /repos/${repo}`)
  if (!('stargazers_count' in data.data)) throw new Error('No GitHub stargazers count data')
  return data.data.stargazers_count
}

