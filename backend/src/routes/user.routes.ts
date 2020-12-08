import { Router } from 'express'
import * as controller from '../controllers/user/user.controller'
import { isAdmin, verifyToken } from '../middlewares'
const userRoutes = Router()

userRoutes.get('/users', [verifyToken, isAdmin], controller.getAllUsers)
userRoutes.post('/users', [verifyToken, isAdmin], controller.createUser)
userRoutes.get('/users/:id', [verifyToken, isAdmin], controller.getUserbyId)

export default userRoutes
