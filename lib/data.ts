import "server-only";

import Plugin from '../types/Plugin';

const POGGIT_API_URL = process.env.POGGIT_API_URL; // https://poggit.pmmp.io/releases.min.json

if (!POGGIT_API_URL) {
  throw new Error('POGGIT_API_URL env is not defined');
}

export async function getPlugins() {
  // @ts-ignore
  const res = await fetch(POGGIT_API_URL, { next: { revalidate: 1600 } });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getPocketMineRelease() {
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
