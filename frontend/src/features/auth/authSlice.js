import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const APIURL = "http://localhost:8080";
const User = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  user: User ? User : null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const res = await axios.post(APIURL + "/api/user", user);
      localStorage.setItem("user", JSON.stringify(res.data));
      return res.data;
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

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      const res = await axios.post(APIURL + "/api/user/login", user,{ withCredentials: true });
      return res.data;
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
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.user = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = actions.payload.message;
        state.user = actions.payload;
      })
      .addCase(registerUser.rejected, (state, actions) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.user = null;
        state.message = actions.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = actions.payload.message;
        state.user = actions.payload;
      })
      .addCase(loginUser.rejected, (state, actions) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.user = null;
        state.message = actions.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
