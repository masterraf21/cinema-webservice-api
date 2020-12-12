import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { getEnv } from '../config'
import { invalidCredentials, unAuthorizedError } from '../errors'
// import { UserModel } from '../models'

const env = getEnv()
const secret: string = <string>env.SECRET

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers['x-access-token']
  let jwtPayload
  if (!token) {
    return unAuthorizedError('No token provided', res)
  }

  try {
    jwtPayload = <any>jwt.verify(token, secret)
    res.locals.jwtPayload = jwtPayload
    next()
  } catch (err) {
    invalidCredentials(res)
  }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const role = res.locals.jwtPayload.role
  if (role === 'Admin') {
    next()
  } else {
    unAuthorizedError('Admin Access Required', res)
  }
}
