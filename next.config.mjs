/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // 75 is Next's default and fine for the colour photography. 92 is for the
    // heavily darkened grayscale heroes, whose near-flat skies band visibly
    // once the optimiser re-encodes them at 75.
    qualities: [75, 92],
  },
};

export default nextConfig;
