import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../types/types";
import SpinnerPage from "../components/UI/spinner/spinnerPage";
import SingleProduct from "../components/Product/SingleProduct";
import { useSingleProduct } from "../hooks/singleProduct";
import Error from "../components/Error/error";

const ProductPage = () => {
  const params = useParams();
  const { product, isLoaded, isError, fetchProduct } = useSingleProduct();

  useEffect(() => {
    fetchProduct(params.productId);
  }, []);

  return (
    <div className='container'>
      {isLoaded && product ? <SingleProduct item={product} /> : <SpinnerPage />}
      {isError && <Error message='Error on page' />}
    </div>
  );
};

export default ProductPage;
