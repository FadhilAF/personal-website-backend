"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tokenSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    open: {
        type: Boolean,
        required: true,
    }
});
const Token = (0, mongoose_1.model)("Token", tokenSchema);
exports.default = Token;
