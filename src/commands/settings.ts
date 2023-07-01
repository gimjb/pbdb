import discord from 'discord.js'
import type ApplicationCommand from './ApplicationCommand'
import usersController from '../controllers/users'

async function createInteractionReply(userId: string) {
  const user = await usersController.get(userId)

  return {
    content: 'Configure the bot with the options below.',
    ephemeral: true,
    components: [
      new discord.ActionRowBuilder<discord.ButtonBuilder>().addComponents(
        new discord.ButtonBuilder()
          .setCustomId('verseDisplay')
          .setLabel(
            user.preferences.verseDisplay === 'embed'
              ? 'Display Mode: Embed'
              : 'Display Mode: Blockquote'
          )
          .setStyle(
            user.preferences.verseDisplay === 'embed'
              ? discord.ButtonStyle.Primary
              : discord.ButtonStyle.Secondary
          ),
        new discord.ButtonBuilder()
          .setCustomId('inlineVerses')
          .setLabel(
            `Inline Verses: ${user.preferences.inlineVerses ? 'On' : 'Off'}`
          )
          .setStyle(
            user.preferences.inlineVerses
              ? discord.ButtonStyle.Success
              : discord.ButtonStyle.Danger
          ),
        new discord.ButtonBuilder()
          .setCustomId('curlyQuotes')
          .setLabel(
            `Quotation Marks: ${
              user.preferences.curlyQuotes ? '“Curly”' : '"Straight"'
            }`
          )
          .setStyle(
            user.preferences.curlyQuotes
              ? discord.ButtonStyle.Primary
              : discord.ButtonStyle.Secondary
          )
      )
    ]
  }
}

async function awaitMessageComponent(
  userId: string,
  response: discord.InteractionResponse
) {
  const user = await usersController.get(userId)

  await response

  response
    .awaitMessageComponent({
      filter: i => i.user.id === userId
    })
    .then(async i => {
      if (i.customId === 'verseDisplay') {
        if (user.preferences.verseDisplay === 'embed') {
          user.preferences.verseDisplay = 'blockquote'
        } else {
          user.preferences.verseDisplay = 'embed'
        }
      } else if (i.customId === 'inlineVerses') {
        user.preferences.inlineVerses = !user.preferences.inlineVerses
      } else if (i.customId === 'curlyQuotes') {
        user.preferences.curlyQuotes = !user.preferences.curlyQuotes
      }

      await user.save()

      awaitMessageComponent(
        user.id,
        await i.update(await createInteractionReply(user.id))
      )
    })
}

const command: ApplicationCommand = {
  meta: {
    name: 'settings',
    description: 'Configure the bot to your liking.'
  },
  execute: async interaction => {
    const response = await interaction.reply(
      await createInteractionReply(interaction.user.id)
    )

    awaitMessageComponent(interaction.user.id, response)
  }
}

export default command
