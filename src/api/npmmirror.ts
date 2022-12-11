import { $fetch } from 'ohmyfetch'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { getLastWeekDate, getTodayDate } from '../util/utils'
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

// https://registry.npmmirror.com/downloads/range/2022-12-01:2022-12-11/antd
export const reqNpmMirrorWeeklyDownload = async (npmName: string | undefined) => {
  if (!npmName) return
  const lastweek = getLastWeekDate()
  const today = getTodayDate()

  const url = `https://registry.npmmirror.com/downloads/range/${lastweek}:${today}/${npmName}`
  try {
    const resp = await $fetch(url)

    const week = resp.downloads.filter((items: any) => dayjs(items.day).isSameOrAfter(lastweek) && dayjs(items.day).isSameOrBefore(today))
    const downloads = week.reduce(
      (accumulator: number, currentValue: any) => accumulator + currentValue.downloads,
      0,
    )
    return downloads
  }
  catch (error) {
    console.error(error)
  }
}
