import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.price) {
            return res.status(400)
                .send({
                    message : 'Send all required data that is: Title, Author and Price'
                });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            price: req.body.price
        }

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error.message});
    }
})

router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            length: books.length,
            data: books
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error.message});
    }
})

router.get('/:id', async (req, res) => {
    try {

        const { id } = req.params
        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error.message});
    }
})

router.put('/:id', async (req, res) => {
    try {

        if(!req.body.title || !req.body.author || !req.body.price) {
            return res.status(400)
                .send({
                    message : 'Send all required data that is: Title, Author and Price'
                });
        }

        const { id } = req.params
        const book = await Book.findByIdAndUpdate(id, req.body);

        if(!book) {
            return res.status(404).send('Id not found');
        } else {
            return res.status(200).send('Book updated successfully');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error.message});
    }
})

router.delete('/:id', async (req, res) => {
    try {

        const { id } = req.params
        const book = await Book.findByIdAndDelete(id);

        if(!book) {
            return res.status(404).send('Id not found')
        } 

        return res.status(200).send('Book deleted successfully');
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error.message});
    }
})

export default router