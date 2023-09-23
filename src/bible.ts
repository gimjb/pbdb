import bibleApi from '@bible-api/bible-api'
import type discord from 'discord.js'
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

export default async function messageHandler(message: discord.Message) {
  if (message.author.bot) return

  const passagesOptions = bibleApi.parse({
    text: message.content.replace(/\[^]]\]|__|\*/g, '')
  })

  if (passagesOptions.length === 0) return

  const { verseDisplay, inlineVerses, curlyQuotes } = (
    await usersController.get(message.author.id)
  ).preferences

  for (const passageOptions of passagesOptions) {
    const passage = await bibleApi.remote.requestPassage({
      version: passageOptions.version,
      ...passageOptions.getPassageOptions
    })

    let concatenatedPassage =
      verseDisplay === 'embed' ? '' : `> # ${passage.name}\n> `

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
      message.channel.send(concatenatedPassage).catch(error => {
        log.error(error)
      })
    } else {
      message.channel
        .send({
          embeds: [
            {
              title: passage.name,
              description: concatenatedPassage,
              color: concatenatedPassage.includes('**')
                ? config.jesusColor
                : config.nonJesusColor
            }
          ]
        })
        .catch(error => {
          // A common error is insufficient permissions to send embeds.
          // Todo(gimjb): try to send a blockquote instead of an embed.
          log.error(error)
        })
    }
  }
}
