import { Router } from 'express'

import UserController from './controllers/Http/UserController'

const routes = Router()

routes.get('/users', UserController.index)
routes.post('/register', UserController.create)

export default routes
