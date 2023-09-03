import express from "express";
import {
  getUser,
  getUserFriends,
  //   addRemoveFriends,
} from "../controllers/user.js";
import Auth from "../middleware/auth.js";

const router = express.Router();

/** GET */
router.get("/:id", Auth, getUser);
router.get("/:id/friends", Auth, getUserFriends);

/** UPDATE */
// router.patch("/:id/:friendId", Auth, addRemoveFriends);

export default router;
