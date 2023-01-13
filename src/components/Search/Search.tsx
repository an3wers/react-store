import { useState, useCallback } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import debounce from "lodash.debounce";
import { setSearchValue, clearSearchValue } from "../../store/slices/filtersSlice";

interface ISearchProps {
  // value: string,
  // onSearch: (value:string) => void
}

const Search: React.FC<ISearchProps> = () => {
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
    setLocalValue(() => '')
    dispatch(clearSearchValue())
  }

  return (
    <div className=' relative'>
      <span className='absolute top-[12px] left-[8px]'>
        {localValue ? (
          <button onClick={clearValue}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-x'
              viewBox='0 0 16 16'
            >
              <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
            </svg>
          </button>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-search'
            viewBox='0 0 16 16'
          >
            <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
          </svg>
        )}
      </span>

      <input
        type='text'
        value={localValue}
        placeholder='Поиск...'
        onChange={searchHandler}
        className='border border-gray-300 text-gray-900 rounded-lg focus-within:ring-gray-200 focus-within:ring-4 focus:outline-0 block w-56 py-2 pl-10 pr-2'
      />
    </div>
  );
};

export default Search;
