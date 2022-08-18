import { ObjectId } from "bson";

//kito harus tambahin config di tsconfig.json jugo, di bagian rootDirs
// https://stackoverflow.com/a/58788706/13673444
declare global { //declare global biar typenyo apply ke tiap file
  declare namespace Express {
      interface Request {
        user?: {
          userId: string;
          username: string;
          email: string;
          tokenId: string;
          token: string;
          role: "comment" | "blog" | "admin";
        };
      }
  }
}

