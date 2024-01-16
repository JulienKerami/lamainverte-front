import { configureStore } from '@reduxjs/toolkit';

import zonesReducer from './slices/zonesSlice'

const store = configureStore({
 reducer: {
   
   zones: zonesReducer,
  
   devtools: true
 },
});

export default store;