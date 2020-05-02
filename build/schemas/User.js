"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: String,
    name: String,
    password: String
}, {
    timestamps: false
});
exports.default = mongoose_1.model('User', UserSchema);
