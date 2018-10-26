import express from 'express';
import { jsonBodyParser } from '../index';
import { ItemChild } from '../schemas/item-child/item-child';
import { itemChildGenerator } from '../utils/item-child-generator';

interface ItemChildQuery {
  itemId?: String,
  childId?: String
}

export default (app: ReturnType<typeof express>) => {
  app.get('/item-child/generator', async (req, res) => {
    console.log(req);
    let unsavedItems = await itemChildGenerator();
    res.send(unsavedItems);
  });

  // Items to Children Relationships
  app.get('/item-child', (req, res) => {
    let itemChildQuery: ItemChildQuery = req.query
    ItemChild.find(itemChildQuery)
      .then((data: Object) => { res.send(data) })
      .catch((err: Object) => { res.statusCode = 400; res.send(err); });
  });

  app.post('/item-child', jsonBodyParser, (req, res) => {
    let item = new ItemChild(req.body);
    console.log(item);
    item.save()
      .then((data: Object) => { res.send(data) })
      .catch((err: Object) => { res.statusCode = 400; res.send(err); })
  });

  app.get('/item-child/:id', (req, res) => {
      ItemChild.find({ "_id": req.params.id })
        .then((data: Object) => { res.send(data) })
        .catch((err: Object) => { res.statusCode = 400; res.send(err); });
  });

  app.get('/item-child/:parent_id/:child_id', (req, res) => {
      ItemChild.find({ "_id": req.params.id })
        .then((data: Object) => { res.send(data) })
        .catch((err: Object) => { res.statusCode = 400; res.send(err); });
  });

  app.delete('/item-child/:id', (req, res) => {
    ItemChild.deleteOne({ "_id": req.params.id })
      .then((data: Object) => { res.send(data) })
      .catch((err: Object) => { res.statusCode = 400; res.send(err); });
  });
}
