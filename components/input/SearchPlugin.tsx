"use client";

import { useState } from 'react';

export default function SearchPlugin({search}: {search?: string}) {
  const [searchValue, setSearch] = useState(search);

  function handleFormSubmit(e: any) {
    e.preventDefault();
    window.location.href = "/plugins/search/" + searchValue;
  }

  return (
    <div>
      <div className="rounded-md">
        <div className="relative w-full">
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="search-plugin"
              id="search"
              className="block w-full rounded-md border-gray-300 pl-3 pr-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-700 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
              placeholder="Search plugins..."
              value={searchValue}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="absolute top-0 right-0 px-3 py-2.5 sm:py-2 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-0 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
          </form>
        </div>
      </div>
    </div>
  )
}
