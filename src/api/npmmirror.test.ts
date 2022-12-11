import { reqNpmMirrorWeeklyDownload } from './npmmirror'

test.skip('reqNpmMirrorWeeklyDownload', async () => {
  expect(await reqNpmMirrorWeeklyDownload('vue')).toMatchInlineSnapshot('426805')
})
