// src/redux/myListSlice.js
import { createSlice } from '@reduxjs/toolkit';

const myListSlice = createSlice({
  name: 'myList',
  initialState: {
    myList: [],
  },
  reducers: {
    addToMyList: (state, action) => {
      state.myList.push(action.payload);
    },
    removeFromMyList: (state, action) => {
      state.myList = state.myList.filter(movie => movie.id !== action.payload.id);
    },
    setMyList: (state, action) => {
      state.myList = action.payload;
    },
  },
});

export const { addToMyList, removeFromMyList, setMyList } = myListSlice.actions;
export default myListSlice.reducer;
