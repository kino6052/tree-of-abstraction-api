import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const itemSchema = new Schema(
    {
        title: {
          type: String,
          required: true
        },
        description: {
          type: String,
          default: ''
        },
        visible: {
          type: Boolean,
          default: true
        },
        collapsed: {
          type: Boolean,
          default: false
        },
        label: {
          type: String,
          default: ''
        },
        children: {
          type: Array,
          default: []
        }
    },
    {
        collection: 'items'
    }
);

export const Item = mongoose.model('Item', itemSchema);
