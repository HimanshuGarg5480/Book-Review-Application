import { Router } from "express";
import { addBook, addBookReview, getAllBooks, getBookReviews } from "../controllers/bookController.js";
import protectRoute from "../middlewares/protectRoute.js";
const router = Router();

router.route("/addNewBook").post(protectRoute,addBook);

router.route("/getAllBooks").get(protectRoute,getAllBooks);

router.route("/:id/reviews").get(protectRoute,getBookReviews);

router.route('/:id/reviews').post(protectRoute, addBookReview);
export default router;