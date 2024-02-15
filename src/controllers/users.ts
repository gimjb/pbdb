import User, { IUser } from '../models/User'

/** Create a new user. */
export async function create (data: IUser): Promise<any> {
  await new User(data).save()
}

/** Get a user's preferences. */
export async function get (id: string): Promise<any> {
  return await User.findOne({ id }).then(user => {
    if (user !== null) return user

    return new User({ id })
  })
}

/** Update a user's preferences. */
export async function update (data: IUser): Promise<void> {
  const { id } = data

  let user = await User.findOne({ id })

  if (user === null) user = new User({ id })

  user.preferences = data.preferences
  await user.save()
}

export default {
  create,
  get,
  update
}
