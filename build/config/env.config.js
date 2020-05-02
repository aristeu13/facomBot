"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = require("path");
console.log(__dirname);
dotenv_1.config({
    path: path_1.resolve(__dirname, '../../.env')
});
