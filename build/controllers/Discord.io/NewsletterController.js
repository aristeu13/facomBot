"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Newsletter_1 = __importDefault(require("../../schemas/Newsletter"));
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
class NewsletterController {
    async update(ufuNews) {
        try {
            const link = 'http://www.comunica.ufu.br/noticias';
            const site = await axios_1.default(link);
            const html = site.data;
            const $ = cheerio_1.default.load(html);
            const newsletterArray = $('.view-mode-todas_as_noticias');
            newsletterArray.each(async function () {
                try {
                    const title = $(this).find('.even > h4 > a');
                    const img = $(this).find('.even > a > img').attr('src');
                    const description = $(this).find('.linha-fina-noticia-destaque > div > div').text();
                    const getRow = await Newsletter_1.default.findOne({ title: title.text() });
                    if (!getRow) {
                        await ufuNews.send('**' + title.text() + '**' + '\n' + description + '\n' + link + title.attr('href'), { files: [img] });
                        await Newsletter_1.default.create({ title: title.text(), img: img, description: description });
                    }
                }
                catch (error) {
                    console.log(error);
                }
            });
            return 'OK';
        }
        catch (error) {
            console.log(error);
            return 'error';
        }
    }
}
exports.default = new NewsletterController();
