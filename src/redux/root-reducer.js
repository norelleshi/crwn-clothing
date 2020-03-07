import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

//Telling redux-persist to use the local storage object of our window browser as our default storage
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

//Persist cart reducer to storage
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
})

//Use persistReducer function to turn the rootReducer into a persistent version of rootReducer and export out
export default persistReducer(persistConfig, rootReducer);