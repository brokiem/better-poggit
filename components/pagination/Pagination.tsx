import Plugin from '../../types/Plugin';

export default function Pagination({ plugins, currentPage }: { plugins: Plugin[], currentPage: string }) {
  const currentPageNum = parseInt(currentPage);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(plugins.length / itemsPerPage);

  const maxButtonsToShow = 4;
  let startPage = currentPageNum - Math.floor(maxButtonsToShow / 2);
  let endPage = startPage + maxButtonsToShow - 1;

  if (startPage < 1) {
    startPage = 1;
    endPage = maxButtonsToShow;
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = endPage - maxButtonsToShow + 1;
    if (startPage < 1) {
      startPage = 1;
    }
  }

  let isMaxPageButtonShown = false;
  const pageButtons = [];
  for (let i = startPage; i <= endPage; i++) {
    if (i === totalPages) {
      isMaxPageButtonShown = true;
    }

    if (i === currentPageNum) {
      pageButtons.push(
        <a href={"/plugins/page/" + i} className="flex items-center z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
          {i}
        </a>
      );
    } else {
      pageButtons.push(
        <li>
          <a href={"/plugins/page/" + i} className="flex items-center px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {i}
          </a>
        </li>
      );
    }
  }

  if (!isMaxPageButtonShown) {
    pageButtons.push(
      <li>
        <p
          className="flex items-center px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          ...
        </p>
      </li>
    );

    pageButtons.push(
      <li>
        <a href={"/plugins/page/" + totalPages}
           className="flex items-center px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          {totalPages}
        </a>
      </li>
    );
  }

  return (
    <>
      <nav aria-label="Page navigation example" className="flex items-center justify-center mt-10">
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <a href={"/plugins/page/" + (currentPageNum <= 1 ? 1 : currentPageNum - 1)} className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Previous</span>
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </a>
          </li>
          {pageButtons}
          <li>
            <a href={"/plugins/page/" + (currentPageNum >= totalPages ? totalPages : currentPageNum + 1)} className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Next</span>
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}
