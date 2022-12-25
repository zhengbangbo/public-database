import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { $fetch } from 'ohmyfetch'
import { getLastWeekDate, getTodayDate } from '../utils/utils'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

// https://registry.npmmirror.com/downloads/range/2022-12-01:2022-12-11/antd
export const getNpmMirrorWeeklyDownloadCountBy = async (npmName: string | undefined) => {
  if (!npmName) return
  const lastweek = getLastWeekDate()
  const today = getTodayDate()

  const url = `https://registry.npmmirror.com/downloads/range/${lastweek}:${today}/${npmName}`
  try {
    const resp = await $fetch(url)

    const week = resp.downloads.filter((items: any) => dayjs(items.day).isSameOrAfter(lastweek) && dayjs(items.day).isSameOrBefore(today))
    return week.reduce(
      (accumulator: number, currentValue: any) => accumulator + currentValue.downloads,
      0,
    )
  }
  catch (error) {
    console.error(error)
  }
}
