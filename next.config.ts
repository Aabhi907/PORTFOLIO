import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vinext's local Worker runtime does not expose Next's image fetch bridge.
  // Assets are pre-sized and compressed in /public, so serve them directly.
  images: { unoptimized: true },
};

export default nextConfig;
