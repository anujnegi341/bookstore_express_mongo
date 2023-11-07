import express from "express";
import mongoose from "mongoose";
import { PORT, jwtSecret, mongodbUrl } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
import { User } from "./models/userModel.js";
import jwt from "jsonwebtoken";
import cors from 'cors';

const app = express();

const myLogger = (req, res, next) => {
    console.log(Date.now());
    next();
}

const authentication = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        //Authorization: 'Bearer TOKEN'
        if (!token) {
            res.status(400).json({ success: false, message: "Error! Token was not provided." });
        }
        //Decoding the token
        const decodedToken = jwt.verify(token, jwtSecret);

        req.user = {
                userId: decodedToken.userId,
                email: decodedToken.email
            }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ message: error.message });
    }
}

app.use(express.json());

app.use(cors());

app.use('/books', myLogger)

// app.use(cors({
//     origin: 'http://localhost:8080',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }))

app.get('/', (req, res) => {
    console.log('Body : >> ', req.body);
    return res.status(200).send("Plwease sign up first !!");
})

app.post('/signup', async (req, res) => {
    try {
        const { name, email } = req.body;

        // assusming validation will be done by Mongo itself using model constraints
        const newUser = await User.create(req.body);

        const token = jwt.sign({ userId: newUser.id, email: newUser.email },
            jwtSecret,
            { expiresIn: "1h" }
        );

        return res.status(201).json({
            success: true,
            data: {
                name,
                email,
                token
            },
        });
    } catch (error) {
        console.warn(error);
        return res.status(500).send({ message: error.message });
    }
});

app.post("/login", async (req, res) => {
    try {

        let { email, password } = req.body;

        let existingUser;
        
        existingUser = await User.findOne({ email: email });
        if (!existingUser || existingUser.password != password) {
            throw new Error("Wrong details please check at once");
        }

        let token;
        //Creating jwt token
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email },
            jwtSecret,
            { expiresIn: "1h" }
        );

        res.status(200)
            .json({
                success: true,
                data: {
                    userId: existingUser.id,
                    email: existingUser.email,
                    token: token,
                },
            });
    } catch (error) {
        console.warn(error);
        return res.status(500).send({ message: error.message });
    }
});

app.use(authentication);

app.get('/accessResource', (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        //Authorization: 'Bearer TOKEN'
        if (!token) {
            res.status(400).json({ success: false, message: "Error! Token was not provided." });
        }
        //Decoding the token
        const decodedToken = jwt.verify(token, jwtSecret);

        res.status(200).json({
            success: true,
            data: {
                userId: decodedToken.userId,
                email: decodedToken.email
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

app.use('/books', booksRoute);


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
