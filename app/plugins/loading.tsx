import Navbar from '@/components/navbar/Navbar';
import PluginCardSkeleton from '@/components/skeleton/PluginCardSkeleton';

export default function Loading() {
  return (
    <>
      <Navbar page="Releases"/>

      <div className='mx-auto max-w-3xl pt-10 pb-16 px-4 sm:px-4 lg:max-w-7xl lg:px-8'>
        <span className='sr-only'>Plugins</span>

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
