import { Router } from "express";
import { activeCheck, getPosts, createPost, likePost, addComment, deletePost } from "../controllers/posts.controller.js";
import { upload } from "../upload.middleware.js";

const router = Router();

router.get("/posts", getPosts);
router.post("/posts", upload.single('image'), createPost);
router.put("/posts/:id/like", likePost);
router.post("/posts/:id/comment", addComment);
router.delete("/posts/:id", deletePost);
router.route("/").get(activeCheck);

export default router;