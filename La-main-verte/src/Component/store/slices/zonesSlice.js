import { createSlice } from "@reduxjs/toolkit";



const zonesSlice = createSlice({
   name : 'zones', // The name of the slice. It is used to automatically generate action type strings.
   initialState : {
      value : [],
      zoneId: 0
   }
, // The initial state of the slice.
   reducers : { // An object with reducer functions. Each reducer corresponds to an action that can be dispatched.
       addZone: (state, action) => {
        state.value.push(action.payload)},
        editZone: (state, action) => {
         state.value = action.payload
        },
       removeZone: (state, action) => {
         state.value = state.value.filter((e) => e.id !== action.payload)
       },
       selectZoneId: (state, action) => {
         state.zoneId = action.payload
       }
      }
})


export const {addZone, removeZone,editZone,selectZoneId} = zonesSlice.actions;
export default zonesSlice.reducer;