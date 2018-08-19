import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

export const jsonBodyParser = bodyParser.json();
export const app = express();
mongoose.connect('mongodb://test:Test123!@ds011963.mlab.com:11963/iolearn');
