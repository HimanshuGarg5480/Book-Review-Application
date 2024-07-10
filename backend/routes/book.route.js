import { Router } from "express";
import { addBook } from "../controllers/bookController.js";
import protectRoute from "../middlewares/protectRoute.js";
const router = Router();

router.route("/addNewBook").post(protectRoute,addBook);

export default router;