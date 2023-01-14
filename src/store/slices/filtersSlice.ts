import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const enum ESortBy {
  default = "default",
  asc = "asc",
  desc = "desc",
}

interface InitialState {
  selectedCategory: string;
  page: number;
  searchValue: string;
  selectedSort: ESortBy;
}

const initialState: InitialState = {
  selectedCategory: "", // default All
  page: 1,
  searchValue: "",
  selectedSort: ESortBy.default,
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
    setSort(state, action:  PayloadAction<ESortBy>) {
      state.selectedSort = action.payload
    }
  },
});

export default filtersSlice.reducer;
export const { setCategory, setPage, setSearchValue, clearSearchValue, setSort } =
  filtersSlice.actions;
