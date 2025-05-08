import mongoose, { Schema } from "mongoose";

const activitySchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        dateTime: {
            type: Date,
            required: true
        },
    },
    {
        timestamps: true
    });

export const Activity = mongoose.model('Activity', activitySchema);