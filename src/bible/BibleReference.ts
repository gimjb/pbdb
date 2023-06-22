import discord from 'discord.js'
import type BibleBookName from './BibleBookName'
import kjvImport from './kjv.json'

const kjv = kjvImport as Record<
  BibleBookName,
  Record<number, Record<number, string>>
>

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
  public readonly book
  public readonly chapter
  public readonly versesStart
  public readonly versesEnd

  constructor(options: BibleReferenceOptions) {
    this.book = options.book
    this.chapter = options.chapter
    this.versesStart = options.versesStart
    this.versesEnd = options.versesEnd
  }

  /** Returns a Discord message with the referenced verses. */
  public quote(options: BibleQuoteOptions): discord.MessageCreateOptions {
    const { form, inline } = options
    let messageContent = ''

    for (let i = this.versesStart; i <= this.versesEnd; i++) {
      const verse = kjv[this.book]?.[this.chapter - 1]?.[i - 1]

      if (inline) {
        if (i !== this.versesStart) {
          messageContent += ` ${superscript(i)} `
        }

        messageContent += verse
      } else {
        if (this.versesStart !== this.versesEnd) {
          messageContent += `${i}. `
        }
        messageContent += `${verse}\n`
      }
    }

    messageContent = messageContent.trim()

    const citation =
      `${this.book} ${this.chapter}:` +
      (this.versesStart === this.versesEnd
        ? this.versesStart
        : `${this.versesStart}–${this.versesEnd}`) +
      ' (KJV)'

    switch (form) {
      case 'blockquote':
        return {
          content: `> ${messageContent.replace(/\n/g, '\n> ')}\n> — ${citation}`
        }
      case 'embed':
        return {
          embeds: [
            {
              title: citation,
              description: messageContent
            }
          ]
        }
    }
  }
}
