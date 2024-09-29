/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    middlewarePrefetch: "strict",
  },
};

module.exports = nextConfig;
