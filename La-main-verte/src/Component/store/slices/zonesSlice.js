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
       },
       addVegetableToZone: (state, action) => {
         console.log(action.payload[1]);
         let ZoneIdToModify = action.payload[0]
         let array = state.value[ZoneIdToModify]
         // let zoneTosliceId = action.payload.vegetable[0].zone_id
         // let array = state.value.filter((e) => e.id !== zoneTosliceId )
         // array.push(action.payload)
         // state.value = array
       }
      }
})


export const {addZone, removeZone,editZone,selectZoneId, addVegetableToZone} = zonesSlice.actions;
export default zonesSlice.reducer;