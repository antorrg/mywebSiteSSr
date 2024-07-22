// import {createStore, applyMiddleware, compose } from 'redux';
// import {thunk} from 'redux-thunk';
// import rootReducer  from './reducer.js';

// // compose;//window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
// const composeEnhancers =  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const store =  createStore(
//     rootReducer,
//    composeEnhancers(applyMiddleware(thunk)),
// );

// export default store;
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import rootReducer from './reducer.js';  // Asegúrate de que la ruta sea correcta

const createStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(thunk),
  });
};

export default createStore;

