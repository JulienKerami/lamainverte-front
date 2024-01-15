import { createSlice } from "@reduxjs/toolkit";



const zonesSlice = createSlice({
   name : 'zones', // The name of the slice. It is used to automatically generate action type strings.
   initialState : {
      value : [],
      switch: false
   }
, // The initial state of the slice.
   reducers : { // An object with reducer functions. Each reducer corresponds to an action that can be dispatched.
       addZone: (state, action) => {
        state.value.push(action.payload)},
        editZone: (state, action) => {
         state.value = action.payload
        },
       removeZone: (state, action) => {
         state = action.payload
       },
      }
})


export const {addZone, removeZone,editZone} = zonesSlice.actions;
export default zonesSlice.reducer;