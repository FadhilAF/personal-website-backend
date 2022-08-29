import express from "express";
import session from "express-session";
import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";

import { ObjectId } from "bson";
import db from "./database/database";
import sessionStore from "./database/session";

import sessionReadMiddleware from "./middlewares/sessionRead";

import authRoutes from "./routes/auth";
import blogRoutes from "./routes/blog";
import tokenRoutes from "./routes/token";

import errorHandler from "./middlewares/errorHandler";

//nge buat type data isi sessionnyo
declare module "express-session" {
  interface SessionData {
    userId: ObjectId;
  }
}

const app = express();

// https://stackoverflow.com/a/23426060/13673444
app.set("trust proxy", 1);

try {
  // https://stackoverflow.com/a/45890875/13673444
  app.use(
    cors({
      credentials: true,
      //biar request dari mano bae diterimo
      // https://stackoverflow.com/a/71071725/13673444
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
      // https://stackoverflow.com/a/14473557/13673444
      proxy: true,
      cookie: {
        // ad di stak overflow ktny harus specify path kalo nk cookie ny muncul di dev mode.. (pdhl nilai defaultny ini)
        domain: "www.fadhilaf.my.id",

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
