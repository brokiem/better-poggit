import Plugin from '../../../../types/Plugin';

async function getPlugin(name: string, version: string): Promise<Plugin | undefined> {
  const res = await fetch('https://raw.githubusercontent.com/brokiem/better-poggit/master/public/releases.json');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const plugins: Plugin[] = await res.json();

  return plugins.find(obj => obj.name === name && obj.version === version);
}

export default async function Head({ params, }: { params: { plugin: string, version: string }}) {
  const plugin = await getPlugin(params.plugin, params.version);

  return (
    <title>{plugin?.name + " v" + plugin?.version + " by " + plugin?.repo_name.split("/")[0] + " - BetterPoggit"}</title>
  );
}
