/** @type {import('next').NextConfig} */

const path = require("path");
const nextConfig = {
  output: "standalone",
  // Webpack production configure with path alias
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "./"),
    };
    return config;
  },
};

module.exports = nextConfig;
