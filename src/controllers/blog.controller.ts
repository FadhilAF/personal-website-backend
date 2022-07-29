const Blog = require("../models/blog.model");
import { RequestHandler } from "express";

const getBlogPreview: RequestHandler = (req, res) => {
  res.send("preview");
} 

export default {
  getBlogPreview,
}
