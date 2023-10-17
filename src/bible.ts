import bibleApi from '@bible-api/bible-api'
import discord from 'discord.js'
import CooldownCache from './CooldownCache'
import config from './config'
import log from './utils/log'
import usersController from './controllers/users'

function superscript(number: number) {
  const superscriptMap = {
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹'
  }

  return number
    .toString()
    .split('')
    .map(digit => superscriptMap[digit as keyof typeof superscriptMap])
    .join('')
}

async function createMessageOptions(
  message: discord.Message,
  passage: any
): Promise<void | discord.BaseMessageOptions> {
  const { verseDisplay, inlineVerses, curlyQuotes } = (
    await usersController.get(message.author.id)
  ).preferences

  let concatenatedPassage =
    verseDisplay === 'embed' ? '' : `> ### ${passage.name}\n> `

  let currentChapterNumber = passage.verses[0].chapterNumber
  for (const verse of passage.verses) {
    let toAdd = ''
    if (verse.chapterNumber !== currentChapterNumber) {
      currentChapterNumber = verse.chapterNumber
      toAdd += '\n### Chapter ' + verse.chapterNumber + '\n'
    }

    if (inlineVerses) {
      toAdd += `${superscript(verse.verseNumber)} ${verse.markdown} `
    } else {
      toAdd += `${verse.verseNumber}. ${verse.markdown}\n`
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
      embeds: [
        {
          title: passage.name,
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

async function postPassage(
  message: discord.Message,
  passageName: string,
  messageOptions: discord.BaseMessageOptions
) {
  if (message.author.id === message.channel.client.user.id) {
    await message.edit(messageOptions)
    return
  }

  message.channel.send(messageOptions)

  if (message.guildId) {
    CooldownCache.cooldownPassage(
      message.guildId,
      message.channelId,
      passageName
    )
  }
}

export default async function messageHandler(message: discord.Message) {
  if (message.author.bot) return
  message.channel

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
      message.guildId &&
      CooldownCache.isPassageOnCooldown(
        message.guildId,
        message.channelId,
        passage.name
      )
    ) {
      return
    }

    const messageOptions = await createMessageOptions(message, passage)

    if (!messageOptions) continue

    if (
      getPassageOptions.start.verseNumber === 1 &&
      getPassageOptions.end.verseNumber === Infinity
    ) {
      // This is a chapter-only reference: confirmation is required.
      const inquiry = await message.channel.send({
        content:
          `Did you mean to post **${passage.name}**? ` +
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
          postPassage(interaction.message, passage.name, messageOptions)
          return
        }

        interaction.message.delete()
      })

      continue
    }

    await postPassage(message, passage.name, messageOptions)
  }
}
