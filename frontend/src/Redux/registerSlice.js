import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postRegister = createAsyncThunk(
  "register/postRegister",
  async (user) => {
    const response = await axios.post(
      "http://localhost:4000/auth/register",
      user
    );

    const res = await response.data;

    return res;
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    msg: null,
    err: null,
    success: null,
    status: null,
  },
  extraReducers: {
    [postRegister.pending]: (state, action) => {
      state.status = "loading";
    },
    [postRegister.fulfilled]: (state, { payload }) => {
      state.msg = payload.msg;
      state.err = payload.err;
      state.status = "success";
      state.success = payload.success;
    },
    [postRegister.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default registerSlice.reducer;
