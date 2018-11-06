import express from 'express';
import { jsonBodyParser } from '../index';
import { Calendar } from '../schemas/calendar/calendar';

export default (app: ReturnType<typeof express>) => {
  // Calendar CRUD
  app.get('/calendar/:year/:month/:day', (req, res) => {
      let {
        params: {
          year,
          month,
          day
        } = {}
      } = req;
      let date = new Date();
      date.setYear(year);
      date.setMonth(month);
      date.setDate(day);
      Item.find({ "date": date })
          .then((data) => { res.send(data) })
          .catch((err) => { res.statusCode = 400; res.send(err); });
  });
  
  app.delete('/calendar/:id', (req, res) => {
      let {
        params: {
          id
        } = {}
      } = req;
      Item.deleteOne({ "_id": id })
          .then((data) => { res.send(data) })
          .catch((err) => { res.statusCode = 400; res.send(err); });
  });

  app.post('/item', jsonBodyParser, (req, res) => {
    let calendar = new Calendar(req.body);
    item.save()
      .then((data => { res.send(data) }))
      .catch(err => { res.statusCode = 400; res.send(err); })
  });

  app.get('/calendar', (req, res) => {
      let {
        params: {
          year,
          month,
          day
        } = {}
      } = req;
      let date = new Date();
      Item.find()
          .then((data) => { res.send(data) })
          .catch((err) => { res.statusCode = 400; res.send(err); });
  });
}
