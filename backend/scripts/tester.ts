// import from
import { Model } from 'mongoose'

import * as userHelper from '../src/controllers/user/user.helper'
import { connectDB } from '../src/utils'

async function testHelper(): Promise<void> {
  try {
    connectDB()
    const userData: Model.UserType = {
      username: 'sybill',
      password: 'maklumboss',
      full_name: 'Charles asdadas',
      email: 'masterraf23@gmail.com'
    }
    const result = await userHelper.createUser(userData)
    console.log(result)
    // process.exit(1)
  } catch (err) {}
}

testHelper()
