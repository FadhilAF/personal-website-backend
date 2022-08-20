"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    content: [{
            component: String,
            words: [{
                    type: String,
                }]
        }],
    published: {
        type: Boolean,
        required: true,
    },
    authorId: {
        // https://stackoverflow.com/questions/18001478/referencing-another-schema-in-mongoose
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    //timestamps utk auto generate createdAt dan updatedAt
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Blog", blogSchema);
