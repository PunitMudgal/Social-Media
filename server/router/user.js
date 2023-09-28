import express from "express";
import {
  getUser,
  getUserFriends,
  searchUsers,
  addRemoveFriends,
  updateUser,
} from "../controllers/user.js";
import Auth from "../middleware/auth.js";

const router = express.Router();

/** GET */
router.get("/search/:name", searchUsers);
router.get("/:id", getUser);
router.get("/:id/friends", Auth, getUserFriends);

/** UPDATE */
router.patch("/:id/:friendId", Auth, addRemoveFriends);
router.patch("/updateUser", Auth, updateUser);
export default router;
