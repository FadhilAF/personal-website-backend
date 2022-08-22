import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { ObjectId } from "bson";
import db from "./database/database";
import sessionStore from "./database/session";

import sessionReadMiddleware from "./middlewares/sessionRead";

import authRoutes from "./routers/auth.routes";
import blogRoutes from "./routers/blog.routes";
import tokenRoutes from "./routers/token.routes";

import errorHandler from "./middlewares/errorHandler";

//nge buat type data isi sessionnyo
declare module "express-session" {
  interface SessionData {
    userId: ObjectId;
  }
}

dotenv.config({ path: __dirname + "/.env" });

const app = express();

// https://stackoverflow.com/a/23426060/13673444
app.set("trust proxy", 1);

try {
  // https://stackoverflow.com/a/45890875/13673444
  app.use(
    cors({
      credentials: true,
      //biar request dari mano bae diterimo
      // origin: true,

      //biar terimo request dari link ini bae
      origin:
        process.env.FRONTEND_APP_URL || process.env.FRONTEND_APP_URL_2 || process.env.FRONTEND_APP_URL_3
          ? [process.env.FRONTEND_APP_URL, process.env.FRONTEND_APP_URL_2, process.env.FRONTEND_APP_URL_3].filter((v)=>v) as string[]
          : "http://localhost:3000",
    })
  );

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

  app.use(
    session({
      secret: process.env.DEV_SESSION_SECRET as string,
      proxy: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        // https://stackoverflow.com/a/66553425/13673444
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // must be 'none' to enable cross-site delivery
        secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
      },
      store: sessionStore,
      resave: true,
      saveUninitialized: false,
    })
  );

  app.use("/assets", express.static("./assets"));

  app.use(sessionReadMiddleware);
  const sessionCheckMiddleware: express.RequestHandler = (req, res, next) => {
    console.log(req.user);
    next();
  };
  app.use(sessionCheckMiddleware);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/auth", authRoutes);
  app.use("/blog", blogRoutes);
  app.use("/token", tokenRoutes);

  app.use(errorHandler);
} catch (error: unknown) {
  console.log(error);
}

const PORT: string = (process.env.PORT as string) || "5000";

db.connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on ${PORT}`);
    });
  })
  .catch((err: unknown) => {
    console.log(err);
  });
