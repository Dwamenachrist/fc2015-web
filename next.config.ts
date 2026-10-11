import type { NextConfig } from "next";

// Content Security Policy (TDD §8). The page is statically prerendered, so
// nonces are not available; Next's inline bootstrap scripts need 'unsafe-inline'.
// Third parties: Cloudflare Turnstile (forms) and Vercel Analytics / Speed Insights.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""} https://challenges.cloudflare.com https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "frame-src https://challenges.cloudflare.com https://www.youtube-nocookie.com",
  "connect-src 'self' https://challenges.cloudflare.com https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "form-action 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Required since Next.js 16: the allowlist of quality values.
    qualities: [70, 80],
    localPatterns: [{ pathname: "/images/**" }, { pathname: "/brand/**" }, { pathname: "/partners/**" }],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
