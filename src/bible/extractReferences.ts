import type BibleBookName from './BibleBookName'
import BibleReference from './BibleReference'

function createSynonymsMap(
  synonyms: Array<[BibleBookName, ...string[]]>
): Map<string, BibleBookName> {
  const map = new Map<string, BibleBookName>()

  for (const synonymGroup of synonyms) {
    for (const synonym of synonymGroup) {
      map.set(synonym, synonymGroup[0])

      // Add a version of the synonym with all whitespace removed. This makes it
      // easier to match against user input (see `extractReferences()` below).
      map.set(synonym.toLowerCase().replace(/\s/g, ''), synonymGroup[0])
    }
  }

  return map
}

const bookNameSynonyms = createSynonymsMap([
  ['Genesis', 'Gen', 'Gn'],
  ['Exodus', 'Exod', 'Ex'],
  ['Leviticus', 'Lev', 'Lv'],
  ['Numbers', 'Num', 'Nm'],
  ['Deuteronomy', 'Deut', 'Dt'],
  ['Joshua', 'Josh', 'Jos', 'Jsh'],
  ['Judges', 'Judg', 'Jdg', 'Jg', 'Jdgs'],
  ['Ruth', 'Rth', 'Ru'],
  [
    '1 Samuel',
    '1 Sam',
    '1 Sa',
    '1S',
    'I Samuel',
    'I Sam',
    'I Sa',
    '1st Samuel',
    'First Samuel'
  ],
  [
    '2 Samuel',
    '2 Sam',
    '2 Sa',
    '2S',
    'II Samuel',
    'II Sam',
    'II Sa',
    '2nd Samuel',
    'Second Samuel'
  ],
  [
    '1 Kings',
    '1 Kgs',
    '1 Ki',
    '1K',
    'I Kings',
    'I Kgs',
    'I Ki',
    '1st Kings',
    'First Kings'
  ],
  [
    '2 Kings',
    '2 Kgs',
    '2 Ki',
    '2K',
    'II Kings',
    'II Kgs',
    'II Ki',
    '2nd Kings',
    'Second Kings'
  ],
  [
    '1 Chronicles',
    '1 Chron',
    '1 Ch',
    '1Chr',
    'I Chronicles',
    'I Chron',
    'I Ch',
    '1st Chronicles',
    'First Chronicles'
  ],
  [
    '2 Chronicles',
    '2 Chron',
    '2 Ch',
    '2Chr',
    'II Chronicles',
    'II Chron',
    'II Ch',
    '2nd Chronicles',
    'Second Chronicles'
  ],
  ['Ezra', 'Ezr'],
  ['Nehemiah', 'Neh', 'Ne'],
  ['Esther', 'Esth', 'Est', 'Es'],
  ['Job', 'Jb'],
  ['Psalms', 'Psalm', 'Ps', 'Psa', 'Psm', 'Pss'],
  ['Proverbs', 'Prov', 'Prv', 'Pr', 'Pro'],
  ['Ecclesiastes', 'Eccles', 'Eccl', 'Ecc', 'Qoh', 'Qoheleth'],
  [
    'Song of Solomon',
    'Song of Songs',
    'Song',
    'SOS',
    'Canticle of Canticles',
    'Canticles',
    'Cant',
    'Can'
  ],
  ['Isaiah', 'Isa', 'Is'],
  ['Jeremiah', 'Jer', 'Je', 'Jr'],
  ['Lamentations', 'Lam', 'La'],
  ['Ezekiel', 'Ezek', 'Eze', 'Ezk'],
  ['Daniel', 'Dan', 'Da', 'Dn'],
  ['Hosea', 'Hos', 'Ho'],
  ['Joel', 'Jl', 'Joe'],
  ['Amos', 'Am'],
  ['Obadiah', 'Obad', 'Ob'],
  ['Jonah', 'Jon'],
  ['Micah', 'Mic'],
  ['Nahum', 'Nah'],
  ['Habakkuk', 'Hab', 'Hb'],
  ['Zephaniah', 'Zeph', 'Zep', 'Zp'],
  ['Haggai', 'Hag', 'Hg'],
  ['Zechariah', 'Zech', 'Zec', 'Zc'],
  ['Malachi', 'Mal', 'Ml'],
  ['Matthew', 'Matt', 'Mat', 'Mt'],
  ['Mark', 'Mk', 'Mr'],
  ['Luke', 'Lk', 'Lu'],
  ['John', 'Jn', 'Jhn'],
  ['Acts', 'Ac'],
  ['Romans', 'Rom', 'Ro', 'Rm'],
  [
    '1 Corinthians',
    '1 Cor',
    '1 Co',
    '1Co',
    'I Corinthians',
    'I Cor',
    'I Co',
    '1st Corinthians',
    'First Corinthians'
  ],
  [
    '2 Corinthians',
    '2 Cor',
    '2 Co',
    '2Co',
    'II Corinthians',
    'II Cor',
    'II Co',
    '2nd Corinthians',
    'Second Corinthians'
  ],
  ['Galatians', 'Gal', 'Ga'],
  ['Ephesians', 'Eph', 'Ep'],
  ['Philippians', 'Phil', 'Php', 'Pp'],
  ['Colossians', 'Col', 'Co'],
  [
    '1 Thessalonians',
    '1 Thess',
    '1 Th',
    '1Th',
    'I Thessalonians',
    'I Thess',
    'I Th',
    '1st Thessalonians',
    'First Thessalonians'
  ],
  [
    '2 Thessalonians',
    '2 Thess',
    '2 Th',
    '2Th',
    'II Thessalonians',
    'II Thess',
    'II Th',
    '2nd Thessalonians',
    'Second Thessalonians'
  ],
  [
    '1 Timothy',
    '1 Tim',
    '1 Ti',
    '1Ti',
    'I Timothy',
    'I Tim',
    'I Ti',
    '1st Timothy',
    'First Timothy'
  ],
  [
    '2 Timothy',
    '2 Tim',
    '2 Ti',
    '2Ti',
    'II Timothy',
    'II Tim',
    'II Ti',
    '2nd Timothy',
    'Second Timothy'
  ],
  ['Titus', 'Ti', 'Tt'],
  ['Philemon', 'Philem', 'Phm', 'Pm'],
  ['Hebrews', 'Heb', 'He'],
  ['James', 'Jas', 'Jm'],
  [
    '1 Peter',
    '1 Pet',
    '1 Pe',
    '1Pe',
    'I Peter',
    'I Pet',
    'I Pe',
    '1st Peter',
    'First Peter'
  ],
  [
    '2 Peter',
    '2 Pet',
    '2 Pe',
    '2Pe',
    'II Peter',
    'II Pet',
    'II Pe',
    '2nd Peter',
    'Second Peter'
  ],
  ['1 John', '1 Jn', '1Jn', 'I John', 'I Jn', '1Jn', '1st John', 'First John'],
  [
    '2 John',
    '2 Jn',
    '2Jn',
    'II John',
    'II Jn',
    '2Jn',
    '2nd John',
    'Second John'
  ],
  [
    '3 John',
    '3 Jn',
    '3Jn',
    'III John',
    'III Jn',
    '3Jn',
    '3rd John',
    'Third John'
  ],
  ['Jude', 'Jud', 'Jd'],
  ['Revelation', 'Rev', 'Re']
])

function createBookNameRegex() {
  const bookNames = Array.from(bookNameSynonyms.keys())
  return new RegExp(
    `(?<bookName>${bookNames
      .join('|')
      .replace(
        ' ',
        '\\s*'
      )})\\s*(?<chapter>\\d{1,3}):(?<versesStart>\\d{1,3})(?:[-–—](?<versesEnd>\\d{1,3}))?`,
    'gi'
  )
}

const referenceRegex = createBookNameRegex()

export default function extractReferences(text: string): BibleReference[] {
  const references: BibleReference[] = []

  for (const match of text.matchAll(referenceRegex)) {
    if (
      !match.groups ||
      !match.groups['bookName'] ||
      !match.groups['chapter'] ||
      !match.groups['versesStart']
    ) {
      continue
    }

    const bookName = bookNameSynonyms.get(
      match.groups['bookName'].toLowerCase().replace(/\s+/g, '')
    )

    if (!bookName) {
      continue
    }

    references.push(
      new BibleReference({
        book: bookName,
        chapter: parseInt(match.groups['chapter']),
        versesStart: parseInt(match.groups['versesStart']),
        versesEnd: parseInt(
          match.groups['versesEnd'] ?? match.groups['versesStart']
        )
      })
    )
  }

  return references
}
