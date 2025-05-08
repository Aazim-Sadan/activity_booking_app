import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    activity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity', required: true
    },
    bookedAt: {
        type: Date,
        default: Date.now
    },
});

export const Booking = mongoose.model('Booking', bookingSchema);