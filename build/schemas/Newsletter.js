"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NewsletterSchema = new mongoose_1.Schema({
    title: String,
    img: String,
    description: String
}, {
    timestamps: true
});
exports.default = mongoose_1.model('Newsletter', NewsletterSchema);
