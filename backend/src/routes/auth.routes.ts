import { Strategy as GithubStrategy, StrategyOptions } from 'passport-github2'
import passport from 'passport'
import { Router } from 'express'
import { getEnv } from '../config'
import { checkDuplicateEmail, checkDuplicateUsername } from '../middlewares'
import * as controller from '../controllers/auth/auth.controller'

// const env = getEnv()
// const opts: StrategyOptions = {
//   clientID: env.GITHUB_CLIENT_ID!,
//   clientSecret: env.GITHUB_SECRET!,
//   callbackURL: env.GITHUB_CALLBACK_URL!
// }
const authRoutes = Router()

// passport.use(
//   new GithubStrategy(opts, function (accessToken: any, refreshToken: any, profile: any, done: any) {
//     console.log('GITHUB VALIDATION BEING CALLEd')
//     return done(null, profile)
//   })
// )

// passport.serializeUser((user, done) => {
//   done(null, user)
// })

// passport.deserializeUser((obj, done) => {
//   done(null, obj)
// })

// authRoutes.get('/auth/github', [
//   passport.authenticate('github', {
//     scope: ['user:email']
//   })
// ])
// authRoutes.get(
//   '/auth/github/callback',
//   [passport.authenticate('github')],
//   controller.githubCallback
// )
authRoutes.post('/auth/signup', [checkDuplicateEmail, checkDuplicateUsername], controller.signUp)
authRoutes.post('/auth/signin', [], controller.signIn)

export default authRoutes
