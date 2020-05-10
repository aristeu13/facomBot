import { Client, TextChannel, Message } from 'discord.js'
import MoneyController from './controllers/Discord.io/MoneyController'
import NewsletterController from './controllers/Discord.io/NewsletterController'
import TeamsController from './controllers/Discord.io/TeamsControllers'

class Bot {
    public client: Client
    private message: string
    private ufuNews: TextChannel | undefined

    constructor (client: Client) {
      this.client = client
      this.message = ''
      this.ufuNews = undefined

      this.welcome()
      this.selectMethod()
      this.onReaction()
      this.repeatMethod()
    }

    private welcome (): void {
      this.client.once('ready', () => {
        console.log(`Logged in as ${this.client.user ? this.client.user.tag : ''}`)
        this.client.channels.fetch('703415879848820748')
          .then(channel => {
            this.ufuNews = channel.type === 'text' ? channel as TextChannel : undefined
            console.log(`Connect with ${this.ufuNews ? this.ufuNews.name : 'error'}`)
          })
          .catch(err => {
            console.log(err)
          })
      })
    }

    private selectMethod (): void {
      this.client.on('message', async (msg) => {
        this.message = msg.content.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        await this.switchController(msg)
      })
    }

    private onReaction (): void {
      this.client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.partial) {
          try {
            await reaction.fetch()
          } catch (error) {
            console.log('Something went wrong when fetching the message: ', error)
          }
        }
        if (['🥉', '🥈', '🥇', '🏆'].includes(reaction.emoji.name)) {
          TeamsController.addUser(reaction, user)
        }
        if (['🏁'].includes(reaction.emoji.name)) {
          TeamsController.selected(reaction, user)
        }
      })
    }

    // add new commands in switch
    private async switchController (msg: Message): Promise<void> {
      switch (this.message) {
        case 'dolar?': {
          const dolar = await MoneyController.index()
          if (dolar) msg.reply(dolar)
          break
        }
        case 'provas?': {
          msg.reply('Em desenvolvimento')
          break
        }
        case 'times?': {
          TeamsController.save(msg)
          break
        }
        case 'teste?': {
          TeamsController.teste(msg)
          break
        }
      }
    }

    private repeatMethod (): void {
      setInterval(async () => {
        if (this.ufuNews) {
          const status = await NewsletterController.update(this.ufuNews)
          console.log(status, new Date())
        }
      }, 6000)
    }
}

export default Bot
