import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const itemNoteSchema = new Schema(
    {
        itemId: {
          type: String,
          required: true
        },
        noteId: {
          type: String,
          required: true
        }
    },
    {
        collection: 'items-notes'
    }
);

export const ItemNote = mongoose.model('ItemNote', itemNoteSchema);
