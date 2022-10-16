// import { FC } from 'react'
import { IProduct } from '../../types/types';

interface ProductProps {
  product: IProduct;
}

const Product = ({ product }: ProductProps) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md block">
      <div className="p-8 aspect-square">
        <img
          className="w-full h-full object-contain"
          src={product.image}
          alt={product.title}
        />
      </div>

      <div className="px-5 pb-5 space-y-4">
        <h5 className="text-base font-semibold tracking-tight text-gray-900 h-24">
          {product.title}
        </h5>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
          <button className="text-white bg-blue-700 border border-transparent hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2 text-center">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
