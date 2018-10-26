import { getItemsData, iterateOverData, saveItemChildren } from './endpoint-functions/item-helper';

(async () => {
  let data = await getItemsData();
  let itemChildArray = await iterateOverData(data);
  let unsavedItemChildren = await saveItemChildren(itemChildArray);
  console.log(unsavedItemChildren)
})();
