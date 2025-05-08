import { Router } from "express";
import { verifyJWT } from "../middlewares/protected.js";
import { bookActivity, getMyBookings } from "../controllers/booking.controller.js";

const router = Router()

router.route("/:id").get(verifyJWT, bookActivity);
router.route("/").get(verifyJWT, getMyBookings);



export default router