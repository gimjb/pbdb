import Guild, { IGuild } from '../models/Guild'

/** Create a new guild. */
export function create(data: IGuild) {
  new Guild(data).save()
}

/** Get a guild's preferences. */
export function get(guildId: string) {
  return Guild.findOne({ guildId }).then(user => {
    if (user) return user

    return new Guild({ guildId })
  })
}

export function getAll() {
  return Guild.find()
}

/** Update a guild's preferences. */
export function update(data: IGuild) {
  const { guildId } = data

  Guild.findOne({ guildId }).then(user => {
    if (!user) user = new Guild({ guildId })

    user.preferences = data.preferences
    user.save()
  })
}

export default {
  create,
  get,
  getAll,
  update
}
