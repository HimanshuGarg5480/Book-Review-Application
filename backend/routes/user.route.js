import { Router } from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { completeProfile, getProfile } from "../controllers/userController.js";
const router = Router();

router.route("/completeProfile").post(protectRoute,completeProfile);
router.route("/getProfile").get(protectRoute,getProfile);

export default router;