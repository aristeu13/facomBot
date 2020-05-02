import { Client, TextChannel } from 'discord.js'
import MoneyController from './controllers/Discord.io/MoneyController'
import NewsletterController from './controllers/Discord.io/NewsletterController'

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
        const answer = await this.switchController()
        if (answer) msg.reply(answer)
      })
    }

    // add new commands in switch
    private async switchController (): Promise<string | undefined> {
      switch (this.message) {
        case 'dolar?': {
          const dolar = await MoneyController.index()
          return dolar || ''
        }
        case 'provas?': {
          return 'Em desenvolvimento'
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
