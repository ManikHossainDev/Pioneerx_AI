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
  // Optional: same-origin /api/v1 → Nest (set BACKEND_PROXY_URL when using rewrites).
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
