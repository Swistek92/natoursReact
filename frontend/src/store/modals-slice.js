import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showLogin: false,
  showRegister: false,
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
  },
});
// export const { reset, updateUser } = modalSlice.actions;

export const modalActions = modalSlice.actions;
