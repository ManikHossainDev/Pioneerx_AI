/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
  // Frontend host (sobhoy) proxies API → local Nest so Google OAuth + fetch stay same-origin.
  async rewrites() {
    const backend =
      process.env.BACKEND_PROXY_URL || "http://127.0.0.1:8010";
    return [
      {
        source: "/api/v1/:path*",
        destination: `${backend.replace(/\/$/, "")}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
