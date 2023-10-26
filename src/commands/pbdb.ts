import discord from 'discord.js'
import type ApplicationCommand from './ApplicationCommand'
import config from '../config'

const helpEmbed: discord.APIEmbed = {
  title: 'Primitive Baptist Discord Bot',
  description:
    'PBDB is a work-in-progress Discord bot. The goal is to have a bot that ' +
    'can be used to reference Bible verses (KJV) and quickly look up ' +
    'theological terms.',
  fields: [
    {
      name: '📜  __Bible Verses__',
      value:
        'The bot will automatically detect Bible verses in your messages and ' +
        'respond with the detected verse(s). For example, if you type ' +
        '“Eph 1:4,” the bot will quote Ephesians 1:4.'
    },
    {
      name: '⛔️ __Ignore Verses__',
      value:
        'If you want to prevent the bot from responding to a verse, you can ' +
        'surround the verse with backticks. For example, if you type ' +
        '\\`Eph 1:4\\`, the bot will not respond. The same applies to ' +
        'code blocks: \\`\\`\\`Eph 1:4\\`\\`\\` will also be ignored.'
    },
    {
      name: '⌨️  __Commands__',
      value: '' // This will be filled in when the commands are loaded.
    },
    {
      name: '👨🏻‍💻  __Source Code__',
      value: `The source code for this bot is available on [GitHub](${config.officialRepository}).`
    }
  ]
}

const command: ApplicationCommand = {
  meta: {
    name: 'pbdb',
    description: 'Get introduced on how to use PBDB.',
    options: []
  },
  execute: async interaction => {
    await interaction.reply({
      embeds: [helpEmbed],
      ephemeral: true
    })
  },
  onLoad: commands => {
    for (const command of commands) {
      const thirdField = helpEmbed.fields?.[2]

      if (typeof thirdField === 'undefined') continue

      thirdField.value += `\n- \`/${command.name}\`: ${command.description}`
    }
  }
}

export default command
