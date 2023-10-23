import { RootState } from "..";

const selectFilterModule = (state: RootState) => state.filters;

export const selectFilters = (state: RootState) => selectFilterModule(state);
