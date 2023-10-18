import mongoose from "mongoose";
import { reviewSchema } from "./reviewModel.js";

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
