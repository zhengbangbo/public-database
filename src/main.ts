import { syncNotionDateNpmPackages } from './jobs'

async function main() {
  await syncNotionDateNpmPackages()
}

main().then((r) => {
  // eslint-disable-next-line no-console
  console.log('done', r)
}).catch((e) => {
  console.error(e)
})
