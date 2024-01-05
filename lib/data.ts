import "server-only";

import Plugin from '../types/Plugin';
import PocketMineRelease from '../types/PocketMineRelease';

const POGGIT_API_URL = process.env.POGGIT_API_URL; // https://poggit.pmmp.io/releases.min.json

if (!POGGIT_API_URL) {
  throw new Error('POGGIT_API_URL env is not defined');
}

export async function getPlugins(): Promise<Plugin[]> {
  // @ts-ignore
  const res = await fetch(POGGIT_API_URL, { next: { revalidate: 3200 } });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getPlugin(name: string, version: string|null = null): Promise<Plugin[]> {
  // @ts-ignore
  const url = version ? `${POGGIT_API_URL}?name=${name}&version=${version}` : `${POGGIT_API_URL}?name=${name}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getPocketMineRelease(): Promise<PocketMineRelease> {
  const res = await fetch('https://update.pmmp.io/api', { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getReadmeContents(plugin: Plugin): Promise<string | null> {
  const res = await fetch(`https://raw.githubusercontent.com/${plugin.repo_name}/${plugin.build_commit}/README.md`);

  if (!res.ok) {
    return null;
  }

  return res.text();
}
