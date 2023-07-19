const BibleReference = require('./BibleReference').default
const config = require('../config').default

const ref1Citation = 'John 3:5 (KJV)'
const ref1Verses = [
  'Jesus answered, **Verily, verily, I say unto thee, Except a man be born of ' +
    'water and *of* the Spirit, he cannot enter into the kingdom of God.**'
]
const ref1 = new BibleReference({
  book: 'John',
  chapter: 3,
  versesStart: 5,
  versesEnd: 5
})

const ref2Citation = 'Ephesians 1:4–5 (KJV)'
const ref2Verses = [
  'According as he hath chosen us in him before the foundation of the world, ' +
    'that we should be holy and without blame before him in love:',
  'Having predestinated us unto the adoption of children by Jesus Christ to ' +
    'himself, according to the good pleasure of his will,'
]
const ref2 = new BibleReference({
  book: 'Ephesians',
  chapter: 1,
  versesStart: 4,
  versesEnd: 5
})

const ref3Citation = 'Romans 5:20–21 (KJV)'
const ref3Verses = [
  'Moreover the law entered, that the offence might abound. But where sin ' +
    'abounded, grace did much more abound:',
  'That as sin hath reigned unto death, even so might grace reign through ' +
    'righteousness unto eternal life by Jesus Christ our Lord.'
]
const ref3 = new BibleReference({
  book: 'Romans',
  chapter: 5,
  versesStart: 20,
  versesEnd: 1_000 // should be capped at 21, the last verse in the chapter.
})

describe('blockquote; inline verses', () => {
  it('should quote a single verse', () => {
    expect(
      ref1.quote({ verseDisplay: 'blockquote', inlineVerses: true }).content
    ).toBe(`> ${ref1Verses}\n> — ${ref1Citation}`)
  })

  it('should quote a range of verses', () => {
    expect(
      ref2.quote({ verseDisplay: 'blockquote', inlineVerses: true }).content
    ).toBe(`> ${ref2Verses[0]} ⁵ ${ref2Verses[1]}\n> — ${ref2Citation}`)
  })

  it('should quote from one verse onwards', () => {
    expect(
      ref3.quote({ verseDisplay: 'blockquote', inlineVerses: true }).content
    ).toBe(`> ${ref3Verses[0]} ²¹ ${ref3Verses[1]}\n> — ${ref3Citation}`)
  })
})

describe('blockquote; separate verses', () => {
  it('should quote a single verse', () => {
    expect(
      ref1.quote({ verseDisplay: 'blockquote', inlineVerses: false }).content
    ).toBe(`> ${ref1Verses[0]}\n> — ${ref1Citation}`)
  })

  it('should quote a range of verses', () => {
    expect(
      ref2.quote({ verseDisplay: 'blockquote', inlineVerses: false }).content
    ).toBe(`> 4. ${ref2Verses[0]}\n> 5. ${ref2Verses[1]}\n> — ${ref2Citation}`)
  })

  it('should quote from one verse onwards', () => {
    expect(
      ref3.quote({ verseDisplay: 'blockquote', inlineVerses: false }).content
    ).toBe(
      `> 20. ${ref3Verses[0]}\n> 21. ${ref3Verses[1]}\n> — ${ref3Citation}`
    )
  })
})

describe('embed; inline verses', () => {
  it('should quote a single verse', () => {
    expect(
      ref1.quote({ verseDisplay: 'embed', inlineVerses: true })
    ).toMatchObject({
      embeds: [
        {
          title: ref1Citation,
          description: ref1Verses[0],
          color: config.jesusColor
        }
      ]
    })
  })

  it('should quote a range of verses', () => {
    expect(
      ref2.quote({ verseDisplay: 'embed', inlineVerses: true })
    ).toMatchObject({
      embeds: [
        {
          title: ref2Citation,
          description: `${ref2Verses[0]} ⁵ ${ref2Verses[1]}`,
          color: config.nonJesusColor
        }
      ]
    })
  })

  it('should quote from one verse onwards', () => {
    expect(
      ref3.quote({ verseDisplay: 'embed', inlineVerses: true })
    ).toMatchObject({
      embeds: [
        {
          title: ref3Citation,
          description: `${ref3Verses[0]} ²¹ ${ref3Verses[1]}`,
          color: config.nonJesusColor
        }
      ]
    })
  })
})

describe('embed; separate verses', () => {
  it('should quote a single verse', () => {
    expect(
      ref1.quote({ verseDisplay: 'embed', inlineVerses: false })
    ).toMatchObject({
      embeds: [
        {
          title: ref1Citation,
          description: ref1Verses[0],
          color: config.jesusColor
        }
      ]
    })
  })

  it('should quote a range of verses', () => {
    expect(
      ref2.quote({ verseDisplay: 'embed', inlineVerses: false })
    ).toMatchObject({
      embeds: [
        {
          title: ref2Citation,
          description: `4. ${ref2Verses[0]}\n5. ${ref2Verses[1]}`,
          color: config.nonJesusColor
        }
      ]
    })
  })

  it('should quote from one verse onwards', () => {
    expect(
      ref3.quote({ verseDisplay: 'embed', inlineVerses: false })
    ).toMatchObject({
      embeds: [
        {
          title: ref3Citation,
          description: `20. ${ref3Verses[0]}\n21. ${ref3Verses[1]}`,
          color: config.nonJesusColor
        }
      ]
    })
  })
})
