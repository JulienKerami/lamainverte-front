import { createSlice, current } from "@reduxjs/toolkit";




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
         console.log(action.payload[0],action.payload[1]);
         let array = state.value

        let newArray = array.splice(action.payload[0],1,action.payload[1] )
        
        
      
       },
       deleteVegetableFromZone: (state, action) => {
        console.log(action.payload[0]);
        let array = state.value
        let ZoneToFilter = array.find((e) => e.id = action.payload[1].zone_id)
        console.log(action.payload[1].zone_id);
        let ZoneFiltered = {...ZoneToFilter, vegetable: ZoneToFilter.vegetable.filter((e) => e.id !== action.payload[1].id)} 
       
        let newArray = array.splice(action.payload[0], 1, ZoneFiltered)
        

       
       }
      }
})


export const {addZone, removeZone,editZone,selectZoneId, addVegetableToZone, deleteVegetableFromZone} = zonesSlice.actions;
export default zonesSlice.reducer;