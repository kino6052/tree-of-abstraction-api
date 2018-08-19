import { app } from '..';
import { ItemNote } from '../schemas/item-note/item-note';

interface ItemNoteQuery {
  itemId?: String,
  noteId?: String
}

// Items to Notes Relationships
app.get('/item-note', (req, res) => {
  let itemNoteQuery: ItemNoteQuery = req.query
  ItemNote.find(itemNoteQuery)
    .then((data) => { res.send(data) })
    .catch((err) => { res.statusCode = 400; res.send(err); });
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

app.listen(process.env.PORT || '8080', () => console.log(`Listening... ${process.env.PORT}`));
