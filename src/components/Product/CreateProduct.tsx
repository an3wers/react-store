import { ChangeEvent, FormEvent, useState } from "react";
import { IProduct } from "../../types/types";
import axios from "axios";

interface CreateProductProps {
    onCreate: (product: IProduct) => void
}

const CreateProduct = ({onCreate}: CreateProductProps) => {
  const [productValues, setProductValues] = useState<IProduct>({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: {
      rate: 0,
      count: 0,
    },
  });

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const resp = await axios.post<IProduct>(
        "https://fakestoreapi.com/products",
        productValues
      );
      console.log("New product", resp);
      onCreate(resp.data)
    } catch (error) {
      console.log(error);
    }
  };

  // const changeInputValueHandler = (event: ChangeEvent<HTMLInputElement> ) => {
  //     setTitleValue(event.target.value)
  // }

  return (
    <form onSubmit={submitHandler} className="flex flex-col space-y-4">
      <input
        type="text"
        value={productValues.title}
        onChange={(e) =>
          setProductValues({ ...productValues, title: e.target.value })
        }
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Title"
      />
      <input
        type="number"
        value={productValues.price || ''}
        onChange={(e) =>
          setProductValues({ ...productValues, price: +e.target.value })
        }
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Price"
      />
      <input
        type="text"
        value={productValues.description}
        onChange={(e) =>
          setProductValues({ ...productValues, description: e.target.value })
        }
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Description"
      />
      <input
        type="text"
        value={productValues.category}
        onChange={(e) =>
          setProductValues({ ...productValues, category: e.target.value })
        }
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Category"
      />
      <input
        type="text"
        value={productValues.image}
        onChange={(e) =>
          setProductValues({ ...productValues, image: e.target.value })
        }
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Image"
      />
      <div className="flex space-x-4">
        <input
          type="number"
          value={productValues.rating.rate || ''}
          onChange={(e) =>
            setProductValues({
              ...productValues,
              rating: { ...productValues.rating, rate: +e.target.value },
            })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Rate"
        />
        <input
          type="number"
          value={productValues.rating.count || ''}
          onChange={(e) =>
            setProductValues({
              ...productValues,
              rating: { ...productValues.rating, count: +e.target.value },
            })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Count"
        />
      </div>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="submit"
      >
        Create product
      </button>
    </form>
  );
};

export default CreateProduct;
