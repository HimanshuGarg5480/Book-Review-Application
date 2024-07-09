import { Router } from "express";
import { loginUser, resendOtp, signupUser, VerifyOtp } from "../controllers/authController.js";
const router = Router();

router.route("/login").post(loginUser);
router.route("/signup").post(signupUser);
router.route("/verify-otp").post(VerifyOtp);
router.route("/resend-otp").post(resendOtp);

export default router;