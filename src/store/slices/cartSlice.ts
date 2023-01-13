import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { ICartItem } from "../../types/types";
import axios from "axios";

type FakeCartProduct = {
  productId: number,
  quantity: number,
}

interface FakeCartItem {
  id: number,
  userId: number,
  date: Date,
  products: FakeCartProduct[],
  error?: string
}
// fake api
export const fetchCart = createAsyncThunk<FakeCartItem[], undefined, {rejectValue: string}>(
  "cart/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<FakeCartItem[]>("https://fakestoreapi.com/carts");
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);

interface CartState {
  items: ICartItem[];
  isLoading: boolean;
  error: string | null;
  // sum: number
}

const initialState: CartState = {
  items: [],
  isLoading: false,
  error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("Fake cart", action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        console.log("Cart error", action.payload);
      });
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
