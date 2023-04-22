import { syncNotionDateNpmPackages } from './jobs'

async function main() {
  await syncNotionDateNpmPackages()
}

main().then(() => {
  // eslint-disable-next-line no-console
  console.log('done')
}).catch((e) => {
  console.error(e)
})
