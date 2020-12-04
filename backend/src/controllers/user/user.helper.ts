import { UserModel } from '../../models'

function validateUserData(userData: Model.UserType): boolean {
  return true
}
const createUser = async (userData: Model.UserType) => {
  try {
    const existingUser = await UserModel.findOne({
      username: userData.username
    })
    if (existingUser != null) {
      throw new Error('User ' + userData.username + ' already exist')
    }
    const user: Model.IUser = new UserModel(userData)
    const result = await user.save()
    return result
  } catch (err) {
    console.log(err.message)
  }
}

export { createUser }
