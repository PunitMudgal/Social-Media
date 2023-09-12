import express from "express";
import {
  getUser,
  getUserFriends,
  getAllUsers,
  addRemoveFriends,
  updateUser,
} from "../controllers/user.js";
import Auth from "../middleware/auth.js";

const router = express.Router();

/** GET */
router.get("/:id", getUser);
router.get("/:id/friends", Auth, getUserFriends);
router.get("/getUsers", getAllUsers);

/** UPDATE */
router.patch("/:id/:friendId", Auth, addRemoveFriends);
router.patch("/updateUser", Auth, updateUser);
export default router;
