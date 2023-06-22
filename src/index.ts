import discord from 'discord.js'
import 'dotenv/config'
import config from './config'
import bible from './bible'

const client = new discord.Client({
  intents: ['Guilds', 'GuildMessages', 'MessageContent']
})

client.on('guildCreate', async guild => {
  const member = guild.members.cache.get(client.user?.id ?? '')

  if (typeof member === 'undefined') return

  member.setNickname(config.nickname)
})

client.on('messageCreate', async message => {
  if (message.author.bot) return

  const references = bible.extractReferences(message.content)

  if (references.length === 0) return

  const promises = references.map(reference => {
    return message.channel.send(
      reference.quote({ form: 'embed', inline: false })
    )
  })

  await Promise.all(promises)
})

client.login(process.env['DISCORD_TOKEN'])
