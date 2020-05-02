"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class MoneyController {
    async index() {
        try {
            const dolar = await axios_1.default.get('http://economia.awesomeapi.com.br/json/all/USD-BRL');
            return `R$ ${Number.parseFloat(dolar.data.USD.bid).toFixed(2)}`;
        }
        catch (error) {
            console.log(error);
            return 'Não Foi possível buscar o valor do dolár';
        }
    }
}
exports.default = new MoneyController();
