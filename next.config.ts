import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
  return [
    {
      source: '/.well-known/apple-app-site-association',
      headers: [{ key: 'Content-Type', value: 'application/json' }],
    },
    {
      source: '/.well-known/assetlinks.json',
      headers: [{ key: 'Content-Type', value: 'application/json' }],
    },
    {
      source: '/app/pay/:path*',
      headers: [
        { key: 'Cache-Control', value: 'private, no-store, max-age=0' },
        { key: 'Referrer-Policy', value: 'no-referrer' },
        { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
      ],
    },
    {
      source: '/pay/:path*',
      headers: [
        { key: 'Cache-Control', value: 'private, no-store, max-age=0' },
        { key: 'Referrer-Policy', value: 'no-referrer' },
        { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
      ],
    },
  ];
},

};

export default nextConfig;
