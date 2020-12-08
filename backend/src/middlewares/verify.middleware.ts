import { Request, Response, NextFunction } from 'express'
import { badRequest } from '../errors'
import { UserModel } from '../models'

export async function checkDuplicateUsername(req: Request, res: Response, next: NextFunction) {
  const user: Model.IUser | null = await UserModel.findOne({
    username: req.body.username
  })
  if (user) {
    return badRequest('Username already taken', res)
  } else {
    next()
  }
}

export async function checkDuplicateEmail(req: Request, res: Response, next: NextFunction) {
  const user: Model.IUser | null = await UserModel.findOne({
    email: req.body.email
  })
  if (user) {
    return badRequest('Email already taken', res)
  } else {
    next()
  }
}
