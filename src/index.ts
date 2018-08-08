import axios from 'axios';
import express from 'express';
import mongoose from 'mongoose';
import { dfs } from './utils/tree-of-abstraction-refactor';
const app = express();
const Schema = mongoose.Schema;

mongoose.connect('mongodb://test:Test123!@ds011963.mlab.com:11963/iolearn');



// Application level CRUD
app.get('/', () => {});
app.post('/', () => {});

// Items CRUD
app.post('/item', (req, res) => {});
app.delete('/item/:id', () => {});
app.get('/item/:id', () => {});

// Notes CRUD
app.post('/note', (req, res) => {});
app.delete('/note/:id', (req, res) => {
    res.send("DELETE");
});
app.get('/note/:id', () => {});

// Items to Notes Relationships
app.post('/item-note', () => {});
app.put('/item-note', () => {});
app.get('/item-note', () => {});

app.listen('4000', () => console.log("Listening..."));