import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const calendarSchema = new Schema(
    {
        title: {
          type: String,
          required: true
        },
        date: {
          type: Date,
          required: true
        }
    },
    {
        collection: 'calendar'
    }
);

export const Calendar = mongoose.model('Calendar', calendarSchema);
