
interface ISearchProps {
    value: string,
    onSearch: (value:string) => void
}

const Search:React.FC<ISearchProps> = ({value, onSearch}) => {

    return (
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
              value={value}
              placeholder="Поиск..."
              onChange={(e) => onSearch(e.target.value)}
              className="border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-56 py-2 pl-10 pr-2"
            />
          </div>
    )
}

export default Search