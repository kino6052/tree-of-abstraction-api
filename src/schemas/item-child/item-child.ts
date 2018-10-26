import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const itemChildSchema = new Schema(
    {
        parentId: {
          type: String,
          required: true
        },
        childId: {
          type: String,
          required: true
        }
    },
    {
        collection: 'items-children'
    }
);

export const ItemChild = mongoose.model('ItemChild', itemChildSchema);
