import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// TODO: Перенести searchValue в Redux

interface InitialState {
  selectedCategory: string;
  page: number;
  searchValue: string;
}

const initialState: InitialState = {
  selectedCategory: "", // default All
  page: 1,
  searchValue: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    clearSearchValue(state) {
      state.searchValue = "";
    },
  },
});

export default filtersSlice.reducer;
export const { setCategory, setPage, setSearchValue, clearSearchValue } =
  filtersSlice.actions;
