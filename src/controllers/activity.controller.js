import { Activity } from "../models/activity.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createActivity = async (req, res) => {

    const { title, description, location, dateTime } = req.body;

    if (!title || !description || !location || !dateTime) {
        throw new ApiError(400, "All fields are required")
    }

    const activity = await Activity.create({
        title,
        description,
        location,
        dateTime
    });

    if (!activity) {
        throw new ApiError(500, "Something went wrong while creating activity")
    }

    return res.status(201).json(
        new ApiResponse(200, activity, "Activity created Successfully")
    )

}

const listActivity = async (req, res) => {

    const activities = await Activity.find();

    if (!activities) {
        throw new ApiError(404, "No activities found")
    }
    return res.status(201).json(
        new ApiResponse(200, activities, "All activities fetched successfully")
    )
}

export {
    createActivity,
    listActivity
}
