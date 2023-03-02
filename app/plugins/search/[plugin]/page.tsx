import Navbar from '@/components/navbar/Navbar';
import { PluginCard } from '@/components/card/PluginCard';
import Plugin from '../../../../types/Plugin';
import PocketMineRelease from '../../../../types/PocketMineRelease';
import { getPlugins, getPocketMineRelease } from '../../../../lib/data';

function isApiCompatibleWithRelease(plugin: Plugin, release: PocketMineRelease): boolean {
  const releaseMajor = parseInt(release.base_version.split('.')[0]);
  for (const api of plugin.api) {
    const apiMajor = parseInt(api.from.split('.')[0]);
    if (apiMajor === releaseMajor/* && parseFloat(api.from) <= parseFloat(release.base_version) && parseFloat(api.to) >= parseFloat(release.base_version)*/) {
      return true;
    }
  }
  return false;
}

async function sortPlugins(): Promise<Plugin[]> {
  const [plugins, pocketMineRelease]: [Plugin[], PocketMineRelease] = await Promise.all([
    getPlugins(),
    getPocketMineRelease()
  ]);

  const uniqueObjects: Record<string, Plugin> = {};

  // loop through the array and add each object to the uniqueObjects object,
  // overwriting duplicates based on the combination of the id and the name,
  // and keeping only the latest version
  plugins.forEach(obj => {
    // only show approved plugins
    if (obj.state_name.toLowerCase() !== 'approved') {
      return;
    }

    // only show plugins that are compatible with the latest PocketMine release
    if (!isApiCompatibleWithRelease(obj, pocketMineRelease)) {
      return;
    }

    const key: string = obj.name;

    if (!uniqueObjects[key]) {
      uniqueObjects[key] = obj;
    } else if (parseFloat(obj.version) > parseFloat(uniqueObjects[key].version)) {
      uniqueObjects[key] = obj;
    }
  });

  // create an array of the unique objects
  const array = Object.values(uniqueObjects);

  // sort the plugins by the last_state_change_date
  return array.sort((a, b) => b.last_state_change_date - a.last_state_change_date)
}

export default async function Page({ params }: { params: { plugin: string } }) {
  const latestPlugins = await sortPlugins();
  const searchedPlugins = latestPlugins.filter((plugin) => plugin.name.toLowerCase().includes(params.plugin.toLowerCase()));

  if (searchedPlugins.length <= 0) {
    return (
      <>
        <Navbar page="Releases" search={params.plugin} />

        <div className='mx-auto max-w-3xl py-10 px-4 sm:px-4 lg:max-w-7xl lg:px-8'>
          <span className='sr-only'>Plugins</span>

            <div className="flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold text-gray-700 dark:text-white">No plugins found</h1>
              <p className="text-gray-500 dark:text-gray-200">Try searching for something else</p>
            </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar page="Releases" search={params.plugin}/>

      <div className='mx-auto max-w-3xl pt-10 pb-16 px-4 sm:px-4 lg:max-w-7xl lg:px-8'>
        <h1 className="mb-6 text-md font-bold text-gray-900 dark:text-white">Displaying around {searchedPlugins.length} plugins for the search parameter '{params.plugin}'.</h1>
        <span className='sr-only'>Plugins</span>

        <div className='grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-4'>
          {searchedPlugins.map((plugin) => (
            <PluginCard plugin={plugin} key={plugin.id} />
          ))}
        </div>
      </div>
    </>
  );
}
