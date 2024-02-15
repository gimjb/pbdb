import Guild, { IGuild } from '../models/Guild'

/** Create a new guild. */
export async function create (data: IGuild): Promise<void> {
  await new Guild(data).save()
}

/** Get a guild's preferences. */
export async function get (guildId: string): Promise<any> {
  const guild = await Guild.findOne({ guildId })
  if (guild !== null) return guild

  return new Guild({ guildId })
}

export async function getAll (): Promise<any> {
  return await Guild.find()
}

/** Update a guild's preferences. */
export async function update (data: IGuild): Promise<void> {
  const { guildId } = data

  let guild = await Guild.findOne({ guildId })
  if (guild === null) guild = new Guild({ guildId })

  guild.preferences = data.preferences
  await guild.save()
}

export default {
  create,
  get,
  getAll,
  update
}
