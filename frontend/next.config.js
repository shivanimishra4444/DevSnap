/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
