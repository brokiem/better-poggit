import Navbar from '@/components/navbar/Navbar';
import { PluginCard } from '@/components/card/PluginCard';
import Plugin from '../../types/Plugin';
import PocketMineRelease from '../../types/PocketMineRelease';
import Pagination from '@/components/pagination/Pagination';

async function getPlugins() {
  const res = await fetch('https://raw.githubusercontent.com/brokiem/better-poggit/master/public/releases.json', { next: { revalidate: 300 } });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

async function getPocketMineRelease() {
  const res = await fetch('https://update.pmmp.io/api', { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

function isApiCompatibleWithRelease(plugin: Plugin, release: PocketMineRelease): boolean {
  const releaseMajor = parseInt(release.base_version.split('.')[0]);
  for (const api of plugin.api) {
    const apiMajor = parseInt(api.from.split('.')[0]);
    if (apiMajor === releaseMajor && parseFloat(api.from) <= parseFloat(release.base_version) && parseFloat(api.to) >= parseFloat(release.base_version)) {
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

export default async function Page() {
  const latestPlugins = await sortPlugins();

  const itemsPerPage = 10;
  const startIndex = 0;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = latestPlugins.slice(startIndex, endIndex);

  return (
    <>
      <Navbar page="Releases"/>

      <div className='mx-auto max-w-3xl pt-10 pb-16 px-4 sm:px-4 lg:max-w-7xl lg:px-8'>
        <span className='sr-only'>Plugins</span>

        <div className='grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-4'>
          {itemsToShow.map((plugin) => (
            <PluginCard plugin={plugin} key={plugin.id} />
          ))}
        </div>

        <Pagination plugins={latestPlugins} currentPage="1" />
      </div>
    </>
  );
}
