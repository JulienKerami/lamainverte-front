import { configureStore } from '@reduxjs/toolkit';

import zonesReducer from './slices/zonesSlice'
import vegetableReducer from './slices/vegetableSlice'

import { vegetable } from '../Data/data';

const store = configureStore({
 reducer: {
   
   zones: zonesReducer,
   vegetable: vegetableReducer,
  
   devtools: true
 },
});

export default store;