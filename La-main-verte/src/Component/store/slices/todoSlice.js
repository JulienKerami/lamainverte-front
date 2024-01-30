import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    tasks: []
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks = action.payload
    },
    
    }
  },
);

export const { addTask, removeTask } = todoSlice.actions;
export default todoSlice.reducer;