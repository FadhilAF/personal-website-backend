import { RequestHandler } from "express";
const Blog = require("../models/blog.model");

const getBlogPreview: RequestHandler = (req, res) => {
  res.send("preview");
} 

export default {
  getBlogPreview,
}
