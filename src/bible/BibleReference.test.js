const BibleReference = require('./BibleReference').default

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
          description: expectedVerse
        }
      ]
    })
  })

  test('embed; not inline', () => {
    expect(ref.quote({ form: 'embed', inline: false })).toMatchObject({
      embeds: [
        {
          title: expectedCitation,
          description: `${expectedVerse}`
        }
      ]
    })
  })
})

describe('quote multiple verses', () => {
  const ref = new BibleReference({
    book: 'John',
    chapter: 3,
    versesStart: 16,
    versesEnd: 18
  })
  const expectedCitation = 'John 3:16–18 (KJV)'
  const expectedVerses = [
    '**For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.**',
    '**For God sent not his Son into the world to condemn the world; but that the world through him might be saved.**',
    '**He that believeth on him is not condemned: but he that believeth not is condemned already, because he hath not believed in the name of the only begotten Son of God.**'
  ]

  test('blockquote; inline', () => {
    expect(ref.quote({ form: 'blockquote', inline: true }).content).toBe(
      `> ${expectedVerses[0]} ¹⁷ ${expectedVerses[1]} ¹⁸ ${expectedVerses[2]}\n> — ${expectedCitation}`
    )
  })

  test('blockquote; not inline', () => {
    expect(ref.quote({ form: 'blockquote', inline: false }).content).toBe(
      `> 16. ${expectedVerses[0]}\n> 17. ${expectedVerses[1]}\n> 18. ${expectedVerses[2]}\n> — ${expectedCitation}`
    )
  })

  test('embed; inline', () => {
    expect(ref.quote({ form: 'embed', inline: true })).toMatchObject({
      embeds: [
        {
          title: expectedCitation,
          description: `${expectedVerses[0]} ¹⁷ ${expectedVerses[1]} ¹⁸ ${expectedVerses[2]}`
        }
      ]
    })
  })

  test('embed; not inline', () => {
    expect(ref.quote({ form: 'embed', inline: false })).toMatchObject({
      embeds: [
        {
          title: expectedCitation,
          description: `16. ${expectedVerses[0]}\n17. ${expectedVerses[1]}\n18. ${expectedVerses[2]}`
        }
      ]
    })
  })
})
