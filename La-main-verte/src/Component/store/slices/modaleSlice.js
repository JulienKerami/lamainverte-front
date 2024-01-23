import { createSlice } from '@reduxjs/toolkit';

const modaleSlice = createSlice({
  name: 'modale',
  initialState: {
    addFamilyModale: false,
    deleteZoneModale: false,
    addZoneModale: false

  },
  reducers: {
    toggleAddFamilyModale: (state, action) => {
      state.addFamilyModale = action.payload
    },
    toggleDeleteZoneModale: (state, action) => {
      state.deleteZoneModale = action.payload
    },

    toggleAddZoneModale: (state, action) => {
      state.addZoneModale = action.payload
    },

    
    }
  },
);

export const { toggleAddFamilyModale, toggleDeleteZoneModale, toggleAddZoneModale } = modaleSlice.actions;
export default modaleSlice.reducer;