import axios from 'axios';

interface ItemChild {
  '_id': String,
  parentId: String,
  childId: String
}

export const getItemChild = async (parentId: String, childId: String): Promise<ItemChild> => {
  let response = await axios.get(`/item-child/${parentId}/${childId}`);
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
  let response = await axios.post(`/item-child`, { parentId, childId });
  let {
    status,
    data
  } = response;
  if (status !== 200) {
    throw Error('Couldn\'t save itemChild');
  }
  return data;
}
