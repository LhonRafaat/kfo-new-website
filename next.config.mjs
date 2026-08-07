/** @type {import('next').NextConfig} */

// Every photo now comes from the Strapi media library, so its host has to be
// allowed for `next/image`. Defaults to the local backend; set
// NEXT_PUBLIC_STRAPI_URL to point at a deployed one.
const strapi = new URL(
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337",
);

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // 75 is Next's default and fine for the colour photography. 92 is for the
    // heavily darkened grayscale heroes, whose near-flat skies band visibly
    // once the optimiser re-encodes them at 75.
    qualities: [75, 92],
    remotePatterns: [
      {
        protocol: strapi.protocol.replace(":", ""),
        hostname: strapi.hostname,
        ...(strapi.port ? { port: strapi.port } : {}),
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
