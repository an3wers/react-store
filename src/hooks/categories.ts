import axios from "axios";
import { useState } from "react";

export function useCategories() {
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);
  const [error, setError] = useState("");

  async function fetchCategories() {
    try {
      const res = await axios({
        method: "GET",
        url: "https://fakestoreapi.com/products/categories",
      });

      setCategories((prev) => {
        return ['All', ...res.data];
      });

      setCategoriesIsLoaded(true);
    } catch (error) {
      setError("На странице произошла ошибка");
    } finally {
      setCategoriesIsLoaded(true);
    }
  }

  return { categories, categoriesIsLoaded, error, fetchCategories };
}
