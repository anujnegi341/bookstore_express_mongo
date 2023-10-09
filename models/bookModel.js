import mongoose from "mongoose";

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
        review: {
            type: String,
            requre: false
        }
    },
    {
        timestamps: true
    }
);

export const Book = mongoose.model('book', bookSchema);

