"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
router.get("/profile/:id", auth_controller_1.default.getProfile);
router.get("/login", auth_controller_1.default.getAuthenticatedData);
router.post("/signup", auth_controller_1.default.signup);
router.post("/login", auth_controller_1.default.login);
exports.default = router;
