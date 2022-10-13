import { useState } from 'react';

const Sort = () => {
  const sortBy = [
    'по умолчанию',
    'цена по убыванию',
    'цена по возрастанию',
    'по алфавиту',
  ];

  const [selectedSort, setSelectedSort] = useState('по умолчанию');

  const selectHandler: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setSelectedSort(event.target.value);
  };

  return (
    <div>
      <select value={selectedSort} onChange={selectHandler}>
        {sortBy.map((el, index) => {
          return (
            <option key={index} value={index}>
              {el}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Sort;
