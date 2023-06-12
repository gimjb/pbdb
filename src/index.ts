import discord from 'discord.js'
import 'dotenv/config'
import config from './config'

const client = new discord.Client({
  intents: ['Guilds']
})

client.on('guildCreate', async guild => {
  const member = guild.members.cache.get(client.user?.id ?? '')

  if (typeof member === 'undefined') return

  member.setNickname(config.nickname)
})

client.login(process.env['DISCORD_TOKEN'])
