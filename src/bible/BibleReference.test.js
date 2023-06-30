const BibleReference = require('./BibleReference').default
const config = require('../config').default

describe('quote one referenced verse', () => {
  const ref = new BibleReference({
    book: 'John',
    chapter: 3,
    versesStart: 16,
    versesEnd: 16
  })
  const expectedCitation = 'John 3:16 (KJV)'
  const expectedVerse =
    '**For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.**'

  test('blockquote; inline', () => {
    expect(ref.quote({ form: 'blockquote', inline: true }).content).toBe(
      `> ${expectedVerse}\n> — ${expectedCitation}`
    )
  })

  test('blockquote; not inline', () => {
    expect(ref.quote({ form: 'blockquote', inline: false }).content).toBe(
      `> ${expectedVerse}\n> — ${expectedCitation}`
    )
  })

  test('embed; inline', () => {
    expect(ref.quote({ form: 'embed', inline: true })).toMatchObject({
      embeds: [
        {
          title: expectedCitation,
          description: expectedVerse,
          color: config.jesusColor
        }
      ]
    })
  })

  test('embed; not inline', () => {
    expect(ref.quote({ form: 'embed', inline: false })).toMatchObject({
      embeds: [
        {
          title: expectedCitation,
          description: `${expectedVerse}`,
          color: config.jesusColor
        }
      ]
    })
  })
})

describe('quote multiple verses', () => {
  const ref = new BibleReference({
    book: 'Ephesians',
    chapter: 1,
    versesStart: 4,
    versesEnd: 5
  })
  const expectedCitation = 'Ephesians 1:4–5 (KJV)'
  const expectedVerses = [
    'According as he hath chosen us in him before the foundation of the world, that we should be holy and without blame before him in love:',
    'Having predestinated us unto the adoption of children by Jesus Christ to himself, according to the good pleasure of his will,'
  ]

  test('blockquote; inline', () => {
    expect(ref.quote({ form: 'blockquote', inline: true }).content).toBe(
      `> ${expectedVerses[0]} ⁵ ${expectedVerses[1]}\n> — ${expectedCitation}`
    )
  })

  test('blockquote; not inline', () => {
    expect(ref.quote({ form: 'blockquote', inline: false }).content).toBe(
      `> 4. ${expectedVerses[0]}\n> 5. ${expectedVerses[1]}\n> — ${expectedCitation}`
    )
  })

  test('embed; inline', () => {
    expect(ref.quote({ form: 'embed', inline: true })).toMatchObject({
      embeds: [
        {
          title: expectedCitation,
          description: `${expectedVerses[0]} ⁵ ${expectedVerses[1]}`,
          color: config.nonJesusColor
        }
      ]
    })
  })

  test('embed; not inline', () => {
    expect(ref.quote({ form: 'embed', inline: false })).toMatchObject({
      embeds: [
        {
          title: expectedCitation,
          description: `4. ${expectedVerses[0]}\n5. ${expectedVerses[1]}`,
          color: config.nonJesusColor
        }
      ]
    })
  })
})
