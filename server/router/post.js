import express from "express";
import Auth from "../middleware/auth.js";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/post.js";

const router = express.Router();

/** GET */
router.get("/", Auth, getFeedPosts);
router.get("/:userId/posts", Auth, getUserPosts);

/** PATCH */
router.patch("/:id/like", Auth, likePost);

export default router;
