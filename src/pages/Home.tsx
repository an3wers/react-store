import Product from '../components/Product/Product';
import SpinnerPage from '../components/UI/spinner/spinnerPage';
import { useProducts } from '../hooks/products';
import Error from '../components/Error/error';
import Modal from '../components/UI/modal/Modal';
import CreateProduct from '../components/Product/CreateProduct';
import { useContext, useEffect, useMemo, useState } from 'react';
import { IProduct } from '../types/types';
import { ModalContext } from '../context/ModalContext';
import Sort from '../components/Sort/Sort';
import Pagintaion from '../components/UI/pagination/Pagination';
import Categories from '../components/Categories/Categories';
import { useCategories } from '../hooks/categories';
import Search from '../components/Search/Search';

const HomePage = () => {
  // hook
  const { products, productsIsLoaded, error: pError, fetchProducts } = useProducts();
  const { categories, error: cError, categoriesIsLoaded } = useCategories();
  const [searchValue, setSearchValue] = useState('')

  // state
  const [activeCategory, setActiveCategory] = useState(0)
  const [page, setPage] = useState(1)
  const countOnPage = 6
  const categotyName = categories[activeCategory]


  // const [isModal, setIsModal] = useState(false);

  // const { isModal, open, close } = useContext(ModalContext);

  // function modalHandler() {
  //   // setIsModal(true);
  //   open();
  // }

  // function closeModalHandler() {
  //   // setIsModal(false);
  //   close();
  // }

  // function onCreateHandler(product: IProduct) {
  //   addProduct(product);
  //   closeModalHandler();
  // }

  const filteredProducts = useMemo(() => {
    setPage(1)
    return products.filter(el => el.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
  }, [products, searchValue])

  useEffect(() => {
    fetchProducts(categotyName)
  }, [activeCategory])

  const getPageCount = useMemo(() => {
    return Math.ceil(filteredProducts.length / 6)
  }, [filteredProducts])


  const setActiveCategories = (index: number) => {
    pageHandler(1)
    setActiveCategory(() => {
      return index
    })
  }

  // const slicedProducts = products.slice((page - 1) * countOnPage, page * countOnPage)

  const slicedProducts = useMemo(() => {
    return filteredProducts.slice((page - 1) * countOnPage, page * countOnPage)
  }, [filteredProducts, page])

  useEffect(() => {
    // scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

  }, [page]);

  const pageHandler = (p: number) => {
    setPage(() => {
      return p
    })
  }

  return (
    <div className="container relative">
      {!productsIsLoaded && <SpinnerPage />}
      {pError && cError && <Error message="На странице произошла ошибка" />}

      {/* TODO: Move to admin 
      productsIsLoaded && (
        <div className="flex justify-end mb-6">
          <button
            onClick={modalHandler}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            Create product
          </button>
        </div>
      ) */}

      {productsIsLoaded && (
        <div className="space-y-10 py-10">
          <div className=" flex items-center justify-between">
            <Categories activeCategory={activeCategory} setCategory={setActiveCategories} categories={categories} />
            {/* <Sort /> */}
            <Search value={searchValue} onSearch={setSearchValue} />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {slicedProducts.map((item) => {
              return <Product product={item} key={item.id} />;
            })}
          </div>
          {getPageCount > 1 && <Pagintaion onPage={pageHandler} pageCount={getPageCount} current={page} />}
        </div>
      )}

      {/* {isModal && (
        <Modal title="Create product" onClose={closeModalHandler}>
          <CreateProduct onCreate={onCreateHandler} />
        </Modal>
      )} */}
    </div>
  );
};

export default HomePage;
