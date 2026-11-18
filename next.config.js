/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Default is 60s, which re-transforms (and re-writes) the same image over and over.
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "image.mux.com",
      },
    ],
  },
};

module.exports = nextConfig;
