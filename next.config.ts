import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "raw.githubusercontent.com" }],
    qualities: [75, 100],
  },
  typedRoutes: true,
}

export default nextConfig
