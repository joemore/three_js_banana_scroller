/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const nextConfig = {
  reactStrictMode: true,
  
  // The following allows our site map to be generated at build time
  webpack: (config, { isServer }) => {
    return config;
  },

}

module.exports = nextConfig


// Need to expose the three library to webpack to get Realtime3D/Scene4 to work
const withTM = require("next-transpile-modules")(["three"]);
module.exports = withTM(nextConfig);