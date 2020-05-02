"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const discord_js_1 = __importDefault(require("discord.js"));
require("./config/env.config");
const routes_1 = __importDefault(require("./routes"));
const bot_1 = __importDefault(require("./bot"));
class App {
    constructor() {
        this.express = express_1.default();
        this.bot = new bot_1.default(new discord_js_1.default.Client());
        this.authDiscord();
        this.middlewares();
        this.database();
        this.routes();
    }
    middlewares() {
        this.express.use(express_1.default.json());
        this.express.use(cors_1.default());
    }
    database() {
        mongoose_1.default.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => {
            console.log('mongodb is connected');
        })
            .catch(error => {
            console.log(error);
        });
    }
    routes() {
        this.express.use(routes_1.default);
    }
    authDiscord() {
        this.bot.client.login(process.env.AUTH_DISCORD);
    }
}
exports.default = new App().express;
