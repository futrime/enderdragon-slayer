import consola from 'consola'
import minecraftData from 'minecraft-data'
import mineflayer from 'mineflayer'
import mineflayerCollectBlock from 'mineflayer-collectblock'
import mineflayerPathFinder from 'mineflayer-pathfinder'
import mineflayerPvp from 'mineflayer-pvp'

export class Bot {
  readonly minecraftData: minecraftData.IndexedData
  readonly mineflayerBot: mineflayer.Bot

  constructor (
    readonly minecraftServerHost: string,
    readonly minecraftServerPort: number,
    readonly minecraftVersion: string,
    readonly minecraftUsername: string
  ) {
    this.mineflayerBot = createMineflayerBot(minecraftServerHost,
      minecraftServerPort,
      minecraftVersion,
      minecraftUsername)
    this.minecraftData = minecraftData(minecraftVersion)
  }
}

function createMineflayerBot (
  minecraftServerHost: string,
  minecraftServerPort: number,
  minecraftVersion: string,
  minecraftUsername: string
): mineflayer.Bot {
  const mineflayerBot = mineflayer.createBot({
    auth: 'offline',
    host: minecraftServerHost,
    port: minecraftServerPort,
    username: minecraftUsername,
    version: minecraftVersion
  })

  mineflayerBot.loadPlugin(mineflayerCollectBlock.plugin)
  mineflayerBot.loadPlugin(mineflayerPathFinder.pathfinder)
  mineflayerBot.loadPlugin(mineflayerPvp.plugin)

  mineflayerBot.on('error', err => {
    consola.error(err)
  })
  mineflayerBot.on('login', () => {
    consola.log(`bot logged in as ${minecraftUsername}`)
  })

  return mineflayerBot
}
