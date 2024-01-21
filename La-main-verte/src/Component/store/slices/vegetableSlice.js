import { createSlice } from "@reduxjs/toolkit";



const vegetableSlice = createSlice({
   name : 'vegetable', // vegetable designe famille de légume ici et non plant 
   initialState : {
      familyValue : [],
      vegetableValue: [],
      switch: false,
      vegeInfoSwitch: false
      
     
   }
, // The initial state of the slice.
   reducers : { // An object with reducer functions. Each reducer corresponds to an action that can be dispatched.
       switchVegetableModale: (state, action) => {
       state.switch = action.payload},
       addFamily: (state, action ) => {
        state.familyValue = action.payload
       },
       switchVegeInfoModale: (state, action) => {
         state.vegeInfoSwitch = action.payload}
      }
})


export const {switchVegetableModale, addFamily, selectZoneId, switchVegeInfoModale} = vegetableSlice.actions;
export default vegetableSlice.reducer;
