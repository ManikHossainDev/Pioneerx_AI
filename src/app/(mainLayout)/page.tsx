import HeroBannerSection from "@/components/Pages/Home/HeroBannerSection";
import Readytobuild from "@/components/Pages/Home/Readytobuild";
import FounderslovePioneer from "@/components/Pages/Home/FounderslovePioneer";
import Startfreescale from "@/components/Pages/Home/Startfreescale";
import React from "react";
import businessneeds from '@/assets/giftfileall/businessneeds.gif'
import Image from "next/image";

const HomePage = () => {
  return (
    <section>
      <HeroBannerSection />

      {/* Image + Text overlay container */}
      <div className="relative w-full overflow-hidden pt-10">
        
        {/* Background Image */}
        <Image
          width={500}
          height={500}
          src={businessneeds.src}
          alt="business needs"
          className="w-full h-[100vh]"
          style={{ transform: 'rotate(158deg)' }}
        />

        {/* Black overlay — GIF এর উপরে, text এর নিচে */}
      <div className="absolute inset-0 bg-black/30 z-0 bg-blur-lg" />

        {/* Text overlaid on top of image */}
        <div className="absolute inset-0 flex items-center justify-center z-10 px-6">
          <div className="w-full xl:container mx-auto">
            <div>
              <h1 className="text-xl font-bold text-white text-center mb-2">Start free, scale when ready</h1>
              <p className="text-center text-base text-[#D4D4D4]">Not just a tool — an intelligent system that guides, automates, and helps you execute.</p>
              <Startfreescale />
            </div>
            <div >
              <h1 className="text-xl font-bold text-white text-center">Founders love PioneerX</h1>
              <FounderslovePioneer />
            </div>
          </div>
        </div>

      </div>

      <Readytobuild />
    </section>
  );
};

export default  HomePage