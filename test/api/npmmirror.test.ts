import { reqNpmMirrorWeeklyDownload } from '../../src/api/npmmirror'

test.skip('reqNpmMirrorWeeklyDownload', async () => {
  expect(await reqNpmMirrorWeeklyDownload('vue')).toMatchInlineSnapshot('426805')
})
