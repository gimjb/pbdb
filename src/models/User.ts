import mongoose from 'mongoose'

export interface IUser {
  /** The user's Discord ID. */
  id: string
  /** The user's preferences. */
  preferences: {
    /** The user's preferred verse display form. */
    verseDisplay?: 'embed' | 'blockquote'
    /** Whether or not to display verses inline. */
    inlineVerses?: boolean
  }
}

const userSchema = new mongoose.Schema<IUser>({
  id: { type: String, required: true },
  preferences: {
    verseDisplay: {
      type: String,
      enum: ['embed', 'blockquote'],
      default: 'embed'
    },
    inlineVerses: {
      type: Boolean,
      default: false
    }
  }
})

/** A Discord user and their preferences. */
export default mongoose.model('User', userSchema)
