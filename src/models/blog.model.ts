import { Types, Schema, model } from "mongoose";

interface IBlog {
  title: string;
  description: string;
  category: string;
  cover: string;
  content: Record<string, string | string[]>;
  published: boolean;
  authorId: Types.ObjectId;
}

const blogSchema = new Schema<IBlog>({
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
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
//timestamps utk auto generate createdAt dan updatedAt
}, { timestamps: true });

export default model<IBlog>("Blog", blogSchema);
