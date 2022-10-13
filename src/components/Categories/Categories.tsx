import { useState } from 'react';

interface ICategoriesProps {
  categories: string[];
}

const Categories: React.FC<ICategoriesProps> = ({ categories }) => {
  const activeClasses = [
    'text-white bg-gray-800 border border-transparent hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2 cursor-pointer',
  ];
  const defaultClasses = [
    'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-5 py-2 cursor-pointer',
  ];

  const [activeTab, setActiveTab] = useState(0);

  // const cats: string[] = [
  //   'Все',
  //   'Зимние куртки',
  //   'Дождевики',
  //   'Джинсы',
  //   'Шорты',
  //   'Футболки',
  // ];

  return (
    <div>
      <ul className=" flex space-x-4">
        {categories.map((el, index) => {
          return (
            <li
              key={index}
              onClick={() => setActiveTab(index)}
              className={
                activeTab === index
                  ? activeClasses.join('')
                  : defaultClasses.join('')
              }
            >
              {el}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
