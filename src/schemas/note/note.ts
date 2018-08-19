import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const noteSchema = new Schema(
    {
        title: {
          type: String,
          required: true
        },
        content: {
          type: String,
          default: ''
        },
        visible: {
          type: Boolean,
          default: true
        },
    },
    {
        collection: 'notes'
    }
);

export const Note = mongoose.model('Note', noteSchema);
