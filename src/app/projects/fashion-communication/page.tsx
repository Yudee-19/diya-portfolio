import { pageMetadata } from "@/lib/metadata";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ScrapbookItem } from "@/components/ScrapbookAnimation";
import { Polaroid } from "@/components/Polaroid";
import starIcon from "@/assets/star.svg";
import star2Icon from "@/assets/star-2.svg";
import wriggle from "@/assets/wriggle.svg";
import fashionMarketingPhoto from "@/assets/fashion-communication/fashion-marketing.png";
import fashionForecastingPhoto from "@/assets/fashion-communication/fashion-forecasting.png";
import newMediaPhoto from "@/assets/fashion-communication/new-media.png";
import fashionManagementPhoto from "@/assets/fashion-communication/fashion-management.png";

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
  /** lg-only absolute placement classes (the scattered scrapbook layout). */
  position: string;
}

const cards: TopicCard[] = [
  { slug: "fashion-marketing", title: "Fashion Marketing", photo: fashionMarketingPhoto, direction: "left", rotation: -3, delay: 0.1, position: "lg:left-[3%] lg:top-[4%]" },
  { slug: "fashion-forecasting", title: "Fashion Forecasting", photo: fashionForecastingPhoto, direction: "top", rotation: 2, delay: 0.2, position: "lg:left-[52%] lg:top-[4%]" },
  { slug: "new-media", title: "New Media", photo: newMediaPhoto, direction: "bottom", rotation: -2, delay: 0.3, position: "lg:left-[27%] lg:top-[47%]" },
  { slug: "fashion-management", title: "Fashion Management", photo: fashionManagementPhoto, direction: "right", rotation: 3, delay: 0.4, position: "lg:left-[74%] lg:top-[50%]" },
];

export const metadata = pageMetadata(
  "Fashion Communication",
  "Fashion communication projects by Kasturi Pal — fashion marketing, forecasting, new media and management.",
);

export default function FashionCommunicationPage() {
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
          <h1 className="font-playfair text-[clamp(2rem,5.2vw,4.5rem)] font-bold uppercase leading-none tracking-tight text-[#222220]">
            Fashion Communication
          </h1>
        </ScrapbookItem>
        <Image
          src={starIcon}
          alt=""
          unoptimized
          className="mt-1 h-auto w-5 shrink-0 sm:w-7"
        />
      </div>

      {/* Sub-topic cards — scattered scrapbook scatter on lg, a centred grid
          below it. From md up the section fills the viewport with no scroll. */}
      <div className="relative mx-auto mt-8 grid w-full max-w-[1200px] grid-cols-1 gap-10 sm:grid-cols-2 md:mt-0 md:min-h-0 md:flex-1 md:content-center md:gap-6 lg:block lg:gap-0">
        {cards.map((c) => (
          <ScrapbookItem
            key={c.slug}
            className={`mx-auto w-full max-w-[300px] sm:max-w-[15rem] lg:absolute lg:w-[20%] lg:max-w-none ${c.position}`}
            direction={c.direction}
            travelDistance={55}
            tiltSteps={4}
            duration={0.7}
            delay={c.delay}
            maxAngle={12}
            finalRotation={c.rotation}
          >
            <Link
              href={`/projects/fashion-communication/${c.slug}`}
              className="group block cursor-pointer"
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
        ))}

        {/* Decorative scrapbook accents (desktop) */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <Image src={starIcon} alt="" unoptimized className="absolute left-[47%] top-[1%] h-auto w-8" />
          <Image src={star2Icon} alt="" unoptimized className="absolute left-[24%] top-[34%] h-auto w-6" />
          <Image src={wriggle} alt="" unoptimized className="absolute left-[18%] top-[42%] h-auto w-16 -rotate-6 opacity-80" />
          <Image src={star2Icon} alt="" unoptimized className="absolute left-[48%] top-[90%] h-auto w-6" />
          <Image src={wriggle} alt="" unoptimized className="absolute right-[7%] top-[36%] h-auto w-16 rotate-6 opacity-80" />
          <Image src={starIcon} alt="" unoptimized className="absolute right-[2%] top-[76%] h-auto w-7" />
        </div>
      </div>
    </main>
  );
}
