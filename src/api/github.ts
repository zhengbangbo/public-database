import { Octokit } from '@octokit/core'
import * as dotenv from 'dotenv'
import { getOwnerAndRepo } from '../utils/utils'

dotenv.config()
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export async function reqGithubStar(repoUrl: string) {
  const repo = getOwnerAndRepo(repoUrl)
  // 如果请求报错，暂停一秒后再次请求

  const data = await octokit.request(`GET /repos/${repo}`)

  if (!data?.data?.stargazers_count)
    throw new Error('No GitHub stargazers count data')
  return data.data.stargazers_count
}
