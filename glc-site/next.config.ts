import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/services/septic-utility-systems",
        destination: "/services/site-preparation-grading/",
        permanent: true,
      },
      {
        source: "/services/septic-utility-systems/",
        destination: "/services/site-preparation-grading/",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
    ],
  },
};

export default nextConfig;
