import discord from 'discord.js'

/**
 * Validate a message to ensure it is within the limits of Discord.
 *
 * @param message The message to validate.
 * @returns Whether the message is valid.
 */
export default function validateMessage (message: discord.BaseMessageOptions): boolean {
  if ((message.embeds?.length ?? 0) > 10) return false
  if ((message.content?.length ?? 0) > 2000) return false

  let totalEmbedsLength = 0

  if (typeof message.embeds !== 'undefined') {
    (message.embeds as discord.APIEmbed[]).forEach(embed => {
      totalEmbedsLength +=
        (embed.title?.length ?? 0) +
        (embed.description?.length ?? 0)
    })
  }

  if (totalEmbedsLength > 6000) return false

  return true
}
