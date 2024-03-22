import mongoose from 'mongoose'

export interface GuildDoc {
  /** The guild's Discord ID. */
  _id: string
  /** The guild's preferences. */
  preferences: {
    /** The cooldown in seconds for Bible passages. */
    cooldown: number
  }
}

export interface GuildModel extends mongoose.Model<GuildDoc> {
  get: (_id: string) => Promise<mongoose.HydratedDocument<GuildDoc>>
  configure: (_id: string, preferences: GuildDoc['preferences']) => Promise<mongoose.HydratedDocument<GuildDoc>>
}

const guildSchema = new mongoose.Schema<GuildDoc, GuildModel>({
  _id: { type: String, required: true },
  preferences: {
    cooldown: { type: Number, default: 180 }
  }
})

guildSchema.static('get', async function (_id: string) {
  return (await this.findById(_id)) ?? new this({ _id })
})

guildSchema.static('configure', async function (_id: string, preferences: GuildDoc['preferences']) {
  return await this.findByIdAndUpdate(_id, { preferences }, { new: true, setDefaultsOnInsert: true, upsert: true })
})

/** A Discord guild and its preferences. */
export default mongoose.model<GuildDoc, GuildModel>('Guild', guildSchema)
