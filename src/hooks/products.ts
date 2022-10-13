import axios from 'axios';
import { useEffect, useState } from 'react';
import { IProduct } from '../types/types';

export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsIsLoaded, setProductsIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  function addProduct(product: IProduct) {
    setProducts((prev) => {
      return [...prev, product];
    });
  }

  async function fetchProducts() {
    setError('');
    try {
      const resp = await axios.get<IProduct[]>(
        'https://fakestoreapi.com/products?limit=8'
      );
      // console.log(resp)
      setProducts(resp.data);
    } catch (e) {
      setError('На странице произошла ошибка');
    } finally {
      setProductsIsLoaded(true);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, productsIsLoaded, error, addProduct };
}
