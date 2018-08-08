import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const itemNoteSchema = new Schema(
    {
        itemId: String,
        noteId: String
    },
    {
        collection: 'items-notes'
    }
);

export const ItemNote = mongoose.model('ItemNote', itemNoteSchema);