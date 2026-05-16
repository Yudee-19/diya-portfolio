import Image, { type StaticImageData } from "next/image";

interface PolaroidProps {
  /** Project photo. A neutral placeholder is shown when omitted. */
  photo?: StaticImageData;
  alt?: string;
  /** Paper-strip PNG used as the tilted label "tape". */
  strip: StaticImageData;
  /** Text printed on the paper strip. */
  label: string;
  /** Which top corner the strip sits on. */
  stripSide?: "left" | "right";
  /** Strip rotation in degrees. */
  stripRotation?: number;
  className?: string;
}

/**
 * A scrapbook-style polaroid card: a white photo frame with a tilted
 * paper-strip label tucked over its top edge.
 */
export function Polaroid({
  photo,
  alt = "",
  strip,
  label,
  stripSide = "left",
  stripRotation = -6,
  className = "",
}: PolaroidProps) {
  return (
    <div
      className={`relative bg-white p-2.5 pb-3 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.4)] ring-1 ring-black/5 ${className}`}
    >
      {/* Photo / placeholder */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e9e4db]">
        {photo ? (
          <Image
            src={photo}
            alt={alt}
            fill
            sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 30vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#efeae1] via-[#e7e0d3] to-[#d7cebd]" />
        )}
      </div>

      {/* Paper-strip label */}
      <div
        className={`absolute -top-3 z-20 ${
          stripSide === "left" ? "left-3 sm:left-5" : "right-3 sm:right-5"
        }`}
        style={{ transform: `rotate(${stripRotation}deg)` }}
      >
        <div className="relative w-32 sm:w-40">
          <Image src={strip} alt="" className="h-auto w-full select-none" />
          <span className="absolute inset-0 flex items-center justify-center px-4 text-center font-playfair text-[0.58rem] font-bold uppercase leading-tight tracking-[0.1em] text-[#2b2a27] sm:text-[0.7rem]">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
