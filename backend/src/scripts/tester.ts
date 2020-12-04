// import from

import * as helper from '../controllers/user/user.helper'
import { connectDB, closeDB } from '../utils'

async function testHelper(): Promise<void> {
  try {
    connectDB()
    const userData: Model.UserType = {
      username: 'mihao',
      password: 'asdfa',
      full_name: 'Charles Kinbote',
      email: 'masterraf23@gmail.com'
    }
    await helper.createUser(userData)
    // closeDB()
    // process.exit(1)
  } catch (err) {
    console.error(err.message)
    // closeDB()
    // process.exit(1)
  }
}

testHelper()
