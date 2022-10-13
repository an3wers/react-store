import axios from 'axios';
import { useEffect, useState } from 'react';

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);
  const [error, setError] = useState('');

  async function fetchCategories() {
    try {
      const res = await axios({
        method: 'GET',
        url: 'https://fakestoreapi.com/products/categories',
      });
      console.log('Cats', res);

      setCategories(res.data);
      setCategoriesIsLoaded(true);
    } catch (error) {
      setError('На странице произошла ошибка');
    } finally {
      setCategoriesIsLoaded(true);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, categoriesIsLoaded, error };
}
