function processLinks (text: string): string {
  let result = text.replace(/<(?<linkText>.+?@.+?\..+?)>/g, '$<linkText>')

  for (const match of text.matchAll(
    /\[(?<linkText>.+?)\]: (?<linkTarget>http.+?)\n/g
  )) {
    const linkText = match.groups?.['linkText']
    const linkTarget = match.groups?.['linkTarget']

    if (typeof linkText !== 'string' || typeof linkTarget !== 'string') continue

    result = result.replace(
      new RegExp(`(?<!\`)\\[(?<linkText>${linkText})\\](?!\\()`, 'g'),
      `[$<linkText>](${linkTarget})`
    )
  }

  // Remove square brackets from non-link text (i.e. missing links)
  result = result.replace(/(?<!`)\[(?<linkText>.+?)\](?!\()/g, '$<linkText>')

  return result
}

export default function toDiscordMarkdown (text: string): string {
  return (
    processLinks(text)
      // Horizontal rules
      .replace(/\n\n-{3,}/g, '\n\n** **\n' + ' '.repeat(50))
      // Unwrap wrapped lines.
      .replace(/(?<!\n| {2,})\n(?!(?:\n|[-*\d]| {2,}))/gm, ' ')
  )
}
