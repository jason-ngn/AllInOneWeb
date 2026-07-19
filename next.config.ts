import type { NextConfig } from "next";

const apiBase = process.env.GRADESCOPE_API_URL ?? "http://localhost:8000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/gradescope/:path*",
        destination: `${apiBase}/api/gradescope/:path*`,
      },
    ];
  },
};

export default nextConfig;
