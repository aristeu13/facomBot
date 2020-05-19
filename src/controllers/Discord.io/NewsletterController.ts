import Newsletter from '../../schemas/Newsletter'
import axios from 'axios'
import cheerio from 'cheerio'
import { TextChannel } from 'discord.js'

class NewsletterController {
  public async update (ufuNews: TextChannel): Promise<string> {
    try {
      const link = 'http://www.comunica.ufu.br/noticias'
      const site = await axios(link)
      const html = site.data
      const $ = cheerio.load(html)
      const newsletterArray = $('.view-mode-todas_as_noticias')
      newsletterArray.each(async function (this: CheerioElement) {
        try {
          const title = $(this).find('.even > h4 > a')
          const img = $(this).find('.even > a > img').attr('src') as string
          const description = $(this).find('.linha-fina-noticia-destaque > div > div').text()

          const getRow = await Newsletter.findOne({ title: title.text() })

          if (!getRow) {
            if(img) await ufuNews.send('**' + title.text() + '**' + '\n' + description + '\n' + link + title.attr('href'), { files: [img] })
            else await ufuNews.send('**' + title.text() + '**' + '\n' + description + '\n' + link + title.attr('href'))
            await Newsletter.create({ title: title.text(), img: img, description: description })
          }
        } catch (error) {
          console.log(error)
        }
      })
      return 'OK'
    } catch (error) {
      console.log(error)
      return 'error'
    }
  }
}

export default new NewsletterController()
