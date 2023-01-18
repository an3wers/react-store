import { useState } from "react";
// import { CartContext } from "../../context/CartContext";
import { ICartItem } from "../../types/types";
import { useFormatterPrice } from "../../utlis/helpers";
import { Link } from "react-router-dom";
import { HiX } from "react-icons/hi";

interface ICartProduvtPreviewProps {
  item: ICartItem;
  remove: (id: number) => void;
  setCount: (id: number, count: number) => void;
}
const CartProductPreview: React.FC<ICartProduvtPreviewProps> = ({
  item,
  remove,
  setCount,
}) => {
  const [selectedValue, setSelectedValue] = useState(item.count);

  const selectHandler: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setSelectedValue(() => {
      return +event.target.value;
    });
    setCount(item.id, +event.target.value);
    // if (item.id) {
    //   setCount(item.id, +event.target.value);
    // }
  };

  return (
    <div className=" flex space-x-4 py-10 items-start justify-between">
      <div className="flex space-x-6 items-start">
        <div className="w-20 h-auto shrink-0">
          <img
            className="w-full h-full object-contain"
            src={item.image}
            alt={item.title}
          />
        </div>
        <div className=" grow w-80 space-y-1">
          <div>
            <Link to={`/${item.id}`}>{item.title}</Link>
          </div>
          <div>{useFormatterPrice(item.price)}</div>
        </div>
      </div>

      <div className="w-20">
        <select
          id="counts"
          value={selectedValue}
          onChange={selectHandler}
          className="form-select block w-full hover:bg-gray-100 rounded-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        >
          {[...new Array(10)].map((_, index) => {
            return (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <button onClick={() => remove(item.id)} type="button">
          <HiX size={'20px'} color={'#6b7280'} />
        </button>
      </div>
    </div>
  );
};

export default CartProductPreview;
