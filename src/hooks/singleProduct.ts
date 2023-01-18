import { useState } from "react";
import axios from "axios";
import { IProduct } from "../types/types";

interface ProductResponse {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  error?: string;
}

export const useSingleProduct = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState<null | string>(null);

  async function fetchProduct(id: string | undefined) {
    try {
      setIsLoaded(false);
      const resp = await axios.get<ProductResponse>(
        `https://fakestoreapi.com/products/${id}`
      );
      setProduct(() => {
        return resp.data as IProduct;
      });
    } catch (error: any) {
      console.log(error);
      setIsError(() => error?.message);
    } finally {
      setIsLoaded(true);
    }
  }

  return { product, isLoaded, isError, fetchProduct };
};
