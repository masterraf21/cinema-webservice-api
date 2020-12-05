import { Router } from 'express'
import * as controller from '../controllers/user/user.controller'
const userRoutes = Router()

userRoutes.get('/users', controller.getAllUsers)
userRoutes.post('/users', controller.createUser)
userRoutes.get('/users/:id', controller.getUserbyId)

export default userRoutes
