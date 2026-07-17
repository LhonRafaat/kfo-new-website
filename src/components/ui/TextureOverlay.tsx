/**
 * A texture layer that sits above a section's base colour and below its content,
 * mirroring how the Figma composites grunge/paper/floral images at set opacities.
 * `stretch` fills the box exactly (like Figma's STRETCH scale mode) so folds/creases
 * land at the same relative position; otherwise the image is cover-fitted.
 */
export function TextureOverlay({
  src,
  opacity,
  blend,
  stretch = false,
  flipX = false,
  className = "",
}: {
  src: string;
  opacity: number;
  blend?: "multiply" | "overlay" | "soft-light" | "color-burn" | "darken" | "normal";
  stretch?: boolean;
  flipX?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: stretch ? "100% 100%" : "cover",
        backgroundPosition: "center",
        opacity,
        mixBlendMode: blend,
        transform: flipX ? "scaleX(-1)" : undefined,
      }}
    />
  );
}
