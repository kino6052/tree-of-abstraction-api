// 1. Get all Items Array
// 2. Iterate over the Array
// 3. Iterate over Each Child in Items
// 4. Check for presence of Child in item-child Store
// 5. Conditionally Generate item-child
// 6. Check for presence of Child in item-child Store

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
  const getItemChild = async (parentId: String, childId: String) => {
    return new Promise<Object>(
      (resolve) => {
        resolve({
          statusCode: 200,
          data: { parentId, childId }
        })
      }
    )
  }

  const saveItemChild = async (parentId: String, childId: String) => {
    return new Promise<Object>(
      (resolve) => {
        resolve({
          statusCode: 400,
          data: { parentId, childId }
        })
      }
    )
  }

  for (let itemChild of itemChildArray) {
    let {
      _id: parentId,
      child: childId
    } = itemChild;
    let response: ItemResponse = <ItemResponse>(await getItemChild(parentId, childId));
    let {
      statusCode
    } = response;
    expect(statusCode).toEqual(200);
    if (statusCode !== 200) {
      let response: ItemResponse = <ItemResponse>(await saveItemChild(parentId, childId));
      let {
        statusCode
      } = response;
      if (statusCode !== 200) {
        // Add Item to Array of values that didn't go through
      }
    }
  }
});
