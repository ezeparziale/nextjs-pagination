/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "raw.githubusercontent.com" }],
  },
}

module.exports = nextConfig
