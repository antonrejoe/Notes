/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const jotaiConfig = {
  jsc: {
    experimental: {
      plugins: [["@swc-jotai/react-refresh", {}]],
    },
  },
};

const fsConfig = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
};

(module.exports = nextConfig), fsConfig, jotaiConfig;
