import { Router } from 'express'
import { getEnv } from '../config'
import { checkDuplicateEmail, checkDuplicateUsername } from '../middlewares'
import * as controller from '../controllers/auth/auth.controller'

const authRoutes = Router()

authRoutes.get('/auth/github', controller.githubHandle)
authRoutes.get('/auth/github/callback', controller.githubCallback)
authRoutes.get('/auth/success', controller.successHandler)
authRoutes.post('/auth/signup', [checkDuplicateEmail, checkDuplicateUsername], controller.signUp)
authRoutes.post('/auth/signin', [], controller.signIn)

export default authRoutes
