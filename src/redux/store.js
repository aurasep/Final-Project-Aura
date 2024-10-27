import { configureStore } from '@reduxjs/toolkit';
import myListReducer from './myListSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
    reducer: {
        myList: myListReducer,
        settings: settingsReducer, 
}
});

export default store;
