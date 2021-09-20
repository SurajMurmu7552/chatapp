import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getLogin = createAsyncThunk("login/getLogin", async (user) => {
  const response = await axios.post("http://localhost:4000/auth/login", user);

  const res = await response.data;

  return res;
});

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: {},
    status: null,
    success: null,
  },
  extraReducers: {
    [getLogin.pending]: (state, action) => {
      state.status = "loading";
    },
    [getLogin.fulfilled]: (state, { payload }) => {
      localStorage.setItem("user", JSON.stringify(payload.user));
      state.user = payload.user;
      state.success = payload.success;
      state.status = "success";
    },
    [getLogin.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default loginSlice.reducer;
