import { Router } from "express";
import { loginUser, signupUser, VerifyOtp } from "../controllers/authController.js";
const router = Router();

router.route("/login").post(loginUser);
router.route("/signup").post(signupUser);
router.route("/verify-otp").post(VerifyOtp);

export default router;