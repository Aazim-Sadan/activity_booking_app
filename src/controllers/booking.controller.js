import { Activity } from "../models/activity.model.js";
import { Booking } from "../models/bookings.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const bookActivity = async (req, res) => {

    const userId = req.user.id;
    const activityId = req.params.id;

    const activity = await Activity.findById(activityId);

    if (!activity) {
        throw new ApiError(404, "Activity not found")
    }

    const existingBooking = await Booking.findOne({
        user: userId,
        activity: activityId,
    });

    if (existingBooking) {
        throw new ApiError(400, "You have already booked this activity");
    }

    const booking = await Booking.create({
        bookedBy: userId,
        activity: activityId
    });

    return res.status(201).json(
        new ApiResponse(200, booking, "Activity booked Successfully")
    )
}

const getMyBookings = async (req, res) => {

    const userId = req.user.id;
    console.log("userIDddd",userId);
    

    const bookings = await Booking.find({ bookedBy: userId })
        .populate('activity');

    if (!bookings) {
        throw new ApiError(500, "Something went wrong while Activity booking")
    }

    return res.status(201).json(
        new ApiResponse(200, bookings, "All booked activites fetched successfuly")
    )

};

export {
    bookActivity,
    getMyBookings
}