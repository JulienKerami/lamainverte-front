import { createSlice } from "@reduxjs/toolkit";



const authentificationSlice = createSlice({
   name : 'authentification', // The name of the slice. It is used to automatically generate action type strings.
   initialState : {isAuthentificated: false}
, // The initial state of the slice.
   reducers : { // An object with reducer functions. Each reducer corresponds to an action that can be dispatched.
       authentificate : (state, action) => {
         state.isAuthentificated = !state.isAuthentificated
       }
   }
})


export const {authentificate} = authentificationSlice.actions;
export default authentificationSlice.reducer;