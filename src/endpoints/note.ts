import express from 'express';
import { jsonBodyParser } from '../index';
import { Note } from '../schemas/note/note';

export default (app: ReturnType<typeof express>) => {
  // Notes CRUD
  app.get('/note/:id', (req, res) => {
    Note.find({ "_id": req.params.id })
      .then((data) => { res.send(data) })
      .catch((err) => { res.statusCode = 400; res.send(err); });
  });

  app.delete('/note/:id', (req, res) => {
    Note.deleteOne({ "_id": req.params.id })
      .then((data) => { res.send(data) })
      .catch((err) => { res.statusCode = 400; res.send(err); });
  });

  app.put('/note/:id', jsonBodyParser, (req, res) => {
    let note = {
      title: req.body.title,
      ...req.body
    }
    Note.updateOne({ "_id": req.params.id }, note)
      .then((data) => { res.send(data) })
      .catch((err) => { res.statusCode = 400; res.send(err); });
  });

  interface NoteQuery {
      title?: {
        $regex?: String
      },
      content?: {
        $regex?: String
      }
  }

  app.get('/note', (req, res) => {
      let noteQuery: NoteQuery = req.query;
      let query = <NoteQuery>{};
      if (noteQuery.title) {
          query.title = { $regex: `.*${noteQuery.title}.*` }
      }
      if (noteQuery.content) {
        query.content = { $regex: `.*${noteQuery.content}.*` }
      }
      Note.find(query)
          .then((data) => { res.send(data) })
          .catch((err) => { res.statusCode = 400; res.send(err); });
  });

  app.post('/note', jsonBodyParser, (req, res) => {
    let note = new Note(req.body);
    note.save()
      .then((data => { res.send(data) }))
      .catch(err => { res.statusCode = 400; res.send(err); })
  });
}
