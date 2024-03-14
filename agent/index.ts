import 'dotenv/config'
import Bot from './lib/Bot.js'
import consola from 'consola'
import { loadEnv } from './lib/Env.js'
import sleep from 'p-sleep'

async function main (): Promise<void> {
  const env = loadEnv()

  consola.level = env.logLevel

  const bot = new Bot(env.minecraftServerHost,
    env.minecraftServerPort,
    env.minecraftVersion,
    env.minecraftUsername)

  await sleep(5000)
  bot.mineflayerBot.chat('Hello')
}

main().catch((error) => {
  consola.error(error)
  process.exit(1)
})
