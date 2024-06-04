import mongoose from 'mongoose'

export interface UserDoc {
  /** The user's Discord ID. */
  _id: string
  /** Whether or not the user is banned from posting Bible verses through the bot. */
  banned: boolean
  /** The user's preferences. */
  preferences: {
    /** The user's preferred verse display form. */
    verseDisplay?: 'embed' | 'blockquote'
    /** Whether or not to display verses inline. */
    inlineVerses?: boolean
    /** Whether or not to use curly quotes. */
    curlyQuotes?: boolean
  }
}

export interface UserModel extends mongoose.Model<UserDoc> {
  get: (_id: string) => Promise<mongoose.HydratedDocument<UserDoc>>
  configure: (_id: string, preferences: UserDoc['preferences']) => Promise<mongoose.HydratedDocument<UserDoc>>
}

const userSchema = new mongoose.Schema<UserDoc, UserModel>({
  _id: { type: String, required: true },
  banned: { type: Boolean, default: false },
  preferences: {
    verseDisplay: {
      type: String,
      enum: ['embed', 'blockquote'],
      default: 'embed'
    },
    inlineVerses: {
      type: Boolean,
      default: false
    },
    curlyQuotes: {
      type: Boolean,
      default: true
    }
  }
})

userSchema.static('get', async function (_id: string) {
  return (await this.findById(_id)) ?? new this({ _id })
})

userSchema.static('configure', async function (_id: string, preferences: UserDoc['preferences']) {
  return await this.findByIdAndUpdate(_id, { preferences }, { new: true, setDefaultsOnInsert: true, upsert: true })
})

/** A Discord user and their preferences. */
export default mongoose.model<UserDoc, UserModel>('User', userSchema)
