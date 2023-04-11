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

const corsConfig = {
  async rewrites() {
    return [
      {
        source: "https://ms-1b476e5207e5-3106.sfo.meilisearch.io",
        destination: "https://localhost:3000/*",
      },
    ];
  },
};
(module.exports = nextConfig), fsConfig, jotaiConfig, corsConfig;
