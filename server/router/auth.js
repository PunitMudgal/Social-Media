import { Router } from "express";
const router = Router();
import * as controller from "../controllers/auth.js";

// GET
router.route("/getAll").get(controller.getAllUsers);

/** POST */
router.route("/register").post(controller.register);
router.route("/login").post(controller.login);

/** PUT */
// router.route("/updateUser").put(controller.resetPassword);

export default router;
