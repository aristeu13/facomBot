"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MoneyController_1 = __importDefault(require("./controllers/Discord.io/MoneyController"));
const NewsletterController_1 = __importDefault(require("./controllers/Discord.io/NewsletterController"));
class Bot {
    constructor(client) {
        this.client = client;
        this.message = '';
        this.ufuNews = undefined;
        this.welcome();
        this.selectMethod();
        this.repeatMethod();
    }
    welcome() {
        this.client.once('ready', () => {
            console.log(`Logged in as ${this.client.user ? this.client.user.tag : ''}`);
            this.client.channels.fetch('703415879848820748')
                .then(channel => {
                this.ufuNews = channel.type === 'text' ? channel : undefined;
                console.log(`Connect with ${this.ufuNews ? this.ufuNews.name : 'error'}`);
            })
                .catch(err => {
                console.log(err);
            });
        });
    }
    selectMethod() {
        this.client.on('message', async (msg) => {
            this.message = msg.content.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            const answer = await this.switchController();
            if (answer)
                msg.reply(answer);
        });
    }
    // add new commands in switch
    async switchController() {
        switch (this.message) {
            case 'dolar?': {
                const dolar = await MoneyController_1.default.index();
                return dolar || '';
            }
            case 'provas?': {
                return 'Em desenvolvimento';
            }
        }
    }
    repeatMethod() {
        setInterval(async () => {
            if (this.ufuNews) {
                const status = await NewsletterController_1.default.update(this.ufuNews);
                console.log(status, new Date());
            }
        }, 6000);
    }
}
exports.default = Bot;
