import mongoose from "mongoose";

export const reviewSchema = mongoose.Schema(
    {   
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        reviewText: {
            type: String,
            required: true
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }
)

export const Review = mongoose.model('Review', reviewSchema);
