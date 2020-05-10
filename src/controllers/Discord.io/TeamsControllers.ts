import Teams from '../../schemas/Teams'
import { UserInterface } from '../../Interfaces/UserInterface'
import { MessageReaction, Message, User, PartialUser, MessageEmbed } from 'discord.js'
import Combinatorics from 'js-combinatorics'

class TeamsController {
  public async save (message: Message): Promise<void> {
    try {
      await message.react('🥉')
      await message.react('🥈')
      await message.react('🥇')
      await message.react('🏆')
      await message.react('🏁')
      let team = null
      team = await Teams.findOne({ messageId: message.id })
      if (!team) team = await Teams.create({ messageId: message.id, users: [], finished: false })
    } catch (error) {
      console.log(error)
    }
  }

  public async addUser (react: MessageReaction, user: User | PartialUser): Promise<void> {
    try {
      // find
      const team = await Teams.findOne({ messageId: react.message.id })
      if (!team) return
      // fetch number
      const placing = this.emojiToNumber(react.emoji.name)
      const author = team.users.find(element => element.authorId === user.id)
      // find author
      if (author) {
        const userReactions = react.message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id))
        for (const reaction of userReactions.values()) {
          if (reaction.emoji.name === this.numberToEmoji(author.placing.toString())) {
            await reaction.users.remove(user.id)
            const position = team.users.indexOf(author)
            team.users.splice(position, 1)
          }
        }
      }
      team.users.push({ authorId: user.id, author: user.username ? user.username : '', placing: placing })
      await team.save()
    } catch (error) {
      console.log(error)
      await Teams.deleteOne({ messageId: react.message.id })
      react.message.reply('Erro, sorteio deletado')
    }
  }

  public async selected (react: MessageReaction, user: User | PartialUser): Promise<void> {
    try {
      const team = await Teams.findOne({ messageId: react.message.id, finished: false })
      if (!team || team.users.length % 2 !== 0 || react.message.author.id !== user.id) return
      team.finished = true
      const teams = this.sortUser(team.users)

      // team A
      let fields = []
      let total = 0
      for (const a of teams?.A || []) {
        fields.push({ name: a.author, value: `${this.numberToEmoji(a.placing.toString())} (${a.placing})` })
        total = total + parseInt(`${a.placing}`)
      }
      const teamA = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Time A')
        .setDescription(`Força: ${total}`)
        .addFields(
          fields
        )
      react.message.reply(teamA)

      // team B
      fields = []
      total = 0
      for (const b of teams?.B || []) {
        fields.push({ name: b.author, value: `${this.numberToEmoji(b.placing.toString())} (${b.placing})` })
        total = total + parseInt(`${b.placing}`)
      }
      const teamB = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Time B')
        .setDescription(`Força: ${total}`)
        .addFields(
          fields
        )
      react.message.reply(teamB)
      team.save()
    } catch (error) {
      console.log(error)
    }
  }

  public sortUser (users: Array<UserInterface>): Record<string, Array<UserInterface>> | undefined {
    try {
      const randomArray = this.shuffle(users)
      const cmb = Combinatorics.combination(randomArray, (users.length / 2))
      const cmbArray = cmb.toArray()
      const mediaObject = randomArray.map(user => ({ ...user, placing: parseInt(`${user.placing}`) })).reduce((a, b) => ({ placing: a.placing + b.placing } as UserInterface))
      const media = mediaObject.placing / randomArray.length
      let prox = { array: [{ placing: 0 } as UserInterface], length: 20 }
      //
      for (const arr of cmbArray) {
        const currentObject = arr.map(user => ({ ...user, placing: parseInt(`${user.placing}`) })).reduce((a, b) => ({ placing: a.placing + b.placing } as UserInterface))
        const current = parseInt(`${currentObject.placing / (randomArray.length / 2)}`)
        if (Math.abs(media - current) < prox.length) {
          prox = { array: arr, length: Math.abs(media - current) }
        }
      }
      //
      const responseB = []
      for (const elem of randomArray) {
        if (!prox.array.find(index => index.author === elem.author)) {
          responseB.push(elem)
        }
      }
      //
      const responseA = []
      for (const a of prox.array) {
        responseA.push(a)
      }
      return { A: responseA, B: responseB }
    } catch (error) {
      console.log(error)
    }
  }

  private shuffle (array: Array<UserInterface>): Array<UserInterface> {
    let currentIndex = array.length
    let temporaryValue, randomIndex
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array
  }

  private emojiToNumber (emoji: string): number {
    switch (emoji) {
      case '🥉': {
        return 1
      }
      case '🥈': {
        return 2
      }
      case '🥇': {
        return 4
      }
      case '🏆': {
        return 6
      }
      default: {
        return 1
      }
    }
  }

  private numberToEmoji (number: string): string {
    switch (number) {
      case '1': {
        return '🥉'
      }
      case '2': {
        return '🥈'
      }
      case '4': {
        return '🥇'
      }
      case '6': {
        return '🏆'
      }
      default: {
        return 'deu ruim'
      }
    }
  }

  public teste (message: Message): void {
    const fields = [
      { name: 'Aristeu', value: '🏆 (6)' },
      { name: 'Teste 2', value: '🏆 (6)' },
      { name: 'Teste 3', value: '🏆 (6)' },
      { name: 'Teste 4', value: '🏆 (6)' }
    ]
    const teamA = new MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Time A')
      .setDescription(`Força: ${24}`)
      .addFields(
        fields
      )
    message.reply(teamA)
  }
}

export default new TeamsController()
