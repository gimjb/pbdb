import discord from 'discord.js'
import type BibleBookName from './BibleBookName'
import config from '../config'
import kjvImport from './kjv.json'

const kjv = kjvImport as Record<BibleBookName, string[][]>

interface BibleReferenceOptions {
  /** The book of the Bible. */
  book: BibleBookName
  /** The chapter of the book. */
  chapter: number
  /** The first verse in the referenced range. */
  versesStart: number
  /** The last verse in the refernenced range. */
  versesEnd: number
}

interface BibleQuoteOptions {
  /** The form of the message. */
  verseDisplay: 'blockquote' | 'embed'
  /** Whether the quoted verses should be inline. */
  inlineVerses: boolean
  /** Whether to use "straight" or “curly” quotation marks. */
  curlyQuotes: boolean
}

function superscript(number: number): string {
  const superscriptMap = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹']

  return number
    .toString()
    .split('')
    .map(digit => superscriptMap[parseInt(digit)])
    .join('')
}

/** A reference to a verse in the Bible. **/
export default class BibleReference implements BibleReferenceOptions {
  public readonly citation: string
  public readonly book: BibleBookName
  public readonly chapter: number
  public readonly versesStart: number
  public readonly versesEnd: number

  constructor(options: BibleReferenceOptions) {
    let versesStart = Math.max(
      1,
      Math.min(options.versesStart, options.versesEnd)
    )

    if (options.chapter > kjv[options.book].length - 1) {
      throw new Error(
        `Chapter ${options.chapter} does not exist in ${options.book}.`
      )
    } else if (
      typeof kjv[options.book][options.chapter]![versesStart] === 'undefined'
    ) {
      throw new Error(
        `${options.book} ${options.chapter} only has ${
          kjv[options.book][options.chapter]!.length - 1
        } verses.`
      )
    }

    this.book = options.book
    this.chapter = options.chapter
    this.versesStart = versesStart
    this.versesEnd = Math.max(
      versesStart,
      Math.min(
        options.versesEnd,
        kjv[options.book][options.chapter]!.length - 1
      )
    )
    this.citation =
      `${this.book} ${this.chapter}:` +
      (this.versesStart === this.versesEnd
        ? this.versesStart
        : `${this.versesStart}–${this.versesEnd}`) +
      ' (KJV)'
  }

  /** Returns a Discord message with the referenced verses. */
  public quote(options: BibleQuoteOptions): discord.MessageCreateOptions {
    let versesContent = kjv[this.book]
      [this.chapter]!.slice(this.versesStart, this.versesEnd + 1)
      .map((verse, index) => {
        const verseNumber = index + this.versesStart

        if (index !== 0) {
          if (options.inlineVerses) {
            return ` ${superscript(verseNumber)} ${verse}`
          } else {
            return `\n${verseNumber}. ${verse}`
          }
        } else if (
          !options.inlineVerses &&
          this.versesStart !== this.versesEnd
        ) {
          return `${verseNumber}. ${verse}`
        }

        return verse
      })
      .join('')
      .replaceAll("'", options.curlyQuotes ? '’' : "'")

    if (options.verseDisplay === 'blockquote') {
      versesContent = '> ' + versesContent.replaceAll('\n', '\n> ')
      const maxBlockquoteLength = 2000 - `\n> — ${this.citation}`.length
      if (versesContent.length > maxBlockquoteLength) {
        versesContent = versesContent.slice(0, maxBlockquoteLength - 1) + '…'
      }

      return {
        content: `${versesContent}\n> — ${this.citation}`
      }
    } else {
      const maxEmbedLength = 4096
      if (versesContent.length > maxEmbedLength) {
        versesContent = versesContent.slice(0, maxEmbedLength - 1) + '…'
      }

      return {
        embeds: [
          {
            title: this.citation,
            description: versesContent,
            color: versesContent.includes('**')
              ? config.jesusColor
              : config.nonJesusColor
          }
        ]
      }
    }
  }
}
