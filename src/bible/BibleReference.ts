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
  form: 'blockquote' | 'embed'
  /** Whether the quoted verses should be inline. */
  inline: boolean
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
    let versesStart = Math.min(options.versesStart, options.versesEnd)

    if (options.chapter > kjv[options.book].length) {
      throw new Error(
        `Chapter ${options.chapter} does not exist in ${options.book}.`
      )
    } else if (
      typeof kjv[options.book][options.chapter - 1]?.[versesStart - 1] ===
      'undefined'
    ) {
      throw new Error(
        `${options.book} ${options.chapter} only has ${
          kjv[options.book][options.chapter - 1]?.length
        } verses.`
      )
    }

    this.book = options.book
    this.chapter = options.chapter
    this.versesStart = versesStart
    this.versesEnd = Math.max(versesStart, Math.min(options.versesEnd, kjv[options.book][options.chapter - 1]!.length)]))
    this.citation =
      `${this.book} ${this.chapter}:` +
      (this.versesStart === this.versesEnd
        ? this.versesStart
        : `${this.versesStart}–${this.versesEnd}`) +
      ' (KJV)'
  }

  /** Returns a Discord message with the referenced verses. */
  public quote(options: BibleQuoteOptions): discord.MessageCreateOptions {
    const { form, inline } = options
    let messageContent = ''

    for (let i = this.versesStart; i <= this.versesEnd; i++) {
      let verse = kjv[this.book]?.[this.chapter - 1]?.[i - 1]

      if (inline && i !== this.versesStart) {
        verse = ` ${superscript(i)} ${verse}`
      } else if (!inline && this.versesStart !== this.versesEnd) {
        verse = `${i}. ${verse}\n`
      }

      messageContent += verse
    }

    messageContent = messageContent.trim()

    switch (form) {
      case 'blockquote':
        return {
          content: `> ${messageContent.replace(/\n/g, '\n> ')}\n> — ${
            this.citation
          }`
        }
      case 'embed':
        return {
          embeds: [
            {
              title: this.citation,
              description: messageContent,
              color: messageContent.includes('**')
                ? config.jesusColor
                : config.nonJesusColor
            }
          ]
        }
    }
  }
}
