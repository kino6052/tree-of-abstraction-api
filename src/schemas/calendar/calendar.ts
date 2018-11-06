import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const calendarSchema = new Schema(
    {
        title: {
          type: String,
          required: true
        },
        year: {
          type: Number,
          required: true
        },
        month: {
          type: Number,
          required: true
        },
        day: {
          type: Number,
          required: true
        }
    },
    {
        collection: 'calendar'
    }
);

export const Calendar = mongoose.model('Calendar', calendarSchema);
