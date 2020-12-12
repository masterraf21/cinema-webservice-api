import jwt from 'jsonwebtoken'
import { getEnv } from '../../config'
const env = getEnv()
const secret: string = <string>env.SECRET
import { Request, Response, NextFunction } from 'express'
import { UserModel } from '../../models'
import { badRequest, internalServerError, invalidCredentials, notFoundError } from '../../errors'

async function githubCallback(req: Request, res: Response) {
  console.log(req.user)
}
async function signUp(req: Request, res: Response) {
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
        message: 'User Registered',
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
async function signIn(req: Request, res: Response) {
  if (req.body.username && req.body.password) {
    const { username, password } = req.body
    const user: Model.IUser | null = await UserModel.findOne({
      username: username
    })
    if (!user) return notFoundError('User', res)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!user?.authenticate(password)) return invalidCredentials(res)

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email
      },
      secret,
      {
        expiresIn: 18000
      }
    )

    res.status(200).json({
      message: 'User Authenticated',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      accessToken: token
    })
  } else {
    badRequest('Required body not found', res)
  }
}
export { githubCallback, signIn, signUp }
