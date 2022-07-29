import express from "express";
const router = express.Router();

import blogController from "../controllers/blog.controller";

router.get("/:id", blogController.getBlogPreview);

// router.get("/full/:id", blogController.getFullBlog);
// router.post("/full/:id", blogController.postFullBlog);
// router.patch("/full/:id", blogController.updateFullBlog);
// router.delete("/full/:id", blogController.deleteFullBlog);

export default router;
