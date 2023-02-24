import Navbar from '@/components/navbar/Navbar';
import PluginCardSkeleton from '@/components/skeleton/PluginCardSkeleton';

export default function Loading() {
  return (
    <>
      <Navbar page="Releases"/>

      <div className='mx-auto max-w-3xl py-10 px-4 sm:px-4 lg:max-w-7xl lg:px-8'>
        <span className='sr-only'>Plugins</span>

        <div className="mb-6 w-[40%] h-4 bg-gray-300 rounded dark:bg-gray-700"></div>

        <div className='grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-4'>
          {
            Array(10).fill(0).map((_, index) => (
              <PluginCardSkeleton key={index}/>
            ))
          }
        </div>
      </div>
    </>
  )
}
