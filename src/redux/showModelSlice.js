import { createSlice } from "@reduxjs/toolkit";

export const showSlice = createSlice({
  name: "showModel",
  initialState: {
    value: false,
    selectedCar: null,
    lastRequest: null,
    tripType: null,
  },

  reducers: {
    showModel: (state) => {
      state.value = true;
    },

    hideModel: (state) => {
      state.value = false;
    },
    selectCar: (state, payload) => {
      state.selectedCar = payload;
    },
    selectedTripType: (state, payload) => {
      state.tripType = payload;
    },
  },
});

export const { showModel, hideModel, selectCar, selectedTripType } =
  showSlice.actions;
export default showSlice.reducer;
