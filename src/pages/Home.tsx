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
import { setCategory, setPage } from "../store/slices/filtersSlice";

const HomePage: React.FC = () => {
  // interface QueryParams {
  //   page: string;
  //   search: string;
  //   category: string;
  // }

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
  const { selectedCategory, page } = useAppSelector((state) => state.filters);

  const navigate = useNavigate();
  const location = useLocation();

  const [searchValue, setSearchValue] = useState("");

  const isFirstRender = useRef(true);
  const isSearchParams = useRef(false);
  const countOnPage = 6;

  

  useEffect(() => {
    if (location.search) {
      const params = qs.parse(
        location.search.slice(1, location.search.length)
      );
      dispatch(setCategory(params.category as string));
      if (params.page) {
        dispatch(setPage(+params.page));
      }
      isSearchParams.current = true;
    } else {
      dispatch(setCategory('All'))
      dispatch(setPage(1))
      setSearchValue('')
      isSearchParams.current = false;
    }

  }, [location]);
/*
  * Есть баг с ссылкой ?page=1&search=&category=All, параметры равны дефолтному состоянию из-за этого не срабатывает хук
  */
  useEffect(() => {
    // Разобраться зачем тут проверяю на первый рендер
    if (isFirstRender.current) {
      if (!isSearchParams.current) {
        fetchProducts(selectedCategory);
      }

      isSearchParams.current = false;
    } else {
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory]);

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

  useEffect(() => {
    if (!isFirstRender.current) {
      const queryStr = qs.stringify({
        page: page,
        search: searchValue,
        category: selectedCategory,
      });
      navigate(`?${queryStr}`); // добавляю строчку в Url
      isSearchParams.current = true;
    }
    isFirstRender.current = false;
  }, [page, searchValue, selectedCategory, navigate]);

  const pageHandler = (p: number) => {
    dispatch(setPage(p));
  };

  return (
    <div className="container relative">
      {!productsIsLoaded && <SpinnerPage />}
      {pError && cError && <Error message="На странице произошла ошибка" />}

      {productsIsLoaded && (
        <div className="space-y-10 py-10">
          <div className=" flex items-center justify-between">
            <Categories
              activeCategory={selectedCategory}
              setCategory={setActiveCategories}
              categories={categories}
            />
            {/* <Sort /> */}
            <Search value={searchValue} onSearch={setSearchValue} />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {slicedProducts.map((item) => {
              return <Product product={item} key={item.id} />;
            })}
          </div>
          {!slicedProducts.length && (
            <p className=" text-center py-10">Products not found</p>
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
