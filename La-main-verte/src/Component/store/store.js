import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import zonesReducer from './slices/zonesSlice'
import vegetableReducer from './slices/vegetableSlice'
import modaleReducer from './slices/modaleSlice'

import { vegetable } from '../Data/data';

const store = configureStore({
 reducer: {
   
   zones: zonesReducer,
   vegetable: vegetableReducer,
   todo: todoReducer,
   modale: modaleReducer,
   devtools: true
 },
});

export default store;