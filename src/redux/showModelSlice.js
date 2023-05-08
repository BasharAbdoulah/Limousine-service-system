import { createSlice } from "@reduxjs/toolkit";

export const showSlice = createSlice({
  name: "showModel",
  initialState: {
    value: false,
    selectedCar: null,
  },

  reducers: {
    showModel: (state) => {
      console.log(state);
      state.value = true;
    },

    hideModel: (state) => {
      state.value = false;
    },
    selectCar: (state, payload) => {
      state.selectedCar = payload;
    },
  },
});

export const { showModel, hideModel, selectCar } = showSlice.actions;
export default showSlice.reducer;
