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
    addOneTask: (state, action) => {
      state.tasks.push(action.payload)
    }
    
    }
  },
);

export const { addTask, removeTask,addOneTask } = todoSlice.actions;
export default todoSlice.reducer;