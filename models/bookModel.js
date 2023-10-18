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

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        author: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        review_list: [reviewSchema],
    },
    {
        timestamps: true
    }
);

export const Book = mongoose.model('Book', bookSchema);
