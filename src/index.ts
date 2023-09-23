import discord from 'discord.js'
import 'dotenv/config'
import mongoose from 'mongoose'
import bible from './bible'
import commands from './commands'
import config from './config'
import log from './utils/log'
import usersController from './controllers/users'

mongoose
  .connect(process.env['MONGO_URI'] ?? 'mongodb://localhost:27017/pbdb')
  .then(() => {
    log.info('Connected to MongoDB.')
  })
  .catch(error => {
    log.error(error)
    process.exit(1)
  })

const client = new discord.Client({
  intents: ['Guilds', 'GuildMessages', 'MessageContent'],
  presence: {
    activities: [
      {
        name: `/pbdb | v${process.env['npm_package_version'] ?? '?.?.?'}`
      }
    ]
  }
})

client.on('guildCreate', async guild => {
  const member = guild.members.cache.get(client.user?.id ?? '')

  if (typeof member === 'undefined') return

  member.setNickname(config.nickname)
})

client.on('messageCreate', bible)

client.on('ready', async readyClient => {
  await commands.register(readyClient)

  log.info(`Logged in as ${readyClient.user.tag}.`)
})

client.on('warn', warning => {
  log.warn(warning)
})

client.on('error', error => {
  log.error(error)
})

client.on('shardDisconnect', async (closeEvent, shardId) => {
  log.warn(`Shard ${shardId} disconnected: ${closeEvent}`)

  try {
    await client.shard?.respawnAll()

    log.info('All shards respawned.')
  } catch (error) {
    log.error(`Failed to respawn shards: ${error}`)
  }
})

client.on('shardError', (error, shardId) => {
  log.error(`Shard ${shardId} error: ${error}`)
})

client.on('shardReady', shardId => {
  log.info(`Shard ${shardId} ready.`)
})

client.on('shardReconnecting', shardId => {
  log.info(`Shard ${shardId} reconnecting.`)
})

client.on('shardResume', (replayed, shardId) => {
  log.info(`Shard ${shardId} resumed. Replayed ${replayed} events.`)
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return

  commands.handle(interaction)
})

client.login(process.env['DISCORD_TOKEN'])
