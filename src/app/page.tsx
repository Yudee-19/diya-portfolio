import Image from "next/image";
import { ScrapbookItem } from "@/components/ScrapbookAnimation";
import { ResumeSection } from "@/components/ResumeSection";
import { Polaroid } from "@/components/Polaroid";
import { StackingSection } from "@/components/StackingSection";
import heroFlower from "@/assets/hero-flower.png";
import strip1 from "@/assets/paper-strips/strip1.png";
import strip2 from "@/assets/paper-strips/strip2.png";
import strip3 from "@/assets/paper-strips/strip3.png";
import strip4 from "@/assets/paper-strips/strip4.png";
import strip5 from "@/assets/paper-strips/strip5.png";
import strip6 from "@/assets/paper-strips/strip6.png";
import starIcon from "@/assets/star.svg";
import star2Icon from "@/assets/star-2.svg";
import wriggle from "@/assets/wriggle.svg";
import visualComCover from "@/assets/projects-cover/visual-com.png";
import designDevCover from "@/assets/projects-cover/design-dev.jpg";
import brandingCover from "@/assets/projects-cover/branding.jpg";
import editorialCover from "@/assets/projects-cover/editorial-des.png";
import photographyCover from "@/assets/projects-cover/photography.jpg";
import internshipCover from "@/assets/projects-cover/internship.jpg";

