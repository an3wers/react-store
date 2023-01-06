import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { ICartItem } from "../../types/types";

interface CartState {
  items: ICartItem[];
  // sum: number
}

const initialState: CartState = {
  items: [],
  // sum: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ICartItem>) {
      state.items.push(action.payload);
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((el) => el.id !== action.payload);
    },
    updateCountInItem(
      state,
      action: PayloadAction<{ id: number; count: number }>
    ) {
      const currentItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (currentItem) {
        currentItem.count = action.payload.count;
      }
    },
  },
});

export const { addItem, removeItem, updateCountInItem } = cartSlice.actions;
export const selectSum = (state: RootState) => {
  let result = 0;
  let tmpArr = state.cart.items.map((el) => el.count * el.price);

  tmpArr.forEach((el) => {
    result += el;
  });

  return result;
};
export default cartSlice.reducer;
