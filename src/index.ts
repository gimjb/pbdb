import discord from 'discord.js'
import mongoose from 'mongoose'
import 'dotenv/config'
import commands from './commands'
import config from './config'
import bible from './bible'
import usersController from './controllers/users'

mongoose
  .connect(process.env['MONGO_URI'] ?? 'mongodb://localhost:27017/pbdb')
  .then(() => {
    console.log('Connected to MongoDB.')
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

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

  const promises = references.map(async reference => {
    const user = await usersController.get(message.author.id)

    return message.channel.send(
      reference.quote({
        form: user.preferences.verseDisplay ?? 'embed',
        inline: user.preferences.inlineVerses ?? false
      })
    )
  })

  await Promise.all(promises)
})

client.on('ready', async readyClient => {
  commands.register(readyClient)
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return

  commands.handle(interaction)
})

client.login(process.env['DISCORD_TOKEN'])
