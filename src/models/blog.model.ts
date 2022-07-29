import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
});

export default mongoose.model("Blog", blogSchema);
