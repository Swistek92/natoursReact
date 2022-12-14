import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import host from '../utilites/host';
import userService from './user-service';
const user = JSON.parse(localStorage.getItem('user'));
const API_URL = `${host()}users/`;

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Register user
export const register = createAsyncThunk(
  'user/register',
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(API_URL + 'signup', user);
      console.log(response);
      console.log(JSON.stringify(response.data));
      console.log(JSON.stringify(response));

      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      console.log('response.data', response.data);
      console.log('response', response);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  await userService.logout();
});

export const login = createAsyncThunk('user/login', async (user, thunkAPI) => {
  try {
    return await userService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset(state) {
      state.isLoading = false;

      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    updateUser(state, action) {
      state.user.data.user = action.payload;
      // state.user.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.user = null;
        state.message = action.payload;
      });
  },
});
export const { reset, updateUser } = userSlice.actions;

// export const userActions = userSlice.actions;
