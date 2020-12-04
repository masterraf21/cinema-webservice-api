// import from

import * as helper from '../controllers/user/user.helper'
import { connectDB, closeDB } from '../utils'

async function testHelper(): Promise<void> {
  try {
    connectDB()
    const userData: Model.UserType = {
      username: 'sna',
      password: 'asdfa',
      full_name: 'salroi',
      email: 'coretanaku@gmail.com',
      gender: 'Female'
    }
    const result = await helper.createUser(userData)
    if (result) {
      console.log(`Created with username ${result.username} and password ${result.password}`)
    }
    await closeDB()
    process.exit(0)
  } catch (err) {
    console.error(`${err}`)
    await closeDB()
    process.exit(0)
  }
}

testHelper()
