import { createSlice } from "@reduxjs/toolkit";



const vegetableSlice = createSlice({
   name : 'vegetable', // vegetable designe famille de légume ici et non plant 
   initialState : {
      familyValue : [],
      vegetableValue: [],
      vegetableSelected: {},
      selectedFamily: {},
      switch: false,
      vegeInfoSwitch: false
      
     
   }
, // The initial state of the slice.
   reducers : { // An object with reducer functions. Each reducer corresponds to an action that can be dispatched.
      switchAddFamilyModale: (state, action) => {
       state.switch = action.payload},
       addFamily: (state, action ) => {
        state.familyValue = action.payload
       },
       addVegetable: (state, action ) => {
         console.log(action);
         state.vegetableValue = action.payload},
       switchVegeInfoModale: (state, action) => {
         state.vegeInfoSwitch = action.payload}
      ,
      selectVegetable: (state, action) => {
         state.vegetableSelected = action.payload
      },
      selectFamily: (state, action) => {
         state.selectedFamily = action.payload
      }
   
   }
})


export const {switchAddFamilyModale, addFamily, selectZoneId, switchVegeInfoModale, selectVegetable, selectFamily} = vegetableSlice.actions;
export default vegetableSlice.reducer;
