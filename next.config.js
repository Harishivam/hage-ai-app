/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Disable font optimization to prevent AbortError
  optimizeFonts: false,
};

module.exports = nextConfig;
