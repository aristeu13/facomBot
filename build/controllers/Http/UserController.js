"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../schemas/User"));
class UserController {
    async index(req, res) {
        try {
            const users = await User_1.default.find();
            return res.json(users);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'internal error' });
        }
    }
    async create(req, res) {
        try {
            const { email, name, password } = req.body;
            if (!email)
                throw new Error('invalid email');
            const user = await User_1.default.create({ name: name, email: email, password: password });
            return res.json(user);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'internal error' });
        }
    }
}
exports.default = new UserController();
