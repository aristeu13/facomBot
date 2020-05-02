"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("./controllers/Http/UserController"));
const routes = express_1.Router();
routes.get('/users', UserController_1.default.index);
routes.post('/register', UserController_1.default.create);
exports.default = routes;
