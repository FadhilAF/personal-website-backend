import { Types, Schema, model } from "mongoose";

interface IUser {
  username: string;
  email: string;
  tokenId: Types.ObjectId; 
  hashedPassword: string;
  description?: string;
  picture?: string;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    tokenId: {
      type: Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;
