import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote"],
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
