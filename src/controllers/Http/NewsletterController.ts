import { Response, Request } from 'express'

import Newsletter from '../../schemas/Newsletter'

class NewsletterController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const newsletter = await Newsletter.find()
      return res.json(newsletter)
    } catch (error) {
      console.log(error)
      return res.json({ error: 'internal error' })
    }
  }
}

export default new NewsletterController()
