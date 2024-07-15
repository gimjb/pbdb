import discord from 'discord.js'
import type ApplicationCommand from './ApplicationCommand'
import bibleApi from '@bible-api/bible-api'
import { createMessageOptions } from '../bible'
import User from '../models/User'
import validateMessage from '../utils/validateMessage'

interface MessageOptions {
  content: string
  embeds: Array<discord.JSONEncodable<discord.APIEmbed> | discord.APIEmbed>
}

const command: ApplicationCommand = {
  meta: {
    name: 'quote',
    description: 'Quote a Bible verse.',
    contexts: [0, 1, 2],
    integration_types: [1],
    options: [{
      name: 'references',
      description: 'The scripture to quote.',
      type: discord.ApplicationCommandOptionType.String,
      required: true
    }]
  },
  execute: async interaction => {
    const user = await User.get(interaction.user.id)

    const references = interaction.options.getString('references', true)
    const passagesOptions = bibleApi.parse({ text: references })

    if (passagesOptions.length === 0) return

    const finalMessageOptions: MessageOptions = { content: '', embeds: [] }

    for (const passageOptions of passagesOptions) {
      const { getPassageOptions } = passageOptions

      const passage = await bibleApi.remote.requestPassage({
        version: passageOptions.version,
        ...getPassageOptions
      })

      const messageOptions = await createMessageOptions(passage, user)

      if (typeof messageOptions === 'undefined') continue

      const content = typeof messageOptions.content === 'string'
        ? `${finalMessageOptions.content}\n\n${messageOptions.content}`
        : ''
      const embeds = finalMessageOptions.embeds.concat(messageOptions.embeds ?? [])

      if (!validateMessage({ content, embeds })) break

      finalMessageOptions.content = content
      finalMessageOptions.embeds = embeds
    }

    void interaction.reply(finalMessageOptions)
  }
}

export default command
