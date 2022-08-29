import express from "express";
const router = express.Router();

import tokenController from "../controllers/token";

router.post("/", tokenController.postToken);

export default router;
