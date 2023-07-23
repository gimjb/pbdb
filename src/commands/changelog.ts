import fs from 'fs'
import path from 'path'
import type ApplicationCommand from './ApplicationCommand'
import config from '../config'
import toDiscordMarkdown from '../utils/toDiscordMarkdown'

/**
 * A string to be appended to the end of the changelog, linking to the Git
 * repository.
 */
const changelogPostfix =
  `\n\nThe [full changelog](${config.officialRepository}/blob/master/docs/CHANGELOG.md)` +
  ` can be found in the official [GitHub repository](${config.officialRepository}).`
const maxEmbedDescriptionLength = 4096 - changelogPostfix.length

function processChangelog(changelog: string) {
  return (
    toDiscordMarkdown(changelog)
      .trim()
      .slice(0, maxEmbedDescriptionLength)
      .replace(/(?<= \n)[^ ]* +?$/, '') + changelogPostfix
  )
}

const changelog = processChangelog(
  fs.readFileSync(path.join(__dirname, '../../docs/CHANGELOG.md'), 'utf-8')
)

console.log(changelog)

const command: ApplicationCommand = {
  meta: {
    name: 'changelog',
    description: 'Show a list of changes made to the bot.'
  },
  execute: async interaction => {
    await interaction.reply({
      embeds: [
        {
          description: changelog
        }
      ],
      ephemeral: true
    })
  }
}

export default command
