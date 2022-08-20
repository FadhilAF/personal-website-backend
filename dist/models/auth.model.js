"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    tokenId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Token"
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    picture: {
        type: String,
        required: false,
    },
}, { timestamps: true });
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
