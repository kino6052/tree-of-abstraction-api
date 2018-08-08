import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const itemSchema = new Schema(
    {
        title: String,
        description: String,
        visible: Boolean,
        collapsed: Boolean,
        label: String,
        children: Array,
    },
    {
        collection: 'items'
    }
);

export const Item = mongoose.model('Item', itemSchema);