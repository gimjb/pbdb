import discord from 'discord.js'
import log from '@gimjb/log'
import type ApplicationCommand from './ApplicationCommand'
import usersController from '../controllers/users'

async function createInteractionReply (userId: string): Promise<discord.InteractionReplyOptions | discord.InteractionUpdateOptions> {
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
            `Inline Verses: ${user.preferences.inlineVerses as boolean ? 'On' : 'Off'}`
          )
          .setStyle(
            user.preferences.inlineVerses as boolean
              ? discord.ButtonStyle.Success
              : discord.ButtonStyle.Danger
          ),
        new discord.ButtonBuilder()
          .setCustomId('curlyQuotes')
          .setLabel(
            `Quotation Marks: ${
              user.preferences.curlyQuotes as boolean ? '“Curly”' : '"Straight"'
            }`
          )
          .setStyle(
            user.preferences.curlyQuotes as boolean
              ? discord.ButtonStyle.Primary
              : discord.ButtonStyle.Secondary
          )
      )
    ]
  }
}

async function awaitMessageComponent (
  userId: string,
  response: discord.InteractionResponse
): Promise<void> {
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
        user.preferences.inlineVerses = !(user.preferences.inlineVerses as boolean)
      } else if (i.customId === 'curlyQuotes') {
        user.preferences.curlyQuotes = !(user.preferences.curlyQuotes as boolean)
      }

      await user.save()

      await awaitMessageComponent(
        user.id,
        await i.update(await createInteractionReply(user.id) as discord.InteractionUpdateOptions)
      )
    }).catch(log.error)
}

const command: ApplicationCommand = {
  meta: {
    name: 'userprefs',
    description: 'Configure the bot to your liking.',
    options: []
  },
  execute: async interaction => {
    const response = await interaction.reply(
      await createInteractionReply(interaction.user.id) as discord.InteractionReplyOptions
    )

    await awaitMessageComponent(interaction.user.id, response)
  }
}

export default command
