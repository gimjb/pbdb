import guildsController from './controllers/guilds'

const guildsWithCooldowns: Map<string, number> = new Map()
guildsController.getAll().then(guilds => {
  for (const guild of guilds) {
    if (guild.preferences.cooldown === 0) continue

    guildsWithCooldowns.set(guild.guildId, guild.preferences.cooldown)
  }
})

/**
 * A string in the format `'<guild ID>-<channel ID>-<passage name>'`.
 */
type GuildChannelPassage = `${string}-${string}-${string}`

export default class CooldownCache {
  /**
   * A map of `'<guild ID>-<channel ID>-<passage name>'` to the timestamp at
   * which the passage was sent and the timeout that will delete the passage
   * from the cache after the cooldown has expired.
   */
  private static readonly cache: Map<
    GuildChannelPassage,
    { timestamp: number; timeout: NodeJS.Timeout }
  > = new Map()
  // Objects are passed by reference, `guildsWithCooldowns` and
  // `CooldownCache.cooldowns` therefore always refer to the same object.
  private static readonly cooldowns = guildsWithCooldowns

  public static cooldownPassage(
    guildId: string,
    channelId: string,
    passageName: string
  ): void {
    if (this.cooldowns.get(guildId) === 0) return

    const key: GuildChannelPassage = `${guildId}-${channelId}-${passageName}`

    this.cache.set(key, {
      timestamp: Date.now(),
      timeout: setTimeout(() => {
        this.cache.delete(key)
      }, (this.cooldowns.get(guildId) ?? 180) * 1000)
    })
  }

  private static updateAllCooldowns(guildId: string): void {
    for (const [key, { timestamp, timeout }] of this.cache.entries()) {
      if (!key.startsWith(guildId)) continue

      clearTimeout(timeout)
      this.cache.set(key, {
        timestamp,
        timeout: setTimeout(() => {
          this.cache.delete(key)
        }, this.getCooldownValue(guildId) * 1000)
      })
    }
  }

  public static setCooldownValue(guildId: string, cooldown: number): void {
    this.cooldowns.set(guildId, cooldown)
    guildsController.update({
      guildId,
      preferences: {
        cooldown
      }
    })
    this.updateAllCooldowns(guildId)
  }

  public static getCooldownValue(guildId: string): number {
    return this.cooldowns.get(guildId) ?? 180
  }

  public static isPassageOnCooldown(
    guildId: string,
    channelId: string,
    passageName: string
  ): boolean {
    const key: GuildChannelPassage = `${guildId}-${channelId}-${passageName}`

    if (this.cache.has(key)) return true

    return false
  }
}
