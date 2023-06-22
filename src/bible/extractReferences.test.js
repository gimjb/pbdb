const extractReferences = require('./extractReferences').default

test('return an empty array if no references are found', () => {
  const text = 'This is a text without any references.'
  const references = extractReferences(text)
  expect(references.length).toBe(0)
})

test('extract a reference to a single verse', () => {
  const text = 'This is a text with a reference to Ephesians 1:4.'
  const references = extractReferences(text)
  expect(references.length).toBe(1)
  expect(references[0].book).toBe('Ephesians')
  expect(references[0].chapter).toBe(1)
  expect(references[0].versesStart).toBe(4)
  expect(references[0].versesEnd).toBe(4)
})

test('extract a reference to a range of verses', () => {
  const text = 'This is a text with a reference to Romans 8:28-30.'
  const references = extractReferences(text)
  expect(references.length).toBe(1)
  expect(references[0].book).toBe('Romans')
  expect(references[0].chapter).toBe(8)
  expect(references[0].versesStart).toBe(28)
  expect(references[0].versesEnd).toBe(30)
})

test('extract a reference to a three-digit chapter and verses', () => {
  const text = 'This is a text with a reference to Psalm 119:161-168.'
  const references = extractReferences(text)
  expect(references.length).toBe(1)
  expect(references[0].book).toBe('Psalms')
  expect(references[0].chapter).toBe(119)
  expect(references[0].versesStart).toBe(161)
  expect(references[0].versesEnd).toBe(168)
})

test('extract a reference to a book with whitespace in its name', () => {
  const text = 'This is a text with a reference to 2 John 1:4.'
  const references = extractReferences(text)
  expect(references.length).toBe(1)
  expect(references[0].book).toBe('2 John')
  expect(references[0].chapter).toBe(1)
  expect(references[0].versesStart).toBe(4)
  expect(references[0].versesEnd).toBe(4)
})

test('extract multiple references with short book names (Gen, Jhn, etc.) and en-dash', () => {
  const text =
    'This is a text with a reference to 1 Cor 10:31 and another to Rom 9:15–24.'
  const references = extractReferences(text)
  expect(references.length).toBe(2)
  expect(references[0].book).toBe('1 Corinthians')
  expect(references[0].chapter).toBe(10)
  expect(references[0].versesStart).toBe(31)
  expect(references[0].versesEnd).toBe(31)
  expect(references[1].book).toBe('Romans')
  expect(references[1].chapter).toBe(9)
  expect(references[1].versesStart).toBe(15)
  expect(references[1].versesEnd).toBe(24)
})
