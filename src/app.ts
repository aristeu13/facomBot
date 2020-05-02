import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Discord from 'discord.js'
import './config/env.config'
import routes from './routes'
import Bot from './bot'

class App {
    public express: express.Application
    public bot: Bot

    public constructor () {
      this.express = express()
      this.bot = new Bot(new Discord.Client())

      this.authDiscord()
      this.middlewares()
      this.database()
      this.routes()
    }

    private middlewares (): void {
      this.express.use(express.json())
      this.express.use(cors())
    }

    private database (): void {
      mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
        .then(() => {
          console.log('mongodb is connected')
        })
        .catch(error => {
          console.log(error)
        })
    }

    private routes (): void {
      this.express.use(routes)
    }

    private authDiscord (): void {
      this.bot.client.login(process.env.AUTH_DISCORD)
    }
}

export default new App().express
