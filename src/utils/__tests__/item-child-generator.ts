// 1. Get all Items Array
// 2. Iterate over the Array
// 3. Iterate over Each Child in Items
// 4. Check for presence of Child in item-child Store
// 5. Conditionally Generate item-child

import { app } from '../../index';

interface ItemResponse {
  statusCode: Number,
  data: Array<Item>
}

interface Item {
  '_id': String,
  children: Array<String>
}

it('should return 200 response for item get REST method', async () => {
  let itemResponse: ItemResponse = await app.get('/item');
  let {
    statusCode,
    data = []
  } = itemResponse;
  expect(statusCode).toEqual(200);
  data.map(
    (item: Item) => {
      let {
        _id,
        children = []
      } = item;
      if (_id) {
        children.map(
          (child: Object) => {
            console.log(_id, child);
          }
        )
      }
    }
  )
});
