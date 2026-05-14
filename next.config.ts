import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "moleculeventures.com" },
    ],
  },
};

export default nextConfig;
