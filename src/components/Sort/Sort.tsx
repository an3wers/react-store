import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ESortBy, setSort } from "../../store/slices/filtersSlice";
import { memo } from "react";

const Sort: React.FC = memo(() => {
  const sortBy: ESortBy[] = [ESortBy.default, ESortBy.asc, ESortBy.desc];
  const dispatch = useAppDispatch();
  const { selectedSort } = useAppSelector((state) => state.filters);

  const selectHandler: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const currentSort = event.target.value as ESortBy;
    // setSelectedSort(() => currentSort);
    dispatch(setSort(currentSort));
  };

  return (
    <div>
      <select
        value={selectedSort}
        onChange={selectHandler}
        className='form-select block w-full hover:bg-gray-100 rounded-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-300 focus:ring-opacity-50'
      >
        {sortBy.map((el, index) => {
          return (
            <option key={index} value={el}>
              {el}
            </option>
          );
        })}
      </select>
    </div>
  );
});

export default Sort;
