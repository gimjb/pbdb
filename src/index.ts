import discord from 'discord.js'
import 'dotenv/config'
import mongoose from 'mongoose'
import bible from './bible'
import commands from './commands'
import config from './config'
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
  intents: ['Guilds', 'GuildMessages', 'MessageContent'],
  presence: {
    activities: [
      {
        name: `v${process.env['npm_package_version'] ?? '?.?.?'}`
      }
    ]
  }
})

client.on('guildCreate', async guild => {
  const member = guild.members.cache.get(client.user?.id ?? '')

  if (typeof member === 'undefined') return

  member.setNickname(config.nickname)
})

function packMessageEmbeds(
  messages: discord.MessageCreateOptions[]
): discord.MessageCreateOptions[] {
  const packedMessages: discord.MessageCreateOptions[] = [
    {
      embeds: []
    }
  ]

  for (const message of messages) {
    if (message.embeds?.length === 0 || typeof message.embeds === 'undefined') {
      continue
    }

    if (packedMessages[packedMessages.length - 1]!.embeds!.length === 10) {
      packedMessages.push({
        embeds: []
      })
    }

    packedMessages[packedMessages.length - 1]!.embeds!.push(message.embeds![0]!)
  }

  return packedMessages
}

client.on('messageCreate', async message => {
  if (message.author.bot) return

  const references = bible.extractReferences(message.content)

  if (references.length === 0) return

  const { verseDisplay, inlineVerses } = (
    await usersController.get(message.author.id)
  ).preferences

  let messagesToSend: discord.MessageCreateOptions[] = references.map(
    reference =>
      reference.quote({
        form: verseDisplay ?? 'embed',
        inline: inlineVerses ?? false
      })
  )

  if (verseDisplay === 'embed') {
    messagesToSend = packMessageEmbeds(messagesToSend)
  }

  const promises = messagesToSend.map(async messageToSend => {
    return message.channel.send(messageToSend).catch(error => {
      // A common error is insufficient permissions to send embeds.
      // Todo(gimjb): try to send a blockquote instead of an embed.
      console.error(error)
    })
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
