import React from 'react';
import Image from 'next/image';
import myselfImg from '@/assets/myself.png';
import { Briefcase, Phone, Send, GraduationCap, Settings, Paintbrush, Lightbulb, Users, Star, Globe } from 'lucide-react';
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export function ResumeSection() {
  return (
    <section className="w-full max-w-[1600px] mx-auto min-h-[100svh] lg:h-[100svh] lg:overflow-hidden bg-white text-black p-4 md:p-6 lg:p-10 font-sans flex flex-col justify-between gap-6 lg:gap-0">
      
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-6 w-full justify-between items-start flex-1 min-h-0">
        
        {/* Left Column: Intro & Contact */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4 z-10">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] mb-1 uppercase text-gray-800">
              Hey there! I'm
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide leading-none text-black">
              KASTURI
            </h2>
            <h2 className="font-great-vibes text-5xl md:text-6xl lg:text-[4.5rem] leading-none   text-black font-normal drop-shadow-sm">
              Pal
            </h2>
          </div>

          <div className="bg-black text-white px-3 py-1.5 inline-flex items-center self-start relative">
            <span className="font-sans text-xs md:text-sm font-medium tracking-widest uppercase relative z-10">
              Fashion Design Graduate
            </span>
            {/* Ribbons for the badge effect */}
            <div className="absolute top-0 -left-1.5 w-0 h-0 border-t-[14px] border-t-transparent border-r-[6px] border-r-black border-b-[14px] border-b-transparent"></div>
            <div className="absolute top-0 -right-1.5 w-0 h-0 border-t-[14px] border-t-transparent border-l-[6px] border-l-black border-b-[14px] border-b-transparent"></div>
          </div>

          <div className="text-sm text-gray-800 leading-snug font-sans mt-2 max-w-sm">
            <p className="mb-2">
              Fashion Design graduate with hands-on experience in fashion shows, styling, and collection development. Skilled in Adobe Creative Suite and passionate about blending contemporary aesthetics with sustainable design.
            </p>
            <p>
              Experienced in assisting photoshoots, garment styling, and backstage coordination for live showcases. Seeking opportunities in fashion design, styling, or brand development.
            </p>
          </div>

          
        </div>

        {/* Center Column: Image */}
        <div className="w-full lg:w-1/3 flex justify-center items-center relative min-h-[250px] lg:min-h-0 flex-1">
          {/* Subtle abstract background shape */}
          <div className="absolute w-[80%] h-[100%] bg-[#f3efe6] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] -z-10 mix-blend-multiply opacity-70"></div>
          
          <Image 
            src={myselfImg} 
            alt="Kasturi Pal" 
            width={800} 
            height={500} 
            className="w-full max-w-[75vw] sm:max-w-[55vw] lg:max-w-[40vw] h-auto max-h-[42vh] sm:max-h-[50vh] lg:max-h-[55vh] object-contain z-10 drop-shadow-xl"
            priority
          />

          {/* Doodles (CSS approximations) */}
          <div className="absolute top-2 right-6 z-0 hidden lg:block scale-75">
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="black" strokeWidth="2">
              <path d="M50 10 L50 30 M30 20 L40 35 M70 20 L60 35 M20 40 L35 45 M80 40 L65 45" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Right Column: Experience */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4 overflow-y-auto pr-2" style={{scrollbarWidth: 'none'}}>
          <div className="flex items-center gap-2 mb-1 sticky top-0 bg-white z-10 py-1">
            <div className="bg-black text-white p-1.5 rounded-md">
              <Briefcase size={18} />
            </div>
            <h3 className="font-sans font-bold text-base tracking-widest uppercase">Experience</h3>
          </div>
          
          <div className="relative border-l-2 border-black ml-3 pl-4 pb-1 flex flex-col gap-4">
            
            {/* Timeline Item 1 */}
            <div className="relative">
              <div className="absolute w-2.5 h-2.5 bg-black rounded-full -left-[1.35rem] top-1"></div>
              <h4 className="font-sans font-bold text-sm text-black mb-1">Rohan Pariyar Studios – Intern</h4>
              <ul className="list-disc pl-4 text-xs text-gray-700 space-y-1 font-sans leading-snug">
                <li>Contributed to the "I Medici" showcase at Victoria Memorial</li>
                <li>Assisted in garment styling, presentation, and backstage coordination</li>
                <li>Gained exposure to high-end fashion showcase production</li>
              </ul>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative">
              <div className="absolute w-2.5 h-2.5 bg-black rounded-full -left-[1.35rem] top-1"></div>
              <h4 className="font-sans font-bold text-sm text-black mb-1">ROY Calcutta – Intern</h4>
              <ul className="list-disc pl-4 text-xs text-gray-700 space-y-1 font-sans leading-snug">
                <li>Assisted in the launch of a new collection, contributing to styling and shoot preparation</li>
                <li>Worked closely with the jewellry brand <strong>Sawansukha</strong> for coordinated styling</li>
                <li>Supported creative direction for photoshoots and brand presentation</li>
              </ul>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative">
              <div className="absolute w-2.5 h-2.5 bg-black rounded-full -left-[1.35rem] top-1"></div>
              <h4 className="font-sans font-bold text-sm text-black mb-1">ICCR, Sutra Foundation – Fashion Show Assistant</h4>
              <ul className="list-disc pl-4 text-xs text-gray-700 space-y-1 font-sans leading-snug">
                <li>Supported end-to-end execution of fashion shows, including backstage coordination and model management</li>
                <li>Assisted in styling and garment handling during live showcases</li>
                <li>Collaborated with designers and production teams to ensure smooth event flow</li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full flex items-center my-4 shrink-0">
        <div className="w-2 h-2 bg-black rounded-full"></div>
        <div className="flex-1 border-t border-gray-300"></div>
        <div className="w-2 h-2 bg-black rounded-full"></div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row gap-6 w-full items-start shrink-0">
        
        {/* Education (Left) */}
        <div className="w-full lg:w-[28%] flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-black text-white p-1.5 rounded-full shrink-0">
              <GraduationCap size={18} />
            </div>
            <h3 className="font-sans font-bold text-base tracking-widest uppercase shrink-0">Education</h3>
            <div className="flex-1 flex items-center gap-1.5">
              <div className="flex-1 border-t border-black"></div>
              <div className="w-2 h-2 rounded-full bg-black shrink-0"></div>
            </div>
          </div>
          
          <div className="relative border-l-2 border-black ml-3 pl-4 flex flex-col gap-4">
            <div className="relative">
              <div className="absolute w-2 h-2 bg-black rounded-full -left-[1.3rem] top-1"></div>
              <h4 className="font-sans font-bold text-[0.8rem] text-black leading-snug">Sister Nivedita University: 2022 – 2026</h4>
              <p className="text-xs text-gray-600 mt-0.5">Bachelor in design (fashion & communication designing)</p>
            </div>
            <div className="relative">
              <div className="absolute w-2 h-2 bg-black rounded-full -left-[1.3rem] top-1"></div>
              <h4 className="font-sans font-bold text-[0.8rem] text-black leading-snug">Teg Bahadur Public School: 2020 – 2022</h4>
              <p className="text-xs text-gray-600 mt-0.5">HSC</p>
            </div>
            <div className="relative">
              <div className="absolute w-2 h-2 bg-black rounded-full -left-[1.3rem] top-1"></div>
              <h4 className="font-sans font-bold text-[0.8rem] text-black leading-snug">DAV Model School: 2007 – 2020</h4>
              <p className="text-xs text-gray-600 mt-0.5">SSC</p>
            </div>
          </div>
        </div>

        {/* Skills (Right) */}
        <div className="w-full lg:w-[72%] flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-black text-white p-1.5 rounded-full shrink-0">
              <Settings size={18} className="origin-center rotate-45" />
            </div>
            <h3 className="font-sans font-bold text-base tracking-widest uppercase shrink-0">Skills</h3>
            <div className="flex-1 flex items-center gap-1.5">
              <div className="flex-1 border-t border-black"></div>
              <div className="w-2 h-2 rounded-full bg-black shrink-0"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-3 gap-y-6 w-full">
            
            {/* Technical */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <span className="bg-gray-100 rounded-full p-1.5 shrink-0 flex items-center justify-center">
                  <Settings size={14} />
                </span>
                <h4 className="font-bold text-[0.7rem] uppercase leading-tight">Technical Skills</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1 list-[square] list-outside pl-4 marker:text-black">
                <li>Adobe Illustrator</li>
                <li>Photoshop</li>
                <li>InDesign</li>
                <li>CorelDraw</li>
              </ul>
            </div>

            {/* Design */}
            <div className="flex flex-col gap-2 lg:border-l lg:border-gray-200 lg:pl-3">
              <div className="flex items-center gap-1.5">
                <span className="bg-gray-100 rounded-full p-1.5 shrink-0 flex items-center justify-center">
                  <Paintbrush size={14} />
                </span>
                <h4 className="font-bold text-[0.7rem] uppercase leading-tight">Design Skills</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1 list-[square] list-outside pl-4 marker:text-black">
                <li>Fashion Design</li>
                <li>Print Development</li>
                <li>Embroidery & Surface Design</li>
                <li>Textile & Tapestry Work</li>
                <li>Fashion Illustration</li>
              </ul>
            </div>

            {/* Creative */}
            <div className="flex flex-col gap-2 lg:border-l lg:border-gray-200 lg:pl-3">
              <div className="flex items-center gap-1.5">
                <span className="bg-gray-100 rounded-full p-1.5 shrink-0 flex items-center justify-center">
                  <Lightbulb size={14} />
                </span>
                <h4 className="font-bold text-[0.7rem] uppercase leading-tight">Creative Skills</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1 list-[square] list-outside pl-4 marker:text-black">
                <li>Storytelling through Design</li>
                <li>Photography</li>
                <li>Styling</li>
                <li>Creative Concept Development</li>
              </ul>
            </div>

            {/* Inter-personal */}
            <div className="flex flex-col gap-2 lg:border-l lg:border-gray-200 lg:pl-3">
              <div className="flex items-center gap-1.5">
                <span className="bg-gray-100 rounded-full p-1.5 shrink-0 flex items-center justify-center">
                  <Users size={14} />
                </span>
                <h4 className="font-bold text-[0.7rem] uppercase leading-tight">Inter-personal Skills</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1 list-[square] list-outside pl-4 marker:text-black">
                <li>Communication</li>
                <li>Leadership</li>
                <li>Multi-tasking & Coordination</li>
                <li>Team Collaboration</li>
              </ul>
            </div>

            {/* Seek me out for */}
            <div className="flex flex-col gap-2 lg:border-l lg:border-gray-200 lg:pl-3">
              <div className="flex items-center gap-1.5">
                <span className="bg-gray-100 rounded-full p-1.5 shrink-0 flex items-center justify-center">
                  <Star size={14} />
                </span>
                <h4 className="font-bold text-[0.7rem] uppercase leading-tight">Seek Me Out For</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1 list-[square] list-outside pl-4 marker:text-black">
                <li>Sustainable Fashion Practices</li>
                <li>Cultural & Global Fashion Awareness</li>
                <li>Attention to detail</li>
                <li>Exposure to the market</li>
              </ul>
            </div>

            {/* Languages */}
            <div className="flex flex-col gap-2 lg:border-l lg:border-gray-200 lg:pl-3">
              <div className="flex items-center gap-1.5">
                <span className="bg-gray-100 rounded-full p-1.5 shrink-0 flex items-center justify-center">
                  <Globe size={14} />
                </span>
                <h4 className="font-bold text-[0.7rem] uppercase leading-tight">Languages</h4>
              </div>
              <ul className="text-xs text-gray-700 space-y-1 list-[square] list-outside pl-4 marker:text-black">
                <li>English</li>
                <li>Hindi</li>
                <li>Bengali</li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
