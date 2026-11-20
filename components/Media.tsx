import Image from "next/image";
import type { Media } from "@/lib/types";

/** Image with explicit dimensions, or a quiet tinted block when no photography has been supplied yet. */
export function Photo({
  media,
  className = "",
  sizes,
  priority = false,
  tint = "#dde6ec",
}: {
  media?: Media;
  className?: string;
  sizes: string;
  priority?: boolean;
  tint?: string;
}) {
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
