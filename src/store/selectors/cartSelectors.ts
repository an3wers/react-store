import { RootState } from "..";

const selectCartModule = (state: RootState) => state.cart;

export const selectSum = (state: RootState) => {
  let result = 0;

  let tmpArr = selectCartModule(state).items.map((el) => el.count * el.price);

  tmpArr.forEach((el) => {
    result += el;
  });

  return result;
};

export const selectItems = (state: RootState) => state.cart.items
