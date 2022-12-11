import { $fetch } from 'ohmyfetch'
import { getLastWeekDate, getTodayDate } from '../util/utils'

// https://registry.npmmirror.com/downloads/range/2022-12-01:2022-12-11/antd
export const reqNpmMirrorWeeklyDownload = async (npmName: string | undefined) => {
  if (!npmName) return
  const lastweek = getLastWeekDate()
  const today = getTodayDate()

  const url = `https://registry.npmmirror.com/downloads/range/${lastweek}:${today}/${npmName}`

  try {
    const resp = await $fetch(url)
    return resp
  }
  catch (error) {
    console.error(error)
  }
}
