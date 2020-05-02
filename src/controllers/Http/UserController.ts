import { Request, Response } from 'express'
import User from '../../schemas/User'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const users = await User.find()
      return res.json(users)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'internal error' })
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const { email, name, password } = req.body
      if (!email) throw new Error('invalid email')
      const user = await User.create({ name: name, email: email, password: password })
      return res.json(user)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'internal error' })
    }
  }
}

export default new UserController()
