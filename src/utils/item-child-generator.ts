import {
  getItemsData,
  iterateOverData,
  saveItemChildren
} from './endpoint-functions/item-helper';

export const itemChildGenerator = async () => {
  console.log('Getting data');
  let data = await getItemsData();
  console.log('Iterating over data');
  let itemChildArray = await iterateOverData(data);
  console.log('Saving item\'s children');
  let unsavedItemChildren = await saveItemChildren(itemChildArray);
  console.log(unsavedItemChildren)
};
