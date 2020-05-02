"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Newsletter_1 = __importDefault(require("../../schemas/Newsletter"));
class NewsletterController {
    async index(req, res) {
        try {
            const newsletter = await Newsletter_1.default.find();
            return res.json(newsletter);
        }
        catch (error) {
            console.log(error);
            return res.json({ error: 'internal error' });
        }
    }
}
exports.default = new NewsletterController();
