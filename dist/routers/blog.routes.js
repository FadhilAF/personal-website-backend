"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const blog_controller_1 = __importDefault(require("../controllers/blog.controller"));
router.get("/:id", blog_controller_1.default.getBlogPreview);
// router.get("/full/:id", blogController.getFullBlog);
// router.post("/full/:id", blogController.postFullBlog);
// router.patch("/full/:id", blogController.updateFullBlog);
// router.delete("/full/:id", blogController.deleteFullBlog);
exports.default = router;
