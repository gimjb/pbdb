import fs from 'fs'
import path from 'path'
import type ApplicationCommand from './ApplicationCommand'
import config from '../config'

function processChangelog(changelog: string) {
  return (
    '> ' +
    changelog
      // Remove links that are not supported in Discord Markdown.
      .replace(/\[.+?]: http.+\n/g, '')
      .replace(/\[(?<linkText>.+?)](?!\()/g, '$<linkText>')
      // Horizontal rules
      .replace(/^-{3,}/g, '—')
      // Unwrap wrapped lines.
      .replace(/(?<!\n| {2,})\n(?!(?:\n|[-*\d]| {2,}))/gm, ' ')
      .trim()
      // Blockquote the whole changelog.
      .replace(/\n/g, '\n> ') +
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
