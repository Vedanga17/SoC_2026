import mongoose from "mongoose";

// Schema to handle student "following" or "subscribing" to other students. subscription schema.
const subscriptionSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    senior: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }
},
    {
        timestamps: true
    }
)

export const Subscription = mongoose.model("Subscription", subscriptionSchema);