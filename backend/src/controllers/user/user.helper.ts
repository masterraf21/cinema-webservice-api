import { UserModel } from '../../models'

const createUser = async (userData: Model.UserType) => {
  try {
    const existingUser = await UserModel.findOne({
      username: userData.username
    })
    if (existingUser != null) {
      throw new Error(`User ${userData.username} already exist`)
    }
    const user: Model.IUser = new UserModel(userData)
    const result = await user.save()
    return result
  } catch (err) {
    throw new Error(err.message)
  }
}

export { createUser }
