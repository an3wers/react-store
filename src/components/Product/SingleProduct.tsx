import { IProduct } from "../../types/types";
import { useFormatterPrice } from "../../utlis/helpers";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addItem } from "../../store/slices/cartSlice";

interface ISingleProductProps {
  item: IProduct;
}

const SingleProduct: React.FC<ISingleProductProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);

  const isInCart = !!items.find((el) => el.id === item.id);

  const addCartHandler = () => {
    dispatch(
      addItem({
        id: item.id,
        title: item.title,
        price: item.price,
        count: 1,
        image: item.image,
      })
    );
  };

  return (
    <div className='grid grid-cols-12 gap-6 py-6'>
      <div className=' col-span-12 col-start-1 col-end-13 md:col-span-6 md:col-start-1 md:col-end-7 xl:col-start-2 xl:col-end-7 xl:col-span-5'>
        <div className=' w-full h-auto'>
          <img
            className='w-full h-full object-contain'
            src={item.image}
            alt={item.title}
          />
        </div>
      </div>
      <div className=' col-span-12 col-start-1 col-end-13 md:col-span-6 md:col-start-7 md:col-end-13 xl:col-start-7 xl:col-end-12 xl:col-span-5'>
        <div className=' flex flex-col space-y-6'>
          <div className=' space-y-1'>
            <h1 className=' text-xl font-bold'>{item.title}</h1>
            <div className=' text-gray-500'>{item.category}</div>
          </div>
          <div className=' text-xl font-bold'>
            {useFormatterPrice(item.price)}
          </div>
          {/* Проверка, есть ли в корзине */}
          <button
            disabled={isInCart}
            onClick={addCartHandler}
            className='text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 focus:border-blue-300 focus:ring focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-50'
          >
            {isInCart ? "Added to cart" : "Add to cart"}
          </button>
          <div className='space-y-1'>
            <h4 className='font-bold'>Description</h4>
            <p>{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
