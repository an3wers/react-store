import { useState, useCallback } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import debounce from "lodash.debounce";
import {
  setSearchValue,
  clearSearchValue,
} from "../../store/slices/filtersSlice";
import { memo } from "react";
import { HiX, HiSearch } from "react-icons/hi";

interface ISearchProps {
  // value: string,
  // onSearch: (value:string) => void
}

const Search: React.FC<ISearchProps> = memo(() => {
  const [localValue, setLocalValue] = useState("");

  const dispatch = useAppDispatch();

  const updateSearchValue = useCallback(
    debounce((value: string) => {
      dispatch(setSearchValue(value));
    }, 500),
    []
  );

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(() => event.target.value);
    updateSearchValue(event.target.value);
  };

  const clearValue = () => {
    setLocalValue(() => "");
    dispatch(clearSearchValue());
  };

  return (
    <div className='relative'>
      <span className='absolute top-[11px] left-[8px]'>
        {localValue ? (
          <button onClick={clearValue}>
            <HiX size={"20px"} color={'#6b7280'} />
          </button>
        ) : (
          <HiSearch size={"20px"} color={'#6b7280'} />
        )}
      </span>

      <input
        type='text'
        value={localValue}
        placeholder='Поиск...'
        onChange={searchHandler}
        className='form-input pl-8 block w-full hover:bg-gray-100 rounded-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-300 focus:ring-opacity-50'
      />
    </div>
  );
});

export default Search;