export default function Home() {
  const projects = [
    { label: "Fashion Communication", photo: visualComCover, strip: strip1, stripSide: "left" as const, stripRotation: -9, cardRotation: -3, direction: "top" as const },
    { label: "Design Development", photo: designDevCover, strip: strip2, stripSide: "right" as const, stripRotation: 8, cardRotation: 2, direction: "top" as const },
    { label: "Branding", photo: brandingCover, strip: strip3, stripSide: "right" as const, stripRotation: 6, cardRotation: -2, direction: "top" as const },
    { label: "Editorial Design", photo: editorialCover, strip: strip4, stripSide: "left" as const, stripRotation: -7, cardRotation: 3, direction: "bottom" as const },
    { label: "Photography", photo: photographyCover, strip: strip5, stripSide: "left" as const, stripRotation: -5, cardRotation: -2, direction: "bottom" as const },
    { label: "Internship", photo: internshipCover, strip: strip6, stripSide: "right" as const, stripRotation: 9, cardRotation: 2, direction: "bottom" as const },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <StackingSection index={0} total={3}>
      <main className="relative w-full h-[100svh] bg-white overflow-hidden p-3 sm:p-5 flex flex-col">
        <div className="relative w-full flex-1 flex flex-col px-6 py-8 sm:px-10 sm:py-10 md:px-16 md:py-12 font-sans text-black">
          
          {/* Top Right: Year */}
          <div className="absolute top-6 right-8 md:top-12 md:right-16 text-base sm:text-lg md:text-xl tracking-wider z-20">
            <ScrapbookItem direction="top" travelDistance={20} tiltSteps={2} duration={0.6}>
              2026
            </ScrapbookItem>
          </div>

          {/* Center Content */}
          <div className="flex-1 min-h-0 w-full flex flex-col md:flex-row items-stretch gap-6 pb-14 md:pb-10">
            
            {/* Left Text (Top Left) */}
            <div className="flex flex-col items-start justify-start z-10 min-w-0 md:flex-[1.35] pt-1 md:pt-4">
              <ScrapbookItem direction="left" travelDistance={40} tiltSteps={3} duration={0.6} delay={0.1} finalRotation={0}>
                <h2 className="font-westonia text-[clamp(2.75rem,7vw,7rem)] leading-none mb-[-0.5rem] md:mb-[-1rem]  lg:mb-[-3rem]  ml-1 md:ml-3 font-normal text-black drop-shadow-sm whitespace-nowrap tracking-wide">
                  Creative
                </h2>
              </ScrapbookItem>
              
              <ScrapbookItem direction="left" travelDistance={40} tiltSteps={3} duration={0.7} delay={0.3}>
                <h1 className="font-playfair text-[clamp(3rem,8vw,7.5rem)] font-bold tracking-tighter leading-none text-black whitespace-nowrap">
                  PORTFOLIO
                </h1>
              </ScrapbookItem>
              
              <ScrapbookItem direction="left" travelDistance={30} tiltSteps={2} duration={0.5} delay={0.5}>
                <p className="font-sans text-base sm:text-xl md:text-2xl mt-2 md:mt-3 tracking-wide font-normal text-gray-900 ml-1 md:ml-3">
                  Fashion Designer
                </p>
              </ScrapbookItem>
            </div>

            {/* Right: Flower (vertically centered) */}
            <div className="flex-1 min-h-0 min-w-0 flex items-center justify-center md:justify-end">
              <ScrapbookItem
                className="relative h-full w-full max-w-[240px] sm:max-w-[340px] md:max-w-[420px]"
                direction="right"
                travelDistance={60}
                tiltSteps={4}
                duration={0.8}
                delay={0.4}
                maxAngle={15}
                finalRotation={5}
              >
                <Image
                  src={heroFlower}
                  alt="Vintage Flower Illustration"
                  fill
                  sizes="(max-width: 768px) 60vw, 40vw"
                  className="object-contain object-center drop-shadow-md"
                  priority
                />
              </ScrapbookItem>
            </div>

          </div>

          {/* Bottom Elements */}
          <div className="absolute bottom-6 left-6 md:bottom-12 md:left-16 flex items-center gap-4 z-20">
            <ScrapbookItem direction="bottom" travelDistance={20} tiltSteps={2} duration={0.6} delay={0.6}>
              <div className="flex items-center gap-6">
                <a href="mailto:Palkasturi25@gmail.com" className="font-sans text-sm md:text-base font-normal">
                  Palkasturi25@gmail.com
                </a>
                <svg width="60" height="10" viewBox="0 0 60 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden sm:block">
                  <path d="M0 5H58M58 5L54 1M58 5L54 9" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </ScrapbookItem>
          </div>

          <div className="absolute bottom-6 right-6 md:bottom-12 md:right-16 z-20">
            <ScrapbookItem direction="bottom" travelDistance={20} tiltSteps={2} duration={0.6} delay={0.7}>
              <span className="font-sans italic text-sm sm:text-base md:text-lg">
                By Kasturi Pal
              </span>
            </ScrapbookItem>
          </div>
          
        </div>
      </main>
      </StackingSection>

      {/* Resume Section */}
      <StackingSection index={1} total={3}>
        <ResumeSection />
      </StackingSection>

      {/* Key Projects Section */}
      <StackingSection index={2} total={3}>
      <section className="relative w-full overflow-hidden bg-white px-6 py-16 sm:px-10 sm:py-20 md:flex md:h-[100svh] md:flex-col md:justify-center md:py-8 lg:px-16 lg:py-10">
        <div className="relative mx-auto w-full max-w-[1400px]">

          {/* Title — stacked on mobile, centered overlay on desktop */}
          <div className="relative z-30 mb-10 flex justify-center md:pointer-events-none md:absolute md:inset-0 md:mb-0 md:items-center">
            <ScrapbookItem direction="bottom" travelDistance={30} tiltSteps={3} duration={0.7} maxAngle={8} finalRotation={0}>
              <h2 className="text-center font-playfair text-5xl font-bold uppercase leading-[0.95] tracking-tight text-[#222220] drop-shadow-sm sm:text-7xl md:text-[3.25rem] lg:text-[4.5rem] xl:text-[5.5rem]">
                Key Projects
              </h2>
            </ScrapbookItem>
          </div>

          {/* Polaroid grid */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 md:grid-cols-3 md:gap-x-6 md:gap-y-25 lg:gap-x-10">
            {projects.map((p, i) => (
              <div key={p.label} className="flex justify-center">
                <ScrapbookItem
                  className="w-full max-w-[400px] md:max-w-[300px] xl:max-w-[340px]"
                  direction={p.direction}
                  travelDistance={50}
                  tiltSteps={4}
                  duration={0.7}
                  delay={0.1 * (i % 3)}
                  maxAngle={12}
                  finalRotation={p.cardRotation}
                >
                  <Polaroid
                    className="w-full"
                    photo={p.photo}
                    alt={`${p.label} project`}
                    label={p.label}
                    strip={p.strip}
                    stripSide={p.stripSide}
                    stripRotation={p.stripRotation}
                  />
                </ScrapbookItem>
              </div>
            ))}
          </div>

          {/* Decorative scrapbook accents (desktop) */}
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            <Image src={wriggle} alt="" unoptimized className="absolute left-[1%] top-[30%] h-auto w-24 -rotate-12 opacity-80" />
            <Image src={starIcon} alt="" unoptimized className="absolute right-[34%] top-[34%] h-auto w-11" />
            <Image src={star2Icon} alt="" unoptimized className="absolute left-[27%] top-[36%] h-auto w-8" />
            <Image src={wriggle} alt="" unoptimized className="absolute right-[2%] top-[2%] h-auto w-24 rotate-12 opacity-80" />
            <Image src={starIcon} alt="" unoptimized className="absolute bottom-[8%] left-[31%] h-auto w-9" />
            <Image src={star2Icon} alt="" unoptimized className="absolute bottom-[38%] right-[4%] h-auto w-9" />
          </div>

        </div>
      </section>
      </StackingSection>
    </div>
  );
}