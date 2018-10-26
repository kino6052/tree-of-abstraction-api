import axios from 'axios';
import { BASE_URL } from '../..'

interface ItemChild {
  '_id': String,
  parentId: String,
  childId: String
}

export const getItemChild = async (parentId: String, childId: String): Promise<ItemChild> => {
  let response = await axios.get(`${BASE_URL}/item-child/${parentId}/${childId}`);
  let {
    status,
    data
  } = response;
  if (status !== 200) {
    throw Error('Couldn\'t get itemChild');
  }
  return data;
}

export const saveItemChild = async (parentId: String, childId: String): Promise<ItemChild> => {
  let response = await axios.post(`${BASE_URL}/item-child`, { parentId, childId });
  let {
    status,
    data
  } = response;
  if (status !== 200) {
    throw Error(data);
  }
  return data;
}
