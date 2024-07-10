import { Router } from "express";
import { addBook, getAllBooks } from "../controllers/bookController.js";
import protectRoute from "../middlewares/protectRoute.js";
const router = Router();

router.route("/addNewBook").post(protectRoute,addBook);

router.route("/getAllBooks").get(protectRoute,getAllBooks);

export default router;