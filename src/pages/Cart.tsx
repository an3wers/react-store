// import { useContext } from "react"
import CartEmptyState from "../components/Cart/EmptyState";
import CartProductPreview from "../components/Cart/ProductPreview";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import {
  removeItem,
  updateCountInItem,
  fetchCart,
} from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { useFormatterPrice } from "../utlis/helpers";
import { useEffect } from "react";
import { selectItems, selectSum } from "../store/selectors/cartSelectors";

const Cart: React.FC = () => {
  const items = useAppSelector(selectItems);
  let summ: number | string = useAppSelector(selectSum);
  summ = useFormatterPrice(summ);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const removeHandler = (id: number) => {
    dispatch(removeItem(id));
  };

  const setCountHandler = (id: number, count: number) => {
    dispatch(updateCountInItem({ id, count }));
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  return (
    <div className=' container'>
      <div className=' grid grid-cols-12'>
        <div className='col-start-1 col-span-12 lg:col-start-2 lg:col-span-10 xl:col-start-3 xl:col-span-8'>
          <h1 className='text-center text-4xl font-bold my-8'>Cart</h1>
          {items.length ? (
            <div>
              <div className='flex flex-col divide-y'>
                {items.map((el) => (
                  <CartProductPreview
                    key={el.id}
                    item={el}
                    setCount={setCountHandler}
                    remove={removeHandler}
                  />
                ))}
              </div>
              <div className='flex items-start justify-end'>
                <div>
                  Total price:
                  <span className='font-bold'> {summ}</span>
                </div>
              </div>
              <div className='flex justify-between items-center mt-6'>
                <button
                  type='button'
                  onClick={() => navigate("/")}
                  className='text-gray-900 inline-flex space-x-4 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4  font-medium rounded-lg px-5 py-2 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-50'
                >
                  Back
                </button>
                <button
                  type='button'
                  className='text-white bg-blue-700 border border-transparent hover:bg-blue-800 focus:ring-blue-300 focus:ring-4  focus:outline-none  font-medium rounded-lg px-5 py-2 text-center disabled:opacity-50 focus:border-blue-300 focus:ring-opacity-50'
                >
                  Confirm order
                </button>
              </div>
            </div>
          ) : (
            <CartEmptyState />
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
