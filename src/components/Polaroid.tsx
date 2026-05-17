import Image, { type StaticImageData } from "next/image";

interface PolaroidProps {
  /** Project photo. A neutral placeholder is shown when omitted. */
  photo?: StaticImageData;
  alt?: string;
  /** Paper-strip PNG used as the tilted label "tape". Omit when using `caption`. */
  strip?: StaticImageData;
  /** Text printed on the paper strip. */
  label?: string;
  /** Which top corner the strip sits on. */
  stripSide?: "left" | "right";
  /** Strip rotation in degrees. */
  stripRotation?: number;
  /** Caption printed in the bottom white margin (classic polaroid style). */
  caption?: string;
  className?: string;
}

/**
 * A scrapbook-style polaroid card.
 *
 * Two label styles:
 *  - `strip` + `label` → a tilted paper-strip "tape" tucked over the top edge.
 *  - `caption`         → text printed in the bottom white margin.
 *
 * Hover (lift + shadow + glow) is wired through `group-hover`, so wrap the card
 * in an element with the `group` class (e.g. a `<Link className="group">`).
 */
export function Polaroid({
  photo,
  alt = "",
  strip,
  label,
  stripSide = "left",
  stripRotation = -6,
  caption,
  className = "",
}: PolaroidProps) {
  return (
    <div
      className={`relative bg-white p-2.5 ${caption ? "pb-2" : "pb-3"} shadow-[0_12px_30px_-12px_rgba(0,0,0,0.4)] ring-1 ring-black/5 transition-[transform,box-shadow] duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:shadow-[0_24px_50px_-12px_rgba(20,18,30,0.5),0_0_34px_-4px_rgba(20,18,30,0.28)] ${className}`}
    >
      {/* Photo / placeholder */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e9e4db]">
        {photo ? (
          <Image
            src={photo}
            alt={alt}
            fill
            sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 30vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#efeae1] via-[#e7e0d3] to-[#d7cebd]" />
        )}
      </div>

      {/* Caption — classic polaroid label in the bottom margin */}
      {caption && (
        <p className="px-2 pb-1 pt-3 text-center font-sans text-[0.62rem] font-medium uppercase leading-relaxed tracking-[0.22em] text-[#2b2a27]">
          {caption}
        </p>
      )}

      {/* Paper-strip label */}
      {strip && label && (
        <div
          className={`absolute -top-3 z-20 ${
            stripSide === "left" ? "left-3 sm:left-5" : "right-3 sm:right-5"
          }`}
          style={{ transform: `rotate(${stripRotation}deg)` }}
        >
          <div className="relative w-32 sm:w-40">
            <Image src={strip} alt="" className="h-auto w-full select-none" />
            <span className="absolute inset-0 flex items-center justify-center px-4 text-center font-playfair text-[0.58rem] font-bold uppercase leading-tight tracking-[0.1em] text-[#2b2a27] sm:text-[0.9rem]">
              {label}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
