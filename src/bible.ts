import bibleApi from '@bible-api/bible-api'
import discord from 'discord.js'
import log from '@gimjb/log'
import cooldownCache from './cooldownCache'
import config from './config'
import User from './models/User'

function superscript (number: number): string {
  const superscriptMap = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹']

  return number
    .toString()
    .split('')
    .map(
      digit => superscriptMap[parseInt(digit) as keyof typeof superscriptMap]
    )
    .join('')
}

async function createMessageOptions (
  message: discord.Message,
  passage: any
): Promise<undefined | discord.BaseMessageOptions> {
  const { verseDisplay, inlineVerses, curlyQuotes } = (
    await User.get(message.author.id)
  ).preferences

  if (
    typeof verseDisplay !== 'string' ||
    typeof inlineVerses !== 'boolean' ||
    typeof curlyQuotes !== 'boolean'
  ) {
    return
  }

  const passageName = passage.name.replace(/\(PCE\)/, '(KJV1900)') as string

  let concatenatedPassage =
    verseDisplay === 'embed' ? '' : `> ### ${passageName}\n> `

  let currentChapterNumber = passage.verses[0].chapterNumber
  for (const verse of passage.verses) {
    let toAdd = ''
    if (verse.chapterNumber !== currentChapterNumber) {
      currentChapterNumber = verse.chapterNumber
      toAdd +=
        '\n### Chapter ' + (verse.chapterNumber.toString() as string) + '\n'
    }

    if (inlineVerses) {
      toAdd += `${superscript(verse.verseNumber)} ${verse.markdown as string} `
    } else {
      toAdd += `${verse.verseNumber.toString() as string}. ${
        verse.markdown as string
      }\n`
    }

    toAdd = curlyQuotes ? toAdd.replace(/'/g, '’') : toAdd
    toAdd = verseDisplay === 'embed' ? toAdd : toAdd.replace(/\n/g, '\n> ')

    if (
      (verseDisplay === 'embed' &&
        concatenatedPassage.length + toAdd.length < 4096) ||
      (verseDisplay === 'blockquote' &&
        concatenatedPassage.length + toAdd.length < 2000)
    ) {
      concatenatedPassage += toAdd
    } else {
      concatenatedPassage += '…'
      break
    }
  }

  if (verseDisplay === 'blockquote') {
    return {
      content: concatenatedPassage.replace(/\n> $/, ''),
      components: []
    }
  } else {
    return {
      content: '',
      embeds: [
        {
          title: passageName,
          description: concatenatedPassage,
          color: concatenatedPassage.includes('**')
            ? config.jesusColor
            : config.nonJesusColor
        }
      ],
      components: []
    }
  }
}

async function postPassage (
  message: discord.Message,
  passageName: string,
  messageOptions: discord.BaseMessageOptions
): Promise<void> {
  if (message.author.id === message.channel.client.user.id) {
    await message.edit(messageOptions)
    return
  }

  await message.channel.send(messageOptions)

  if (typeof message.guildId === 'string') {
    cooldownCache.cooldownPassage(
      message.guildId,
      message.channelId,
      passageName
    )
  }
}

export default async function messageHandler (
  message: discord.Message
): Promise<void> {
  if (message.author.bot) return

  const passagesOptions = bibleApi.parse({
    text: message.content.replace(
      /\[[^\]]+\]|```.+?```|`[^`\n\r]+`|__|\*/gs,
      ''
    )
  })

  if (passagesOptions.length === 0) return

  for (const passageOptions of passagesOptions) {
    const { getPassageOptions } = passageOptions

    const passage = await bibleApi.remote.requestPassage({
      version: passageOptions.version,
      ...getPassageOptions
    })

    if (
      typeof message.guildId === 'string' &&
      cooldownCache.isPassageOnCooldown(
        message.guildId,
        message.channelId,
        passage.name
      )
    ) {
      message.react('⏳').catch(() => {})
      continue
    }

    const messageOptions = await createMessageOptions(message, passage)

    if (typeof messageOptions === 'undefined') continue

    if (
      getPassageOptions.start.verseNumber === 1 &&
      getPassageOptions.end.verseNumber === Infinity
    ) {
      // This is a chapter-only reference: confirmation is required.
      const inquiry = await message.channel.send({
        content:
          `Did you mean to post **${passage.name as string}**? ` +
          'Confirmation is required for whole chapters.',
        components: [
          new discord.ActionRowBuilder<discord.ButtonBuilder>().addComponents(
            new discord.ButtonBuilder()
              .setCustomId('yes')
              .setLabel('Yes, post it')
              .setStyle(discord.ButtonStyle.Success),
            new discord.ButtonBuilder()
              .setCustomId('no')
              .setLabel('No, do not post it')
              .setStyle(discord.ButtonStyle.Danger)
          )
        ]
      })

      inquiry.awaitMessageComponent().then(async interaction => {
        if (interaction.customId === 'yes') {
          await postPassage(interaction.message, passage.name, messageOptions)
          return
        }

        await interaction.message.delete()
      }).catch(log.error)

      continue
    }

    await postPassage(message, passage.name, messageOptions)
  }
}
