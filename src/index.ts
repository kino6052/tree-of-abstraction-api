import express from 'express';
import mongoose from 'mongoose';
import { Item } from "./schemas/item/item";
import { Note } from "./schemas/note/note";
import { ItemNote } from "./schemas/item-note/item-note";

const app = express();

mongoose.connect('mongodb://test:Test123!@ds011963.mlab.com:11963/iolearn');

// Application level CRUD
// app.get('/', () => {});
// app.post('/', () => {});

// Items CRUD
app.get('/item/:id', (req, res) => {
    Item.find({ "_id": req.params.id })
        .then((data) => { res.send(data) })
        .catch((err) => { res.statusCode = 400; res.send(err); });
});

// Notes CRUD
app.get('/note/:id', (req, res) => {
    Note.find({ "_id": req.params.id })
        .then((data) => { res.send(data) })
        .catch((err) => { res.statusCode = 400; res.send(err); });
});

// Items to Notes Relationships
app.get('/item-note/:id', (req, res) => {
    ItemNote.find({ "_id": req.params.id })
        .then((data) => { res.send(data) })
        .catch((err) => { res.statusCode = 400; res.send(err); });
});

app.listen('4000', () => console.log("Listening..."));