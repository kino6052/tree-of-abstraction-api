// 1. Get all Items Array
// 2. Iterate over the Array
// 3. Iterate over Each Child in Items
// 4. Check for presence of Child in item-child Store
// 5. Conditionally Generate item-child
// 6. Check for presence of Child in item-child Store

import { app } from '../../index';
import { getItemChild, saveItemChild } from '../endpoint-functions/item-child-helper';
interface ItemResponse {
  statusCode: Number,
  data: Array<Item>
}

interface Item {
  '_id': String,
  children: Array<String>
}

it('should perform saving operation for each child', async () => {
  // Stage 1: Get item data
  let itemResponse: ItemResponse = await app.get('/item');
  let {
    statusCode,
    data = []
  } = itemResponse;
  expect(statusCode).toEqual(200);

  interface ChildrenMapElement {
    _id: String,
    child: String
  }

  // Stage 2: Get the ItemId ChildId map
  const iterateOverData = (data: Array<Item>): Array<ChildrenMapElement> => {
    let result: Array<ChildrenMapElement> = []
    for (let item of data) {
      let {
        _id,
        children = []
      } = item;
      result = [
        ...result,
        ...(
          children.map(
            (child: String) => ({_id, child})
          )
        )
      ]
    }
    return result;
  }
  let itemChildArray = iterateOverData(data);

  expect(itemChildArray).toEqual(
    [ { _id: 1, child: 2 },
      { _id: 1, child: 3 },
      { _id: 2, child: 1 },
      { _id: 3, child: 1 } ]
  )

  // Stage 3: Save items
  for (let itemChild of itemChildArray) {
    let {
      _id: parentId,
      child: childId
    } = itemChild;
    try {
      await getItemChild(parentId, childId);
    } catch (e) {
      let {
        message
      } = e;
      expect(message).toEqual('Couldn\'t get item child');
      let response = await saveItemChild(parentId, childId);
      expect(response).not.toBe(null);
      expect(response).not.toBe(undefined);
    }
  }
});
