"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Blog = require("../models/blog.model");
const getBlogPreview = (req, res) => {
    res.send("preview");
};
exports.default = {
    getBlogPreview,
};
