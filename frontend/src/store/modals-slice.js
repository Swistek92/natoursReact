import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showLogin: false,
  showRegister: false,
  showTourImage: false,
  tourId: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showLogin(state) {
      state.showLogin = true;
      state.showRegister = false;
    },
    hideLogin(state) {
      console.log('sadasdas');
      state.showLogin = false;
      console.log(state);
    },
    showRegister(state) {
      state.showRegister = true;
      state.showLogin = false;
    },
    hideRegister(state) {
      state.showRegister = false;
    },
    showTourImage(state, action) {
      state.showTourImage = true;
      state.tourId = action.payload;
    },
    hideTourImage(state) {
      state.showTourImage = false;
      state.tourId = '';
    },
  },
});
// export const { reset, updateUser } = modalSlice.actions;

export const modalActions = modalSlice.actions;
