import express from "express";
import {
  addComment,
  addReply,
  getComments,
  deleteComment,
} from "../controllers/comment.js";
import Auth from "../middleware/auth.js";
const router = express.Router();

/** /comment */
router.post("/", Auth, addComment);
router.post("/reply/:commentId", Auth, addReply);
router.get("/:postId", getComments);
router.delete("/:id", Auth, deleteComment);

export default router;
