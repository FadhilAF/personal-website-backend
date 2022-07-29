import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import db from "./database/database";

import blogRoutes from "./routers/blog.routes";

dotenv.config()

const app = express();

try {
  app.use(cors());

  app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

  app.use("/assets", express.static("./assets"));

  app.use("/api/blog", blogRoutes);

} catch (error: unknown) {
  console.log(error);
}

const PORT = process.env.PORT || "5000";

db.connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on ${PORT}`)
    })
  })
  .catch((err: unknown) => {
    console.log(err);
  })
