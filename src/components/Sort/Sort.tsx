import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ESortBy, setSort } from "../../store/slices/filtersSlice";

const Sort: React.FC = () => {
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
      <select value={selectedSort} onChange={selectHandler}>
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
};

export default Sort;
