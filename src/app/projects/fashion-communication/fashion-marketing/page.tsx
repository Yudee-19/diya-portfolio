import Image from "next/image";
import Link from "next/link";
import { StackingSection } from "@/components/StackingSection";
import slide1 from "@/assets/fashion-marketing/1.png";
import slide2 from "@/assets/fashion-marketing/2.png";
import slide3 from "@/assets/fashion-marketing/3.png";
import slide4 from "@/assets/fashion-marketing/4.png";
import slide5 from "@/assets/fashion-marketing/5.png";
import slide6 from "@/assets/fashion-marketing/6.png";
import slide7 from "@/assets/fashion-marketing/7.png";
import slide8 from "@/assets/fashion-marketing/8.png";
import slide9 from "@/assets/fashion-marketing/9.png";
import slide10 from "@/assets/fashion-marketing/10.png";
import slide11 from "@/assets/fashion-marketing/11.png";
import slide12 from "@/assets/fashion-marketing/12.png";
import slide13 from "@/assets/fashion-marketing/13.png";

const slides = [
  slide1, slide2, slide3, slide4, slide5, slide6, slide7,
  slide8, slide9, slide10, slide11, slide12, slide13,
];

export default function FashionMarketingPage() {
  return (
    <div className="w-full bg-white">
      {/* Back link — fixed so it stays reachable through the whole stack */}
      <Link
        href="/projects/fashion-communication"
        className="fixed left-4 top-4 z-50 rounded-full bg-white/85 px-3.5 py-1.5 font-sans text-sm tracking-wide text-gray-600 shadow-sm ring-1 ring-black/10 backdrop-blur transition-colors hover:text-black md:left-6 md:top-6"
      >
        ← Back
      </Link>

      {/* Each slide is a full-viewport section; StackingSection pins it and
          applies the scroll-linked stacking-card effect (lg and up). */}
      {slides.map((slide, i) => (
        <StackingSection key={i} index={i} total={slides.length}>
          <div className="relative h-[100svh] w-full bg-white">
            <Image
              src={slide}
              alt={`Fashion Marketing — slide ${i + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority={i === 0}
            />
          </div>
        </StackingSection>
      ))}
    </div>
  );
}
