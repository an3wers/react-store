import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// TODO: Перенести searchValue в Redux

interface InitialState {
    selectedCategory: string,
    page: number
}

const initialState: InitialState = {
    selectedCategory: '', // default All
    page: 1
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState: initialState,
    reducers: {
        setCategory(state, action: PayloadAction<string>) {
            state.selectedCategory = action.payload
        },
        setPage(state, action:PayloadAction<number>) {
            state.page = action.payload
        }
    }
})

export default filtersSlice.reducer
export const { setCategory, setPage } = filtersSlice.actions