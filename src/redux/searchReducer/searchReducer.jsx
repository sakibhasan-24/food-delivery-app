import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: "", // Initial value of the search term
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    clearSearchText: (state) => {
      state.searchText = "";
    },
  },
});

export const { setSearchText, clearSearchText } = searchSlice.actions;

export default searchSlice.reducer;
