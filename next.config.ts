import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "raw.githubusercontent.com" }],
    qualities: [75, 100],
  },
}

export default nextConfig
