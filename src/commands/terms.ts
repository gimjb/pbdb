import fs from 'fs'
import path from 'path'
import type ApplicationCommand from './ApplicationCommand'
import config from '../config'
import toDiscordMarkdown from '../utils/toDiscordMarkdown'

function processTermsOfService(terms: string) {
  return (
    toDiscordMarkdown(terms).trim() +
    // Add a link to the changelog in the Git repository.
    '\n\nThese terms of service can also be found in the official [GitHub repository](' +
    `${config.officialRepository}/blob/master/docs/privacy.md).`
  )
}

const terms = processTermsOfService(
  fs.readFileSync(path.join(__dirname, '../../docs/terms.md'), 'utf-8')
)

const command: ApplicationCommand = {
  meta: {
    name: 'terms',
    description: 'Show the terms of service.'
  },
  execute: async interaction => {
    await interaction.reply({
      embeds: [
        {
          description: terms
        }
      ],
      ephemeral: true
    })
  }
}

export default command
