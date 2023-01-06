import axios from "axios";
import { useState } from "react";
import { IProduct } from "../types/types";

export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsIsLoaded, setProductsIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  function addProduct(product: IProduct) {
    setProducts((prev) => {
      return [...prev, product];
    });
  }

  async function fetchProducts(cat: string) {
    const initUrl =
      cat === "All"
        ? "https://fakestoreapi.com/products"
        : `https://fakestoreapi.com/products/category/${cat}`;

    // console.log('Category', cat)
    setProductsIsLoaded(false);
    setError("");
    try {
      const resp = await axios.get<IProduct[]>(initUrl);
      // console.log(resp)
      setProducts(resp.data);
    } catch (e) {
      setError("На странице произошла ошибка");
    } finally {
      setProductsIsLoaded(true);
    }
  }

  return { products, productsIsLoaded, error, addProduct, fetchProducts };
}
