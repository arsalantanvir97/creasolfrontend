import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { API_PATH } from "./../../constants";

const initialState = {
  user: null,
  message: "",
  error: "",
  isLoading: false,
  isSuccess: true,
  isloggedOut: false,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios(`${API_PATH}/api/login`, {
        method: "POST",
        data: {
          email,
          password,
        },
      });
      response.data.image = response.data.image
        ? API_PATH + response.data.image
        : "";
      const data = await response.data;
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return { ...response };
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e) {
      toast(e.response.data, { type: 'error'});
      return thunkAPI.rejectWithValue(e.response);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, thunkAPI) => {
    try {
      const { first_name, last_name, email, phone, password } = user;
      const response = await axios(`${API_PATH}/api/register`, {
        method: "POST",
        data: {
          first_name,
          last_name,
          email,
          phone,
          password,
        },
      });
      response.data.image = response.data.image
        ? API_PATH + response.data.image
        : "";
      const data = await response.data;
      if (response.status === 201) {
        localStorage.setItem("token", data.token);
        return { ...response };
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginDetails: (state, action) => {
      if (!state.isloggedOut) {
        action.payload.image = API_PATH + action.payload.image;
        state.user = action.payload;
      }
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.isloggedOut = true;
    },
  },
  extraReducers: {
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isloggedOut = false;
      state.user = payload.data;
      state.message = "Regsitration Successful";
    },
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.error = payload;
      console.log(payload);
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isloggedOut = false;
      state.user = payload.data;
      state.message = "Login Successful!";
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.error = payload;
      console.log(payload);
    },
  },
});

export const userSelector = (state) => state.auth;

export const { setLoginDetails, logout } = authSlice.actions;
