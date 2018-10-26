import axios from 'axios';
import {saveItemChild, getItemChild} from './item-child-helper';

interface Item {
  '_id': String,
  children: Array<String>
}

interface ChildrenMapElement {
  _id: String,
  child: String
}

export const getItemsData = async (): Promise<Array<Item>> => {
  let response = await axios.get(`/item`);
  let {
    status,
    data
  } = response;
  if (status !== 200) {
    throw Error('Couldn\'t get items');
  }
  return data;
}

export const iterateOverData = (data: Array<Item>): Array<ChildrenMapElement> => {
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

export const saveItemChildren = async (itemChildArray: Array<ChildrenMapElement>) => {
  let unsavedItemChildren: Array<ChildrenMapElement> = [];
  for (let itemChild of itemChildArray) {
    let {
      _id: parentId,
      child: childId
    } = itemChild;
    try {
      await getItemChild(parentId, childId);
    } catch (e) {
      try {
        let response = await saveItemChild(parentId, childId);
      } catch (e) {
        unsavedItemChildren.push({ '_id': parentId, child: childId })
      }
    }
  }
  return unsavedItemChildren;
}
