import Image from "next/image";
import type { Media } from "@/lib/types";

/** Image with explicit dimensions, or a quiet tinted block when no photography has been supplied yet. */
export function Photo({
  media,
  className = "",
  sizes,
  priority = false,
  tint = "#dde6ec",
  accent,
}: {
  media?: Media;
  className?: string;
  sizes: string;
  priority?: boolean;
  tint?: string;
  accent?: string;
}) {
  if (!media && accent)
    return (
      <div
        aria-hidden="true"
        className={className}
        style={{
          backgroundColor: `color-mix(in srgb, ${accent} 14%, #fff)`,
          backgroundImage: `repeating-linear-gradient(135deg, color-mix(in srgb, ${accent} 26%, transparent) 0 2px, transparent 2px 16px)`,
        }}
      />
    );
  if (!media) return <div aria-hidden="true" className={className} style={{ background: tint }} />;
  return (
    <Image
      src={media.src}
      alt={media.alt}
      width={media.width}
      height={media.height}
      sizes={sizes}
      priority={priority}
      className={`${className} object-cover`}
    />
  );
}
