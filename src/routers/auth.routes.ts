import express from "express";
const router = express.Router();

import authController from "../controllers/auth.controller";

router.get("/profile/:id", authController.getProfile);
router.get("/login", authController.getAuthenticatedData);
router.post("/signup", authController.signup);
router.post("/login", authController.login)

export default router;
