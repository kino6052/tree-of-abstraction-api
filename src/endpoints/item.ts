import express from 'express';
import { jsonBodyParser } from '../index';
import { Item } from '../schemas/item/item';

export default (app: ReturnType<typeof express>) => {
  // Items CRUD
  app.get('/item/:id', (req, res) => {
      Item.find({ "_id": req.params.id })
          .then((data) => { res.send(data) })
          .catch((err) => { res.statusCode = 400; res.send(err); });
  });

  app.delete('/item/:id', (req, res) => {
      Item.deleteOne({ "_id": req.params.id })
          .then((data) => { res.send(data) })
          .catch((err) => { res.statusCode = 400; res.send(err); });
  });

  app.put('/item/:id', jsonBodyParser, (req, res) => {
    let item = {
      title: req.body.title,
      ...req.body
    }
    Item.updateOne({ "_id": req.params.id }, item)
        .then((data) => { res.send(data) })
        .catch((err) => { res.statusCode = 400; res.send(err); });
  });

  app.put('/item/:id/:child_id', jsonBodyParser, (req, res) => {
    Item.updateOne({ "_id": req.params.id }, { $push: { children: req.params.child_id } })
        .then((data) => { res.send(data) })
        .catch((err) => { res.statusCode = 400; res.send(err); });
  });

  app.delete('/item/:id/:child_id', jsonBodyParser, (req, res) => {
    Item.updateOne({ "_id": req.params.id }, { $pull: { children: req.params.child_id } })
        .then((data) => { res.send(data) })
        .catch((err) => { res.statusCode = 400; res.send(err); });
  });

  interface ItemQuery {
      title?: {
          $regex?: String
      }
  }

  app.get('/item', (req, res) => {
      let itemQuery: ItemQuery = req.query;
      let query = <ItemQuery>{};
      if (itemQuery.title) {
          query.title = { $regex: `.*${itemQuery.title}.*` }
      }
      Item.find(query)
          .then((data) => { res.send(data) })
          .catch((err) => { res.statusCode = 400; res.send(err); });
  });

  app.post('/item', jsonBodyParser, (req, res) => {
    let {
      body = {
        changedItemNodes,
        removedItemNodes
      },
      query: {
        type = 'none'
      } = {}
    } = req;
    if (type === 'batch') {
      if (changedItemNodes.length > 0) {
        let promises = [];
        for (let item of changedItemNodes) {
            promises.push(
              Item.update({ _id: item._id }, item, { upsert : true })
            )
        }
        Promise.all(promises)
        .then(
          (data) => {
            res.send(data);    
          }
        )
        .catch(
          (err) => {
            res.send(err);    
          }
        );
      }
      if (removedItemNodes.length > 0) {
        let promises = [];
        for (let item of removedItemNodes) {
            promises.push(
              Item.deleteOne({ _id: item._id })
            )
        }
        Promise.all(promises)
        .then(
          (data) => {
            res.send(data);    
          }
        )
        .catch(
          (err) => {
            res.send(err);    
          }
        );
      }
    } else {
      let item = new Item(body);
      item.save()
        .then((data => { res.send(data) }))
        .catch(err => { res.statusCode = 400; res.send(err); })
    }
  });
}
