import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user-slice';
// import searchSlice from './search-slice';
// import selectSlice from './select-slice';
// search: searchSlice.reducer, select: selectSlice.reducer
const store = configureStore({
  reducer: { user: userSlice.reducer },
});

export default store;
