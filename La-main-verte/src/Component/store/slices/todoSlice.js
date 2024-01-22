import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
    },
    removeTask: (state, action) => {
    },
  },
});

export const { addTask, removeTask } = todoSlice.actions;
export default todoSlice.reducer;