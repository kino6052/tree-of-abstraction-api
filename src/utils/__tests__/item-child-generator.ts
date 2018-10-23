// 1. Get all Items Array
// 2. Iterate over the Array
// 3. Iterate over Each Child in Items
// 4. Check for presence of Child in item-child Store
// 5. Conditionally Generate item-child

import { app } from '../../index';

interface ItemResponse {
  statusCode: Number,
  data: Array<Object>
}

it('should return 200 response for item get REST method', async () => {
  let itemResponse: ItemResponse = await app.get('/item');
  expect(itemResponse.statusCode).toEqual(200);
});
