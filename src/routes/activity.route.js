import { Router } from "express";
import { createActivity, listActivity } from "../controllers/activity.controller.js";

const router = Router()

router.route("/").post(createActivity);
router.route("/").get(listActivity);



export default router