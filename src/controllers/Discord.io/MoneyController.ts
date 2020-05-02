import axios from 'axios'

class MoneyController {
  public async index (): Promise<string> {
    try {
      const dolar = await axios.get('http://economia.awesomeapi.com.br/json/all/USD-BRL')
      return `R$ ${Number.parseFloat(dolar.data.USD.bid).toFixed(2)}`
    } catch (error) {
      console.log(error)
      return 'Não Foi possível buscar o valor do dolár'
    }
  }
}

export default new MoneyController()
