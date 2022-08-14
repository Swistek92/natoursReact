import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user-slice';
import { modalSlice } from './modals-slice';
const store = configureStore({
  reducer: { user: userSlice.reducer, modal: modalSlice.reducer },
});

export default store;
