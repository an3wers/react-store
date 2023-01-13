import Product from "../components/Product/Product";
import SpinnerPage from "../components/UI/spinner/spinnerPage";
import { useProducts } from "../hooks/products";
import Error from "../components/Error/error";
import { useEffect, useMemo, useRef, useState } from "react";
// import Sort from "../components/Sort/Sort";
import Pagintaion from "../components/UI/pagination/Pagination";
import Categories from "../components/Categories/Categories";
import { useCategories } from "../hooks/categories";
import Search from "../components/Search/Search";
import qs from "qs";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  setCategory,
  setPage,
  clearSearchValue,
} from "../store/slices/filtersSlice";

const HomePage: React.FC = () => {
  interface QueryParams {
    page?: number;
    search?: string;
    category?: string;
  }

  // hook products
  const {
    products,
    productsIsLoaded,
    error: pError,
    fetchProducts,
  } = useProducts();

  // hook categories
  const { categories, error: cError } = useCategories();

  const dispatch = useAppDispatch();
  const { selectedCategory, page, searchValue } = useAppSelector(
    (state) => state.filters
  );

  const navigate = useNavigate();
  const location = useLocation();

  const isFirstRender = useRef(true);
  const isSearchParams = useRef(false);
  const countOnPage = 6;

  useEffect(() => {
    if (location.search) {
      const params = qs.parse(location.search.slice(1, location.search.length));
      if (params.category) {
        dispatch(setCategory(params.category as string));
      } else {
        dispatch(setCategory("All"));
      }
      if (params.page) {
        dispatch(setPage(+params.page));
      }
      isSearchParams.current = true;
    } else {
      // initial state
      dispatch(setCategory("All"));
      dispatch(setPage(1));
      dispatch(clearSearchValue());
      isSearchParams.current = false;
    }
  }, [location]);
  
  useEffect(() => {
    if (!isFirstRender.current) {
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (!isFirstRender.current) {
      const resultQueryStr: QueryParams = {};

      if (page && page !== 1) {
        resultQueryStr.page = page;
      }
      if (searchValue) {
        resultQueryStr.search = searchValue;
      }
      if (selectedCategory && selectedCategory !== "All") {
        resultQueryStr.category = selectedCategory;
      }

      const queryStr = qs.stringify(resultQueryStr);

      navigate(`?${queryStr}`); // добавляю строчку в Url
      isSearchParams.current = true;
    }
    isFirstRender.current = false;
  }, [page, searchValue, selectedCategory]);

  const setActiveCategories = (index: number) => {
    pageHandler(1);
    dispatch(setCategory(categories[index]));
  };

  const filteredProducts = useMemo(() => {
    return products.filter((el) =>
      el.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }, [searchValue, products]);

  const slicedProducts = useMemo(() => {
    return filteredProducts.slice((page - 1) * countOnPage, page * countOnPage);
  }, [filteredProducts, page]);

  const getPageCount = useMemo(() => {
    return Math.ceil(filteredProducts.length / 6);
  }, [filteredProducts]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [page]);

  const pageHandler = (p: number) => {
    dispatch(setPage(p));
  };

  return (
    <div className='container relative'>
      {!productsIsLoaded && <SpinnerPage />}
      {pError && cError && <Error message='На странице произошла ошибка' />}

      {productsIsLoaded && (
        <div className='space-y-10 py-10'>
          <div className=' flex items-center justify-between'>
            <Categories
              activeCategory={selectedCategory}
              setCategory={setActiveCategories}
              categories={categories}
            />
            {/* <Sort /> */}
            <Search />
          </div>
          <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {slicedProducts.map((item) => {
              return <Product product={item} key={item.id} />;
            })}
          </div>
          {!slicedProducts.length && (
            <p className=' text-center py-10'>Products not found</p>
          )}
          {getPageCount > 1 && (
            <Pagintaion
              onPage={pageHandler}
              pageCount={getPageCount}
              current={page}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
