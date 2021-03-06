import express from 'express';
import { jsonBodyParser } from '../index';
import { ItemNote } from '../schemas/item-note/item-note';

interface ItemNoteQuery {
  itemId?: String,
  noteId?: String
}

export default (app: ReturnType<typeof express>) => {
  // Items to Notes Relationships
  app.get('/item-note', (req, res) => {
    let itemNoteQuery: ItemNoteQuery = req.query
    ItemNote.find(itemNoteQuery)
      .then((data) => { res.send(data) })
      .catch((err) => { res.statusCode = 400; res.send(err); });
  });

  app.post('/item-note', jsonBodyParser, (req, res) => {
    let item = new ItemNote(req.body);
    item.save()
      .then((data => { res.send(data) }))
      .catch(err => { res.statusCode = 400; res.send(err); })
  });

  app.get('/item-note/:id', (req, res) => {
      ItemNote.find({ "_id": req.params.id })
        .then((data) => { res.send(data) })
        .catch((err) => { res.statusCode = 400; res.send(err); });
  });

  app.delete('/item-note/:id', (req, res) => {
    ItemNote.deleteOne({ "_id": req.params.id })
      .then((data) => { res.send(data) })
      .catch((err) => { res.statusCode = 400; res.send(err); });
  });
}
