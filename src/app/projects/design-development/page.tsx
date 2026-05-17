import { pageMetadata } from "@/lib/metadata";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ScrapbookItem } from "@/components/ScrapbookAnimation";
import { Polaroid } from "@/components/Polaroid";
import starIcon from "@/assets/star.svg";
import star2Icon from "@/assets/star-2.svg";
import wriggle from "@/assets/wriggle.svg";
import graduationProjectPhoto from "@/assets/design-development/graduation-project.png";
import textileStudyPhoto from "@/assets/design-development/textile-study.png";
import brandStudyPhoto from "@/assets/design-development/brand-study.png";
import kidsWearPhoto from "@/assets/design-development/kids-wear.png";
import printDevelopmentPhoto from "@/assets/design-development/print-development.png";
import drappingPhoto from "@/assets/design-development/drapping.png";

type Direction = "top" | "bottom" | "left" | "right";

interface TopicCard {
  slug: string;
  title: string;
  /** Card photo. */
  photo: StaticImageData;
  /** Scrapbook entrance direction. */
  direction: Direction;
  /** Resting tilt of the card, in degrees. */
  rotation: number;
  /** Entrance stagger. */
  delay: number;
}

const cards: TopicCard[] = [
  { slug: "graduation-project", title: "Graduation Project", photo: graduationProjectPhoto, direction: "top", rotation: -2, delay: 0.05 },
  { slug: "textile-study", title: "Textile Study", photo: textileStudyPhoto, direction: "top", rotation: 1.5, delay: 0.15 },
  { slug: "brand-study", title: "Brand Study", photo: brandStudyPhoto, direction: "top", rotation: -1.5, delay: 0.25 },
  { slug: "kids-wear", title: "Kids Wear", photo: kidsWearPhoto, direction: "bottom", rotation: 2, delay: 0.3 },
  { slug: "print-development", title: "Print Development", photo: printDevelopmentPhoto, direction: "bottom", rotation: -2, delay: 0.4 },
  { slug: "drapping", title: "Drapping", photo: drappingPhoto, direction: "bottom", rotation: 1.5, delay: 0.5 },
];

export const metadata = pageMetadata(
  "Design Development",
  "Design development work by Kasturi Pal — graduation project, textile and brand studies, kids wear, print development and draping.",
);

export default function DesignDevelopmentPage() {
  return (
    <main className="relative bg-white px-6 py-8 text-black sm:px-10 md:flex md:h-[100svh] md:flex-col md:overflow-hidden md:py-6 lg:px-16 lg:py-8">
      {/* Back link */}
      <Link
        href="/#key-projects"
        className="shrink-0 font-sans text-sm tracking-wide text-gray-500 transition-colors hover:text-black"
      >
        ← Back to projects
      </Link>

      {/* Heading */}
      <div className="mt-5 flex shrink-0 items-start gap-1 lg:mt-3">
        <ScrapbookItem
          direction="left"
          travelDistance={40}
          tiltSteps={3}
          duration={0.6}
          delay={0.05}
        >
          <h1 className="font-playfair text-[clamp(2rem,5vw,4.25rem)] font-bold uppercase leading-none tracking-tight text-[#222220]">
            Design Development
          </h1>
        </ScrapbookItem>
        <Image
          src={starIcon}
          alt=""
          unoptimized
          className="mt-1 h-auto w-5 shrink-0 sm:w-7"
        />
      </div>

      {/* Sub-topic cards — 3 × 2 scrapbook grid. From md up the section fills
          the viewport with no scroll, the grid centred in the leftover space. */}
      <div className="mt-8 flex justify-center md:mt-0 md:min-h-0 md:flex-1 md:items-center">
        <div className="relative grid w-full max-w-[1100px] grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 md:gap-x-6 md:gap-y-6 lg:gap-x-10 lg:gap-y-8">
          {cards.map((c) => (
            <div key={c.slug} className="flex justify-center">
              <ScrapbookItem
                className="w-full max-w-[320px] md:max-w-[13.5rem] lg:max-w-[16rem] xl:max-w-[17rem]"
                direction={c.direction}
                travelDistance={50}
                tiltSteps={4}
                duration={0.7}
                delay={c.delay}
                maxAngle={12}
                finalRotation={c.rotation}
              >
                <Link
                  href={`/projects/design-development/${c.slug}`}
                  className="group block w-full cursor-pointer"
                  aria-label={c.title}
                >
                  <Polaroid
                    className="w-full"
                    photo={c.photo}
                    alt={c.title}
                    caption={c.title}
                  />
                </Link>
              </ScrapbookItem>
            </div>
          ))}

          {/* Decorative scrapbook accents (desktop) */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <Image src={star2Icon} alt="" unoptimized className="absolute left-[32%] top-[-4%] h-auto w-6" />
            <Image src={wriggle} alt="" unoptimized className="absolute right-[31%] top-[-1%] h-auto w-14 rotate-6 opacity-80" />
            <Image src={starIcon} alt="" unoptimized className="absolute left-[27%] top-[45%] h-auto w-7" />
            <Image src={starIcon} alt="" unoptimized className="absolute right-[29%] top-[43%] h-auto w-7" />
            <Image src={wriggle} alt="" unoptimized className="absolute left-[31%] bottom-[-4%] h-auto w-14 -rotate-6 opacity-80" />
            <Image src={star2Icon} alt="" unoptimized className="absolute right-[1%] top-[40%] h-auto w-6" />
          </div>
        </div>
      </div>
    </main>
  );
}
