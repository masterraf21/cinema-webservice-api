import { UserModel } from '../../models'

function validateUserData(userData: Model.UserType): boolean {
  return true
}
const createUser = async (userData: Model.UserType) => {
  if (validateUserData(userData)) {
    const user: Model.IUser = new UserModel(userData)
    const result = await user.save()
    return result
  } else {
    throw new Error('User Input Data not valid')
  }
}

export { createUser }
