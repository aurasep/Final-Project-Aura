import { configureStore } from '@reduxjs/toolkit';
import myListReducer from './myListSlice';

export const store = configureStore({
  reducer: {
    myList: myListReducer,
  },
});
