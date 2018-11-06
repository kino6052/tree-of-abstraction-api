import express from 'express';
import { jsonBodyParser } from '../index';
import { Calendar } from '../schemas/calendar/calendar';

export default (app: ReturnType<typeof express>) => {
  // Calendar CRUD
  app.get('/calendar/:year/:month/:day', (req, res) => {
      let {
        params: {
          year = 2018,
          month = 1,
          day = 1
        } = {}
      } = req;
      Calendar.find({ year, month, day })
          .then((data:Object) => { res.send(data) })
          .catch((err:Object) => { res.statusCode = 400; res.send(err); });
  });
  
  app.delete('/calendar/:id', (req, res) => {
      let {
        params: {
          id = null
        } = {}
      } = req;
      Calendar.deleteOne({ "_id": id })
          .then((data) => { res.send(data) })
          .catch((err) => { res.statusCode = 400; res.send(err); });
  });

  app.post('/calendar', jsonBodyParser, (req, res) => {
    let calendar = new Calendar(req.body);
    calendar.save()
      .then((data => { res.send(data) }))
      .catch(err => { res.statusCode = 400; res.send(err); })
  });

  app.get('/calendar', (req, res) => {
      console.log(req.body);
      Calendar.find()
          .then((data) => { res.send(data) })
          .catch((err) => { res.statusCode = 400; res.send(err); });
  });
}
