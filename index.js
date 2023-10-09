import express from "express";
import mongoose from "mongoose";
import { PORT, mongodbUrl } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

app.use(express.json());

app.use('/books', booksRoute);

app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send("High thereerer!!");
})

mongoose
    .connect(mongodbUrl)
    .then(() => {
        console.log('App listening to Database');
        app.listen(PORT, () => {
            console.log(`Your app is head banging to ${PORT}`);
        })
    })
    .catch((err) => {
        console.warn(err);
    })
