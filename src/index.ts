import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import itemEndpoints from './endpoints/item';
import noteEndpoints from './endpoints/note';
import itemNoteEndpoints from './endpoints/item-note';

export const jsonBodyParser = bodyParser.json();
export const app = express();

itemEndpoints(app);
noteEndpoints(app);
itemNoteEndpoints(app);

mongoose.connect('mongodb://test:Test123!@ds011963.mlab.com:11963/iolearn');
app.listen(process.env.PORT || '8080', () => console.log(`Listening... ${process.env.PORT}`));
