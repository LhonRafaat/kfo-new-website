/**
 * A texture layer that sits above a section's base colour and below its content,
 * mirroring how the Figma composites grunge/paper/floral images at set opacities.
 */
export function TextureOverlay({
  src,
  opacity,
  blend,
  className = "",
}: {
  src: string;
  opacity: number;
  blend?: "multiply" | "overlay" | "soft-light" | "normal";
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url(${src})`, opacity, mixBlendMode: blend }}
    />
  );
}
