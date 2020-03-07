import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

//Object.keys() will take all of the keys of an object that we pass into it and gives it to us the keys in an array format 
//After we get the keys, we map over that array of the keys, then get the value of our collections object at that key
export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
)

//A curry function that takes the url parameter as an argument and returns another function(creatSelector())
export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
)