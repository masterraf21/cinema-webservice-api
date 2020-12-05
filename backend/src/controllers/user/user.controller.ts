import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { badRequest, internalServerError, notFoundError } from '../../errors'
import { UserModel } from '../../models'

async function getAllUsers(req: Request, res: Response) {
  try {
    const users: Model.IUser[] = await UserModel.find().exec()
    if (!users.length) {
      return notFoundError('Users', res)
    }
    res.status(200).json({
      message: 'Users found',
      length: users.length,
      users
    })
  } catch (error) {
    internalServerError(error, res)
  }
}

async function createUser(req: Request, res: Response) {
  if (
    req.body.username &&
    req.body.password &&
    req.body.full_name &&
    req.body.email &&
    req.body.gender
  ) {
    try {
      const user: Model.IUser = new UserModel(req.body)
      await user.save()
      res.status(201).json({
        message: 'User created',
        user: {
          id: user._id,
          username: user.username
        }
      })
    } catch (error) {
      internalServerError(error, res)
    }
  } else {
    badRequest('Required body not found', res)
  }
}

function validateObj(obj: string): boolean {
  return mongoose.Types.ObjectId.isValid(obj)
}

async function getUserbyId(req: Request, res: Response) {
  if (req.params.id) {
    if (!validateObj(req.params.id)) {
      return badRequest('UserId not a valid ObjectId', res)
    }
    try {
      const user: Model.IUser | null = await UserModel.findById(req.params.id).exec()
      if (!user) {
        return notFoundError('User', res)
      }
      res.json(200).json({
        message: 'User found',
        user
      })
    } catch (error) {
      internalServerError(error, res)
    }
  } else {
    badRequest('User id not provided', res)
  }
}
export { getAllUsers, createUser, getUserbyId }
