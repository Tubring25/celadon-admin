import { configureStore } from '@reduxjs/toolkit';
import globaReducer from './modules/globalSlice';

const store = configureStore({
  reducer: {
    global: globaReducer,
  },
});

export default store;
