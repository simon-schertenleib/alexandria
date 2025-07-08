import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // add image domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "thumbs.dreamstime.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
