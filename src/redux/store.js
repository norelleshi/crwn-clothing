import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [];

//Only when in the development mode, we show the action status in browser console
if(process.env.NODE_ENV === 'development' {
    middlewares.push(logger);
})

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);
