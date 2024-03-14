import consola from 'consola'

async function main (): Promise<void> {
  consola.info('Hello, World!')
}

main().catch((error) => {
  consola.error(error)
  process.exit(1)
})
