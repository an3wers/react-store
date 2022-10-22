import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useFormatterPrice } from '../../utlis/helpers';
const Header = () => {

  const { items, summ } = useContext(CartContext)

  const navigate = useNavigate()
  return (
    <div className="mb-5">
      <nav className="bg-white px-2 py-2.5 w-full top-0 left-0 border-b border-gray-200">
        <div className="container flex flex-wrap justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="self-center text-2xl font-bold whitespace-nowrap">
              React Store
            </span>
          </Link>
          <div className=" relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#94a3b8"
              className="w-6 h-6 absolute top-[9px] left-[8px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <input
              type="text"
              placeholder="Поиск..."
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 py-2 pl-10 pr-2"
            />
          </div>
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="text-white inline-flex space-x-4 border border-transparent bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2"
          >
            <span>{useFormatterPrice(summ)}</span>
            <div className="w-[1px] h-6 bg-white/50"></div>
            <span className=" inline-flex space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#ffffff"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              <span>{items.length}</span>
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
