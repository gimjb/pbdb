import mongoose from 'mongoose'

export interface IGuild {
  /** The guild's Discord ID. */
  guildId: string
  /** The guild's preferences. */
  preferences: {
    /** The cooldown in seconds for Bible passages. */
    cooldown: number
  }
}

const guildSchema = new mongoose.Schema<IGuild>({
  guildId: { type: String, required: true },
  preferences: {
    cooldown: {
      type: Number,
      default: 180
    }
  }
})

/** A Discord guild and its preferences. */
export default mongoose.model('Guild', guildSchema)
