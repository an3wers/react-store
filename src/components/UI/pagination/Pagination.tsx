
interface IPagintaionProps {
  current: number
  onPage: (p: number) => void
  pageCount: number
}

const Pagintaion: React.FC<IPagintaionProps> = ({ current, onPage, pageCount }) => {

  const defaultClasses = ['text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-5 py-2']
  const activeClasses = ['text-white bg-gray-800 border border-transparent hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2']

  const handlePage = (p: number) => {
    onPage(p)
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex space-x-2">
        <li>
          <button disabled={current === 1} onClick={() => handlePage(current - 1)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-5 py-2 disabled:opacity-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </button>
        </li>

        {[...new Array(pageCount)].map((_, index) => {
          return (<li key={index}>
            <button onClick={() => handlePage(index + 1)} className={current === (index + 1) ? activeClasses.join('') : defaultClasses.join('')}>
              {index + 1}
            </button>
          </li>)
        })}


        {/* <li>
          <button className="text-white bg-gray-800 border border-transparent hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2">
            1
          </button>
        </li>
        <li>
          <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-5 py-2">
            2
          </button>
        </li> */}
        <li>
          <button disabled={pageCount === current} onClick={() => handlePage(current + 1)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-5 py-2 disabled:opacity-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagintaion;
