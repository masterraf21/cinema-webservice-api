import jwt from 'jsonwebtoken'
import axios from 'axios'
import { getEnv } from '../../config'
import { Request, Response, NextFunction } from 'express'
import { UserModel } from '../../models'
import { badRequest, internalServerError, invalidCredentials, notFoundError } from '../../errors'
import { header } from 'express-validator'
const env = getEnv()
const secret: string = <string>env.SECRET
const clientSecret = env.GITHUB_SECRET
const clientId = env.GITHUB_CLIENT_ID
const github_callback = env.GITHUB_CALLBACK_URL
let token: any = null
function githubCallback(req: Request, res: Response) {
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    code: req.query.code
  }
  const opts = { headers: { accept: 'application/json' } }
  axios
    .post(`https://github.com/login/oauth/access_token`, body, opts)
    .then((response) => {
      // console.log(response)
      res.status(200).json(response)
      // token = response.data.access_token
    })
    .catch((err) => res.status(500).json({ message: err.message }))
}

function successHandler(req: Request, res: Response) {
  axios
    .get(`https://api.github.com/user`, {
      headers: {
        Authorization: 'token' + token
      }
    })
    .then((response) => {
      res.status(200).json({
        userData: response.data
      })
    })
}
function githubHandle(req: Request, res: Response) {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email`)
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
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      accessToken: token
    })
  } else {
    badRequest('Required body not found', res)
  }
}
export { githubCallback, signIn, signUp, githubHandle, successHandler }
