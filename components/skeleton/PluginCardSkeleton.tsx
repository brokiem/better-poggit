export default function PluginCardSkeleton() {
  return (
    <>
      <div className="max-w-full bg-white rounded-lg shadow dark:bg-gray-800 slide-up">
        <div className="flex items-center justify-center w-full h-[10rem] bg-gray-300 rounded-lg dark:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>

        <div className="p-4">
          <div className="flex justify-between">
            <div className="w-[40%] h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
            <div className="w-1/4 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
          </div>

          <div className="mt-4">
            <div className="w-[50%] h-4 bg-gray-300 rounded dark:bg-gray-700 mb-4"></div>

            <div className="w-full h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
          </div>

          <div className="flex justify-between mt-4">
            <div className="w-1/2 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
            <div className="w-1/3 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    </>
  )
}
