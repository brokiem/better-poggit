import Navbar from '@/components/navbar/Navbar';
import Plugin from '../../../../types/Plugin';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import '../../../../styles/github-markdown.css'
import Image from 'next/image';

async function getPlugin(name: string, version: string): Promise<Plugin | undefined> {
  const res = await fetch('https://raw.githubusercontent.com/brokiem/better-poggit/master/public/releases.json', { next: { revalidate: 300 } });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const plugins: Plugin[] = await res.json();

  return plugins.find(obj => obj.name === name && obj.version === version);
}

async function getReadmeContents(plugin: Plugin): Promise<string> {
  const res = await fetch(`https://raw.githubusercontent.com/${plugin.repo_name}/${plugin.build_commit}/README.md`);

  if (!res.ok) {
    return "";
  }

  return res.text();
}

async function renderMarkdown(markdown: string): Promise<JSX.Element> {
  return <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} />;
}

export default async function Page({ params }: { params: { plugin: string, version: string } }) {
  const plugin = await getPlugin(params.plugin, params.version);

  if (!plugin) {
    return <h1>Plugin not found</h1>;
  }

  return (
    <>
      <Navbar />

      <div className="mt-10">
        {/* Product info */}
        <div className="mx-auto px-4 mb-16 sm:px-6 lg:px-8 lg:mb-24 lg:max-w-7xl">
          <div className="flex flex-row gap-x-6">
            { plugin.icon_url &&
              <img className="h-24 w-24 object-cover rounded-md bg-gray-700" src={plugin.icon_url} alt="" />
            }

            <div>
              <div className="mb-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">{plugin.name}</h1>
              </div>

              {/* Description and details */}
              <div>
                <div className="space-y-2">
                  <div className="hidden lg:block">
                    <div className="flex flex-wrap divide-x divide-slate-400/50">
                      <p className="text-base text-gray-900 dark:text-white pr-2">by <a href={"https://github.com/" + plugin.repo_name.split("/")[0]} target="_blank" className="text-blue-500 dark:text-blue-400 inline hover:underline">{plugin.repo_name.split("/")[0]}</a></p>
                      <p className="text-base text-gray-900 dark:text-white px-2">Version: {plugin.version}</p>
                      <p className="text-base text-gray-900 dark:text-white px-2">Updated: {(new Date(plugin.submission_date * 1000)).toLocaleDateString()}</p>
                      <p className="text-base text-gray-900 dark:text-white pl-2">Downloads: {plugin.downloads.toLocaleString()}</p>
                    </div>
                  </div>

                  <p className="text-base text-gray-900 dark:text-white">{plugin.tagline}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex flex-col-reverse lg:flex-row lg:gap-x-6 gap-y-4">
              <div className="w-full rounded-md !bg-white dark:!bg-gray-800 p-5 overflow-auto">
                  <span className="markdown-body">
                    {await getReadmeContents(plugin).then(renderMarkdown)}
                  </span>
              </div>

              <div className="flex flex-col lg:gap-x-6 gap-y-4 w-full lg:max-w-sm">
                <div className="rounded-md !bg-white dark:!bg-gray-800 p-5">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-3 leading-none">Actions</h2>

                  <a href={"/download/" + plugin.artifact_url.match(/\d+$/)?.[0]} type="button" className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Download
                  </a>

                  <a href={"https://github.com/" + plugin.repo_name + "/tree/" + plugin.build_commit} type="button" target="_blank" className="mt-2 flex w-full items-center justify-center bg-transparent text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 font-semibold py-2 px-4 border border-gray-500 hover:border-gray-400 rounded-md">
                    Source
                  </a>
                </div>

                <div className="rounded-md !bg-white dark:!bg-gray-800 p-5">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-3 leading-none">Details</h2>

                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200 leading-none mb-2">Version: <span className="font-normal text-gray-600 dark:text-gray-300">{plugin.version}</span></p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200 leading-none mb-2">Downloads: <span className="font-normal text-gray-600 dark:text-gray-300">{plugin.downloads.toLocaleString()}</span></p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200 leading-none mb-4">Updated: <span className="font-normal text-gray-600 dark:text-gray-300">{(new Date(plugin.submission_date * 1000)).toLocaleDateString()}</span></p>

                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200 leading-none mb-2">Supported API versions: <span className="font-normal text-gray-600 dark:text-gray-300">{plugin.api[0].from} to {plugin.api[0].to}</span></p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200 leading-none mb-2">Categories: <span className="font-normal text-gray-600 dark:text-gray-300">{plugin.categories.map((category) => category.category_name).join(", ")}</span></p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200 leading-none">License: <span className="font-normal text-gray-600 dark:text-gray-300">{plugin.license.toUpperCase()}</span></p>
                  {/*{ plugin.keywords.length > 0 &&*/}
                  {/*  <p className="text-sm font-medium text-gray-900 dark:text-gray-200 leading-none mb-2">Keywords: <span className="font-normal text-gray-600 dark:text-gray-300">{plugin.keywords.join(", ")}</span></p>*/}
                  {/*}*/}
                </div>

                <div className="rounded-md !bg-white dark:!bg-gray-800 p-5">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-3 leading-none">Producers</h2>

                  <div className="flex flex-col gap-y-2">
                    {
                      Object.keys(plugin.producers).map(key => (
                        <div key={key} className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 leading-none mb-2">{key}</h3>
                          <div className="flex flex-col gap-y-2 border border-gray-600 p-2 rounded-md">
                            {
                              // @ts-ignore
                              plugin.producers[key].map((producer: string) => (
                                <a href={"https://github.com/" + producer} target="_blank" className="flex flex-row items-center text-sm font-medium text-gray-900 dark:text-gray-200 leading-none hover:underline" key={producer}>
                                  <Image
                                    src={"https://github.com/" + producer + ".png"}
                                    height={32}
                                    width={32}
                                    loading="lazy"
                                    className="h-5 w-5 inline-block rounded-full mr-2"
                                    alt=""
                                  />
                                  {producer}
                                </a>
                              ))
                            }
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
