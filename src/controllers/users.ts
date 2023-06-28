import User, { IUser } from '../models/User'

/** Create a new user. */
export function create(data: IUser) {
  new User(data).save()
}

/** Get a user's preferences. */
export function get(id: string) {
  return User.findOne({ id }).then(user => {
    if (user) return user

    return new User({ id })
  })
}

/** Update a user's preferences. */
export function update(data: IUser) {
  const { id } = data

  User.findOne({ id }).then(user => {
    if (!user) user = new User({ id })

    user.preferences = data.preferences
    user.save()
  })
}

export default {
  create,
  get,
  update
}
