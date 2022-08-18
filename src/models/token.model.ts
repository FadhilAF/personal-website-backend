import { Schema, model } from "mongoose";

interface IToken {
  name: string;
  role: "comment" | "blog" | "admin";
  open: boolean;
}

const tokenSchema = new Schema<IToken>(
  {
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
  }
)

const Token = model<IToken>("Token", tokenSchema);

export default Token;
