/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      '*.googleusercontent.com',
      'dawid-food-ordering.s3.amazonaws.com',
      'source.unsplash.com',
      'images.unsplash.com',
      'images.unsplash.com/',
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
