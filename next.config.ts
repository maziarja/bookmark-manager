import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "t1.gstatic.com",
      },
    ],
  },
};

export default nextConfig;
