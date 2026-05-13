import HeroBannerSection from "@/components/Pages/Home/HeroBannerSection";
import Readytobuild from "@/components/Pages/Home/Readytobuild";
import FounderslovePioneer from "@/components/Pages/Home/FounderslovePioneer";
import Startfreescale from "@/components/Pages/Home/Startfreescale";
import React from "react";
import businessneeds from '@/assets/giftfileall/businessneeds.gif'
import Image from "next/image";
import PoweredbyAI from "@/components/Pages/Home/PoweredbyAI";

const HomePage = () => {
  return (
    <section>
      <HeroBannerSection />
      
      <PoweredbyAI  />

      {/* Image + Text overlay container */}
    <div className="relative w-full overflow-hidden pt-6 sm:pt-10">
 
      {/* Background Image */}
      <Image
        width={500}
        height={500}
        src={businessneeds.src}
        alt="business needs"
        className="w-full h-[auto] min-h-[600px] sm:min-h-[800px] xl:h-[100vh] object-cover"
        style={{ transform: "rotate(158deg)" }}
        priority
      />
 
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />
 
      {/* Scrollable content on top */}
      <div className="absolute inset-0 z-10 overflow-y-auto scrollbar-hide">
        <div className="flex items-start justify-center min-h-full px-3 sm:px-6 py-8 sm:py-12">
          <div className="w-full xl:container mx-auto">
 
            {/* Pricing section */}
            <div className="mb-6 sm:mb-10">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center mb-2 px-4">
                Start free, scale when ready
              </h1>
              <p className="text-center text-sm sm:text-base text-[#D4D4D4] px-4 mb-1">
                Not just a tool — an intelligent system that guides, automates, and helps you execute.
              </p>
              <Startfreescale />
            </div>
 
            {/* Testimonials section */}
            <div className="mb-4 sm:mb-6">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center mb-1">
                Founders love PioneerX
              </h1>
              <FounderslovePioneer />
            </div>
 
          </div>
        </div>
      </div>
    </div>

      <Readytobuild />
    </section>
  );
};

export default  HomePage