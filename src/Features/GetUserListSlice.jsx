import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./GetUserListThunk";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const GetUserListSlice = createSlice({
  name: "getUserList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default GetUserListSlice.reducer;
