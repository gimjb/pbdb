import log from '@gimjb/log'
import guildsController from './controllers/guilds'

const guildsWithCooldowns: Map<string, number> = new Map()
guildsController
  .getAll()
  .then(guilds => {
    for (const guild of guilds) {
      if (guild.preferences.cooldown === 0) continue

      guildsWithCooldowns.set(guild.guildId, guild.preferences.cooldown)
    }
  })
  .catch(log.error)

/**
 * A string in the format `'<guild ID>-<channel ID>-<passage name>'`.
 */
type GuildChannelPassage = `${string}-${string}-${string}`

/**
 * A map of `'<guild ID>-<channel ID>-<passage name>'` to the timestamp at
 * which the passage was sent and the timeout that will delete the passage
 * from the cache after the cooldown has expired.
 */
const cache = new Map<
GuildChannelPassage,
{ timestamp: number, timeout: NodeJS.Timeout }
>()

function updateAllCooldowns (guildId: string): void {
  for (const [key, { timestamp, timeout }] of cache.entries()) {
    if (!key.startsWith(guildId)) continue

    clearTimeout(timeout)
    cache.set(key, {
      timestamp,
      timeout: setTimeout(() => {
        cache.delete(key)
      }, cooldownCache.getCooldownValue(guildId) * 1000)
    })
  }
}

const cooldownCache = {
  cooldownPassage: (
    guildId: string,
    channelId: string,
    passageName: string
  ): void => {
    if (guildsWithCooldowns.get(guildId) === 0) return

    const key: GuildChannelPassage = `${guildId}-${channelId}-${passageName}`

    cache.set(key, {
      timestamp: Date.now(),
      timeout: setTimeout(() => {
        cache.delete(key)
      }, (guildsWithCooldowns.get(guildId) ?? 180) * 1000)
    })
  },

  setCooldownValue: async (guildId: string, cooldown: number): Promise<void> => {
    guildsWithCooldowns.set(guildId, cooldown)
    await guildsController.update({ guildId, preferences: { cooldown } })
    updateAllCooldowns(guildId)
  },

  getCooldownValue: (guildId: string): number => {
    return guildsWithCooldowns.get(guildId) ?? 180
  },

  isPassageOnCooldown: (
    guildId: string,
    channelId: string,
    passageName: string
  ): boolean => {
    const key: GuildChannelPassage = `${guildId}-${channelId}-${passageName}`

    if (cache.has(key)) return true

    return false
  }
}

export default cooldownCache
