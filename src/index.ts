import discord from 'discord.js'
import 'dotenv/config'
import commands from './commands'
import config from './config'

const client = new discord.Client({
  intents: ['Guilds']
})

client.on('guildCreate', async guild => {
  const member = guild.members.cache.get(client.user?.id ?? '')

  if (typeof member === 'undefined') return

  member.setNickname(config.nickname)
})

const token = process.env['DISCORD_TOKEN']

client.on('ready', async readyClient => {
  commands.register(readyClient)
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return

  commands.handle(interaction)
})

client.login()
