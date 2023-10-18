import express from "express";
import mongoose from "mongoose";
import { PORT, mongodbUrl } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

// app.use(cors({
//     origin: 'http://localhost:8080',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }))

app.use('/books', booksRoute);

app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send("Plwease sign up first !!");
})

app.post('/signup', (req, res) => {

    const { name, email, password } = req.body;

    

    return res.status(200).send("Plwease sign up first !!");
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
