import { Router } from "express";
import { getAllUser, loginUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/protected.js";

const router = Router()

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// fetch user with protected

router.route("/all-users").get(verifyJWT, getAllUser)

export default router