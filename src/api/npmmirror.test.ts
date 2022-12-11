import { reqNpmMirrorWeeklyDownload } from './npmmirror'

test('reqNpmMirrorWeeklyDownload', async () => {
  expect(await reqNpmMirrorWeeklyDownload('vue')).toMatchInlineSnapshot('Promise {}')
})
