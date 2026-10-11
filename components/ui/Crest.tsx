import Image from "next/image";

/** The club crest (transparent cutout made in ticket T1b, SITE_BLUEPRINT §4.7). */
export function Crest({
  height,
  className,
  eager = false,
  decorative = false,
}: {
  height: number;
  className?: string;
  eager?: boolean;
  decorative?: boolean;
}) {
  // Source is 400×501.
  const width = Math.round((height * 400) / 501);
  return (
    <Image
      src="/brand/crest.png"
      width={width}
      height={height}
      alt={decorative ? "" : "FC 2015 crest"}
      className={className}
      quality={80}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
    />
  );
}
