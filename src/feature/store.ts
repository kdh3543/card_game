import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal/modalSlice";

export const store = configureStore({
  reducer: {
    [modalSlice.name]: modalSlice.reducer,
  },
});
