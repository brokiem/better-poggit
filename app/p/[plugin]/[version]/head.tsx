import Plugin from '../../../../types/Plugin';
import { getPlugins } from '../../../../lib/data';

async function getPlugin(name: string, version: string): Promise<Plugin | undefined> {
  const plugins: Plugin[] = await getPlugins();

  return plugins.find(obj => obj.name === name && obj.version === version);
}

export default async function Head({ params, }: { params: { plugin: string, version: string }}) {
  const plugin = await getPlugin(params.plugin, params.version);

  return (
    <>
      <title>{plugin?.name + " v" + plugin?.version + " by " + plugin?.repo_name.split("/")[0] + " - BetterPoggit"}</title>

      <meta name="title" content={plugin?.name + " v" + plugin?.version + " by " + plugin?.repo_name.split("/")[0] + " - BetterPoggit"} />
      <meta name="description" content={plugin?.tagline} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://better-poggit.hop.sh/" />
      <meta property="og:title" content={plugin?.name + " v" + plugin?.version + " by " + plugin?.repo_name.split("/")[0] + " - BetterPoggit"} />
      <meta property="og:description" content={plugin?.tagline} />
      <meta property="og:image" content={plugin?.icon_url} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://better-poggit.hop.sh/" />
      <meta property="twitter:title" content={plugin?.name + " v" + plugin?.version + " by " + plugin?.repo_name.split("/")[0] + " - BetterPoggit"} />
      <meta property="twitter:description" content={plugin?.tagline} />
      <meta property="twitter:image" content={plugin?.icon_url} />
    </>
  );
}
