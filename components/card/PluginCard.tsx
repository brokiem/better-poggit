"use client";

import Plugin from '../../types/Plugin';
import { useEffect, useState } from 'react';
import Image from 'next/image';

function abbreviateNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

export function PluginCard({ plugin }: { plugin: Plugin }) {
  const [isMounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <a href={"/p/" + plugin.name + "/" + plugin.version}>
      <div className="max-w-full bg-white rounded-lg shadow dark:bg-gray-800">
        {
          plugin.icon_url !== null && imageLoaded ?
          <Image
            className="rounded-t-lg bg-white dark:bg-gray-700 w-full h-[10rem] object-cover"
            src={plugin.icon_url}
            width={512}
            height={512}
            alt={plugin.name}
            loading="lazy"
            quality={95}
            onError={() => {
              setImageLoaded(false);
            }}
          />
            :
          <div className="rounded-t-lg bg-white dark:bg-gray-700 w-full h-[10rem]">
            <div className="flex items-center justify-center w-full h-[10rem] bg-gray-300 rounded-lg dark:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
          </div>
        }

        <div className="p-4">
          <div className="flex justify-between">
            <h5 className="text-md tracking-tight text-gray-900 dark:text-white truncate">
              {plugin.name}
            </h5>
            <h5 className="text-md tracking-tight text-gray-500 dark:text-gray-400 truncate">
              v{plugin.version}
            </h5>
          </div>
          <div className="mb-1">
            {isMounted ?
              <span className="text-sm text-gray-500 dark:text-gray-400 truncate">by <a href={"https://github.com/" + plugin.repo_name.split("/")[0]} className="text-blue-500 dark:text-blue-400 inline hover:underline">{plugin.repo_name.split("/")[0]}</a></span>
              :
              <span className="text-sm text-gray-500 dark:text-gray-400 truncate">by <span className="text-blue-500 dark:text-blue-400 inline">{plugin.repo_name.split("/")[0]}</span></span>
            }
          </div>
          <p className="mb-4 font-normal truncate text-gray-700 dark:text-gray-400">{plugin.tagline}</p>

          <div className="flex justify-between gap-2">
            { isMounted ?
              <div className="flex items-center">
                <a href={"/download/" + plugin.artifact_url.match(/\d+$/)?.[0]} className="px-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Download
                </a>
              </div>
              :
              <div className="flex items-center">
                <span className="px-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Download
                </span>
              </div>
            }

            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-900 dark:text-white">
                <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
              </svg>
              <span className="ml-1 text-sm text-gray-500 dark:text-gray-400 mr-2">{abbreviateNumber(plugin.downloads)}</span>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-900 dark:text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">{plugin.score ? plugin.score : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}
