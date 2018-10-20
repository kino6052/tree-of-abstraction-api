import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const itemChildSchema = new Schema(
    {
        itemId: {
          type: String,
          required: true
        },
        childId: {
          type: String,
          unique: true,
          required: true
        }
    },
    {
        collection: 'items-children'
    }
);

export const ItemChild = mongoose.model('ItemChild', itemChildSchema);
