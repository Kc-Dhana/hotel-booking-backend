import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,   // Stores a reference (ID) to another document
            ref: "users", // Reference to the User model // Specifies which collection it references (User model)
            required: true
        },
        title: {
            type: String,
            required: true
        },
        stars: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        description: {
            type: String,
            required: true
        },
        approved: {
            type: Boolean,
            default: false // Admin must approve for it to be visible
        }
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
);

const Feedback = mongoose.model("feedbacks", feedbackSchema);

export default Feedback;
