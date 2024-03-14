export default interface Env {
  logLevel: number
  minecraftServerHost: string
  minecraftServerPort: number
  minecraftUsername: string
  minecraftVersion: string
  openAIApiKey: string
}

export function loadEnv (): Env {
  return {
    logLevel: parseInt(process.env.LOG_LEVEL ?? '3'),
    minecraftServerHost: process.env.MINECRAFT_SERVER_HOST ?? '127.0.0.1',
    minecraftServerPort: parseInt(process.env.MINECRAFT_SERVER_PORT ?? '25565'),
    minecraftUsername: process.env.MINECRAFT_USERNAME ?? 'agent',
    minecraftVersion: process.env.MINECRAFT_VERSION ?? '1.20.1',
    openAIApiKey: process.env.OPENAI_API_KEY ?? ''
  }
}
