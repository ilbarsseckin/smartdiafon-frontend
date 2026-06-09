/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,`n  output: 'standalone',
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8082',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://smartdiafon.com.tr',
  },
  async redirects() {
    return []
  },
}

module.exports = nextConfig