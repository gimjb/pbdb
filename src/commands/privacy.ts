import fs from 'fs'
import path from 'path'
import type ApplicationCommand from './ApplicationCommand'
import config from '../config'
import toDiscordMarkdown from '../utils/toDiscordMarkdown'

function processPrivacyPolicy(privacy: string) {
  return (
    toDiscordMarkdown(privacy).trim() +
    // Add a link to the changelog in the Git repository.
    '\n\nThis privacy policy can also be found in the official [GitHub repository](' +
    `${config.officialRepository}/blob/master/docs/privacy.md).`
  )
}

const privacy = processPrivacyPolicy(
  fs.readFileSync(path.join(__dirname, '../../docs/privacy.md'), 'utf-8')
)

const command: ApplicationCommand = {
  meta: {
    name: 'privacy',
    description: 'Show the privacy policy.',
    options: []
  },
  execute: async interaction => {
    await interaction.reply({
      embeds: [
        {
          description: privacy
        }
      ],
      ephemeral: true
    })
  }
}

export default command
