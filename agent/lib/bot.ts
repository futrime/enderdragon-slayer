import consola from 'consola'
import minecraftData from 'minecraft-data'
import mineflayer from 'mineflayer'
import mineflayerCollectBlock from 'mineflayer-collectblock'
import mineflayerPVP from 'mineflayer-pvp'
import mineflayerPathFinder from 'mineflayer-pathfinder'

export default class Bot {
  readonly minecraftData: minecraftData.IndexedData
  readonly mineflayerBot: mineflayer.Bot

  constructor (
    host: string,
    port: number,
    version: string,
    username: string
  ) {
    this.mineflayerBot = createMineflayerBot(
      host,
      port,
      version,
      username
    )
    this.minecraftData = minecraftData(version)
  }
}

function createMineflayerBot (
  host: string,
  port: number,
  version: string,
  username: string
): mineflayer.Bot {
  const mineflayerBot = mineflayer.createBot({
    auth: 'offline',
    host,
    port,
    username,
    version
  })

  mineflayerBot.loadPlugin(mineflayerCollectBlock.plugin)
  mineflayerBot.loadPlugin(mineflayerPathFinder.pathfinder)
  mineflayerBot.loadPlugin(mineflayerPVP.plugin)

  mineflayerBot.on('error', err => {
    consola.error(err)
  })
  mineflayerBot.on('login', () => {
    consola.log(`bot logged in as ${username}`)
  })

  return mineflayerBot
}
