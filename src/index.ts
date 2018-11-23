import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import itemEndpoints from './endpoints/item';
import noteEndpoints from './endpoints/note';
import calendarEndpoints from './endpoints/calendar';
import itemNoteEndpoints from './endpoints/item-note';
import itemChildEndpoints from './endpoints/item-child';

export const MLAB = 'mongodb://test:Test123!@ds011963.mlab.com:11963/iolearn';
export const BASE_URL = 'https://personal-dashboard-umbrella-kino6052.c9users.io';
export const jsonBodyParser = bodyParser.json();
export const app = express();

itemEndpoints(app);
noteEndpoints(app);
itemNoteEndpoints(app);
itemChildEndpoints(app);
calendarEndpoints(app);

mongoose.connect(MLAB);
app.listen('4001', () => console.log(`Listening... ${process.env.PORT}`));
