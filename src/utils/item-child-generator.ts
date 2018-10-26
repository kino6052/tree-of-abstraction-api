import {
  getItemsData,
  iterateOverData,
  saveItemChildren
} from './endpoint-functions/item-helper';

export const itemChildGenerator = async () => {
  let data = await getItemsData();
  let itemChildArray = await iterateOverData(data);
  let unsavedItemChildren = await saveItemChildren(itemChildArray);
  console.log(unsavedItemChildren)
};
