import fs from 'fs'
import path from 'path'
import type ApplicationCommand from './ApplicationCommand'
import config from '../config'
import toDiscordMarkdown from '../utils/toDiscordMarkdown'

function processChangelog(changelog: string) {
  return (
    '> ' +
    toDiscordMarkdown(changelog).trim().replace(/\n/g, '\n> ') +
    // Add a link to the changelog in the Git repository.
    '\n\nThis changelog can also be found in the official [GitHub repository](' +
    `${config.officialRepository}/blob/master/docs/CHANGELOG.md).`
  )
}

const changelog = processChangelog(
  fs.readFileSync(path.join(__dirname, '../../docs/CHANGELOG.md'), 'utf-8')
)

const command: ApplicationCommand = {
  meta: {
    name: 'changelog',
    description: 'Show a list of changes made to the bot.'
  },
  execute: async interaction => {
    await interaction.reply({
      content: changelog,
      ephemeral: true
    })
  }
}

export default command
