import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import itemEndpoints from './endpoints/item';
import noteEndpoints from './endpoints/note';
import itemNoteEndpoints from './endpoints/item-note';
import itemChildEndpoints from './endpoints/item-child';

const MLAB = 'mongodb://test:Test123!@ds011963.mlab.com:11963/iolearn';

export const jsonBodyParser = bodyParser.json();
export const app = express();

itemEndpoints(app);
noteEndpoints(app);
itemNoteEndpoints(app);
itemChildEndpoints(app);

mongoose.connect(MLAB);
app.listen(process.env.PORT || '8080', () => console.log(`Listening... ${process.env.PORT}`));
