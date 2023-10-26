import discord from 'discord.js'
import 'dotenv/config'
import mongoose from 'mongoose'
import bible from './bible'
import commands from './commands'
import config from './config'
import log from './utils/log'

mongoose
  .connect(process.env['MONGO_URI'] ?? 'mongodb://localhost:27017/pbdb')
  .then(async () => {
    await log.info('Connected to MongoDB.')
  })
  .catch(async error => {
    await log.error(error)
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

  await member.setNickname(config.nickname)
})

client.on('messageCreate', bible)

client.on('ready', async readyClient => {
  await commands.register(readyClient)

  await log.info(`Logged in as ${readyClient.user.tag}.`)
})

client.on('warn', async warning => {
  await log.warn(warning)
})

client.on('error', async error => {
  await log.error(error)
})

client.on('shardDisconnect', async (closeEvent, shardId) => {
  log.warn(`Shard ${shardId} disconnected: ${JSON.stringify(closeEvent)}`).catch(() => {})

  try {
    await client.shard?.respawnAll()

    await log.info('All shards respawned.')
  } catch (error) {
    await log.error('Failed to respawn shards:')
    await log.error(error)
  }
})

client.on('shardError', async (error, shardId) => {
  await log.error(`Shard ${shardId} error:`)
  await log.error(error)
})

client.on('shardReady', async shardId => {
  await log.info(`Shard ${shardId} ready.`)
})

client.on('shardReconnecting', async shardId => {
  await log.info(`Shard ${shardId} reconnecting.`)
})

client.on('shardResume', async (replayed, shardId) => {
  await log.info(`Shard ${shardId} resumed. Replayed ${replayed} events.`)
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return

  await commands.handle(interaction)
})

client.login(process.env['DISCORD_TOKEN']).catch(log.error)
