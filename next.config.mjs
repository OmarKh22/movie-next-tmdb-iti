/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TMDB_API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  },
  images: {
    domains: ["image.tmdb.org"],
  },
};

export default nextConfig;
