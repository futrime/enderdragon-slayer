import 'dotenv/config'
import Bot from './lib/Bot.js'
import GPT from './lib/GPT.js'
import consola from 'consola'
import { loadEnv } from './lib/Env.js'

async function main (): Promise<void> {
  const env = loadEnv()

  consola.level = env.logLevel

  const bot = new Bot(env.minecraftServerHost,
    env.minecraftServerPort,
    env.minecraftVersion,
    env.minecraftUsername)

  const llm = new GPT({
    openAIAPIKey: env.openAIApiKey,
    openAIBaseURL: env.openAIBaseURL
  })
  const answer = await llm.ask('Act as a native English speaker. How are you?')

  consola.info(answer)
}

main().catch((error) => {
  consola.error(error)
  process.exit(1)
})
