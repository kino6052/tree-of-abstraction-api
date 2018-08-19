import { app, jsonBodyParser } from '..';
import { Item } from '../schemas/item/item';

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
  let item = new Item(req.body);
  item.save()
    .then((data => { res.send(data) }))
    .catch(err => { res.statusCode = 400; res.send(err); })
});
