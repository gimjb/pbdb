export default function toDiscordMarkdown(text: string) {
  return (
    text
      // Remove links that are not supported in Discord Markdown.
      .replace(/\[.+?]: http.+\n/g, '')
      .replace(/\[(?<linkText>.+?)](?!\()/g, '$<linkText>')
      // `mailto:` links are not supported in Discord Markdown.
      .replace(/\<(?<linkText>.+?@.+?\..+?)\>/g, '$<linkText>')
      // Horizontal rules
      .replace(/^-{3,}/g, '—')
      // Unwrap wrapped lines.
      .replace(/(?<!\n| {2,})\n(?!(?:\n|[-*\d]| {2,}))/gm, ' ')
  )
}
