import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const noteSchema = new Schema(
    {
        title: String,
        content: String,
        visible: Boolean,
    },
    {
        collection: 'notes'
    }
);

export const Note = mongoose.model('Note', noteSchema);