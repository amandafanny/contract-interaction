/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  customWorkerDir: "worker",
  // disable: process.env.NODE_ENV === 'development',
  // register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
});

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

module.exports = withPWA(nextConfig);
