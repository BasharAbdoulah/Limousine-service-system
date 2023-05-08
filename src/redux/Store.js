import { configureStore } from "@reduxjs/toolkit";
import showSlice from "./showModelSlice";

export default configureStore({
  reducer: {
    showModel1: showSlice,
  },
});
