import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let mongodbUrl: string = process.env.DEV_DB_CONNECT!;

async function connectToDatabase() {
  if (process.env.DEV_DB_CONNECT) {
    mongodbUrl = `${process.env.DEV_DB_CONNECT}`;
  }
  mongoose.connect(
    mongodbUrl,
    (err: unknown) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Database connected");
      }
    }
  );
};

export default {
  connectToDatabase
};
