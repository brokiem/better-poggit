/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  experimental: {
    // Required:
    appDir: true,
  },
  images: {
    domains: ['raw.githubusercontent.com', 'github.com'],
  },
  async rewrites() {
    return [
      {
        source: '/download/:id*',
        destination: 'https://poggit.pmmp.io/r/:id*',
      }
    ]
  }
};

module.exports = nextConfig;
