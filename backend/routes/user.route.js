import { Router } from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { completeProfile } from "../controllers/userController.js";
const router = Router();

router.route("/completeProfile").post(protectRoute,completeProfile);

export default router;