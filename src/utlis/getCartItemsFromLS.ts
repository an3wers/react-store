import { ICartItem } from "../types/types";

export const getCartItemsfromLocalStorage = () => {
  const json = localStorage.getItem("cart");
  const data = json ? JSON.parse(json) : [];
  return data as ICartItem[];
};
