import Navbar from '@/components/navbar/Navbar';

export default function Page() {
  return (
    <>
      <Navbar page="Home" />

      <div className="mt-10">
        <div className='mx-auto max-w-3xl py-10 px-4 sm:px-4 lg:max-w-7xl lg:px-8'>
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline text-gray-900 dark:text-white">High Quality</span>{' '}
              <span className="block text-indigo-600 xl:inline">PocketMine Plugins</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              We have a wide variety of plugins for PocketMine-MP, including Economy, PvP, and more!
            </p>

            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a href="/plugins" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                  Browse Plugins
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
