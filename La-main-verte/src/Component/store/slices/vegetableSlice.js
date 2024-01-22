import { createSlice } from "@reduxjs/toolkit";



const vegetableSlice = createSlice({
   name : 'vegetable', // vegetable designe famille de légume ici et non plant 
   initialState : {
      familyValue : [],
      vegetableValue: [],
      vegetableSelected: {},
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
       addVegetable: (state, action ) => {
         state.vegetableValue = action.payload},
       switchVegeInfoModale: (state, action) => {
         state.vegeInfoSwitch = action.payload}
      },
      selectVegetable: (state, action) => {
         state.vegetableIdSelected = action.payload
      }
})


export const {switchVegetableModale, addFamily, selectZoneId, switchVegeInfoModale, selectVegetable} = vegetableSlice.actions;
export default vegetableSlice.reducer;
