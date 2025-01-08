/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async redirects() {
    return [
      {
        source: "/cards",
        destination: "/",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "caas-cdn-preview.cloud.capitalone.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.cloud.capitalone.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "app-ocstlatests0h1a0t001.cms.optimizely.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
