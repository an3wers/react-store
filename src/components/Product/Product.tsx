// import { FC } from 'react'
import { useContext, useMemo } from 'react';
import { CartContext } from '../../context/CartContext';
import { IProduct } from '../../types/types';
import { useFormatterPrice } from '../../utlis/helpers';
import { Link } from 'react-router-dom'

interface ProductProps {
  product: IProduct;
}

const Product = ({ product }: ProductProps) => {

  const { addItem, items } = useContext(CartContext)

  const addCartHandler = () => {
    // console.log(product)
    addItem({ id: product.id, title: product.title, price: product.price, count: 1, image: product.image })
  }

  const isInCart = useMemo(() => {
    return !!items.find(el => el.id === product.id)
  }, [items])

  return (
    <div className="w-full bg-white rounded-lg shadow-md block">
      <div className="p-8 h-64 w-full">
        <img
          className="w-full h-full object-contain"
          src={product.image}
          alt={product.title}
        />
      </div>

      <div className="px-5 pb-5 space-y-4">
        <h5 className="text-base font-semibold tracking-tight text-gray-900 h-24">
          <Link to={`${product.id}`}>
            {product.title}
          </Link>
        </h5>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900">
            {useFormatterPrice(product.price)}
          </span>

          <button type='button' disabled={isInCart} onClick={addCartHandler} className="text-white bg-blue-700 border border-transparent hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2 text-center disabled:opacity-50">
            {isInCart ? 'Added to cart' : 'Add to cart'}
          </button>

        </div>
      </div>
    </div>
  );
};

export default Product;
