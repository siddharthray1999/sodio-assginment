import { configureStore } from "@reduxjs/toolkit";

import getUserListReducer from "../Features/GetUserListSlice";

export const store = configureStore({
  reducer: {
    getUserList: getUserListReducer,
  },
});
