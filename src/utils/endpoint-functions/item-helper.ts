import axios from 'axios';
import { BASE_URL } from '../../index';
import {saveItemChild} from './item-child-helper';



interface Item {
  '_id': String,
  children: Array<String>
}

interface ChildrenMapElement {
  _id: String,
  child: String
}

export const getItemsData = async (): Promise<Array<Item>> => {
  let response = await axios.get(`${BASE_URL}/item`);
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
          (child: String) => {
            console.log(_id, child);
            return {_id, child}
          }
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
      // let itemChildResponse = await getItemChild(parentId, childId);
      try {
          await saveItemChild(parentId, childId);
          console.log(`Successfully saved ${parentId}:${childId}`)
      } catch (e) {
        console.log(e.message);
        console.log('Couldn\'t save item child', parentId, childId);
        unsavedItemChildren.push({ '_id': parentId, child: childId })
      }
    } catch (e) {
      console.log('Couldn\'t get item child')
      try {
        await saveItemChild(parentId, childId);
      } catch (e) {
        console.log('Couldn\'t save item child', parentId, childId);
        unsavedItemChildren.push({ '_id': parentId, child: childId })
      }
    }
  }
  return unsavedItemChildren;
}
