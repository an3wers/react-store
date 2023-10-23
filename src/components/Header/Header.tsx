import { Link, useNavigate } from "react-router-dom";
import { useFormatterPrice } from "../../utlis/helpers";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useEffect, useRef } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { selectItems, selectSum } from "../../store/selectors/cartSelectors";

const Header: React.FC = () => {
  
  // Refactoring store
  const summ = useAppSelector(selectSum);
  const items = useAppSelector(selectItems);

  const navigate = useNavigate();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const data = JSON.stringify(items);
      localStorage.setItem("cart", data);
    }

    isMounted.current = true;
  }, [items]);

  return (
    <div className='mb-5'>
      <nav className='bg-white px-2 py-2.5 w-full top-0 left-0 border-b border-gray-200'>
        <div className='container flex flex-wrap justify-between items-center'>
          <Link to='/' className='flex items-center'>
            <span className='self-center text-2xl font-bold whitespace-nowrap'>
              React Store
            </span>
          </Link>
          <button
            type='button'
            onClick={() => navigate("/cart")}
            className='text-gray-900 inline-flex items-center space-x-4 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg px-5 py-2 focus:border-blue-300 focus:ring focus:ring-blue-300 focus:ring-opacity-50'
          >
            <span>{useFormatterPrice(summ)}</span>
            <div className='w-[1px] h-6 bg-black/50'></div>
            <div className=' inline-flex items-center space-x-1'>
              <HiOutlineShoppingCart size={"20px"} />
              <span className=''>{items.length}</span>
            </div>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
