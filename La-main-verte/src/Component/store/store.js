import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import zonesReducer from './slices/zonesSlice'
import vegetableReducer from './slices/vegetableSlice'

import { vegetable } from '../Data/data';

const store = configureStore({
 reducer: {
   
   zones: zonesReducer,
   vegetable: vegetableReducer,
   todo: todoReducer,
   devtools: true
 },
});

export default store;