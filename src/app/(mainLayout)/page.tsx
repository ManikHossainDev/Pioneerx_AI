import HeroBannerSection from "@/components/Pages/Home/HeroBannerSection";
import Readytobuild from "@/components/Pages/Home/Readytobuild";
import FounderslovePioneer from "@/components/Pages/Home/FounderslovePioneer";
import Startfreescale from "@/components/Pages/Home/Startfreescale";
import React from "react";
import businessneeds from '@/assets/giftfileall/businessneeds.gif'
import Image from "next/image";
import PoweredbyAI from "@/components/Pages/Home/PoweredbyAI";
import EveryToolYour from "@/components/Pages/Home/Everytoolyour";
import Buildwithpioneer from "@/components/Pages/Home/buildwithpioneer";

const HomePage = () => {
  return (
    <section>
      <HeroBannerSection />

       {/* Image + Text overlay container */}
<div className="relative w-full h-full overflow-hidden px-1 xl:px-0">

  {/* Background Image - fixed to container */}
  <Image
  width={500}
  height={500}
  src={businessneeds.src}
  alt="business needs"
  className="absolute -top-[28%] -left-[40%] w-full h-full object-center"
  style={{ transform: "rotate(35deg)" }}
  priority
/>

  {/* Black overlay */}
  <div className="absolute inset-0 bg-black/20 z-0 backdrop-blur-sm" />

  {/* Content - এটাই height নির্ধারণ করবে */}
  <div className="relative z-10">
    <div className="flex items-start justify-center min-h-full  py-8 sm:py-12">
      <div className="w-full xl:container mx-auto">

        {/* Pricing section */}
        <div className="mb-6 md:mb-7">
          <Buildwithpioneer />
        </div>

        {/* Testimonials section */}
        <div className="">
          <EveryToolYour />
        </div>

      </div>
    </div>
  </div>

</div>
      
      <PoweredbyAI  />

      {/* Image + Text overlay container */}
      <div className="relative w-full overflow-hidden pt-6 sm:pt-10 ">
 
      {/* Background Image */}
      <Image
        width={500}
        height={500}
        src={businessneeds.src}
        alt="business needs"
        className="w-full  rotate-[100deg] md:rotate-[158deg] h-[100vh] object-center xl:object-cover "

        priority
      />
 
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/20 z-0 backdrop-blur-sm" />
 
      {/* Scrollable content on top */}
      <div className="absolute inset-0 z-10 overflow-y-auto scrollbar-hide">
        <div className="flex items-start justify-center min-h-full px-2 md:px-6 py-8 sm:py-12">
          <div id="pricing" className="w-full xl:container mx-auto">
 
            {/* Pricing section */}
            <div  className="mb-6 sm:mb-10">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center mb-2 px-4">
                Start free, scale when ready
              </h1>
              <p className="text-center text-sm sm:text-base text-[#D4D4D4] px-4 mb-1">
                Not just a tool — an intelligent system that guides, automates, and helps you execute.
              </p>
              <Startfreescale />
            </div>
 
            {/* Testimonials section */}
            <div  className="mb-4  sm:mb-6">
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