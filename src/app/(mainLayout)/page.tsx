import HeroBannerSection from "@/components/Pages/Home/HeroBannerSection";
import Readytobuild from "@/components/Pages/Home/Readytobuild";
import Startfreescale from "@/components/Pages/Home/Startfreescale";
import React from "react";
import businessneeds from "@/assets/giftfileall/businessneeds.gif";
import Image from "next/image";
import PoweredbyAI from "@/components/Pages/Home/PoweredbyAI";
import EveryToolYour from "@/components/Pages/Home/Everytoolyour";
import Buildwithpioneer from "@/components/Pages/Home/buildwithpioneer";
import FounderslovePioneer from "@/components/Pages/Home/FounderslovePioneer";
import FreeTrialPopup from "@/components/Header/FreeTrialPopup";
const HomePage = () => {
  return (
    <section>
      <FreeTrialPopup />
      <HeroBannerSection />
      <div className="relative w-full h-full overflow-hidden px-1 xl:px-0">
        <Image
          width={500}
          height={500}
          src={businessneeds.src}
          alt="business needs"
          className="absolute -top-[28%] -left-[40%] w-full h-full object-center xl:mt-16"
          style={{ transform: "rotate(35deg)" }}
          priority
        />
        <div className="absolute inset-0 bg-black/20 z-0 backdrop-blur-sm" />
        <div className="relative z-10">
          <div className="flex items-start justify-center min-h-full py-8 sm:py-12">
            <div className="w-full xl:container mx-auto">
              <div id="features" className="mb-6 md:mb-7">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-2 px-4 leading-tight">
                  Meet The AI Co-Founder Every Entrepreneur Needs
                </h1>
                <p className="text-center text-sm sm:text-base text-[#D4D4D4] px-4 mb-5 md:mb-10">
                  Generate business ideas, build strategies, automate marketing,
                  and scale faster with your AI business assistant.
                </p>
                <Buildwithpioneer />
              </div>
              <div id="business">
                <EveryToolYour />
              </div>
            </div>
          </div>
        </div>
      </div>
      <PoweredbyAI />
      <div className="relative w-full overflow-hidden pt-6 sm:pt-10">
        <Image
          width={500}
          height={500}
          src={businessneeds.src}
          alt="business needs"
          className="w-full rotate-[100deg] md:rotate-[158deg] h-[100vh] object-center xl:object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20 z-0 backdrop-blur-sm" />
        <div className="absolute inset-0 z-10 overflow-y-auto scrollbar-hide">
          <div className="flex items-start justify-center min-h-full px-2 md:px-6 py-8 sm:py-12">
            <div id="pricing" className="w-full xl:container mx-auto">
              <div className="mb-6 sm:mb-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-2 px-4 leading-tight">
                  Start free, scale when ready
                </h1>
                <p className="text-center text-sm sm:text-base text-[#D4D4D4] px-4 mb-1">
                  Not just a tool — an intelligent system that guides, automates,
                  and helps you execute.
                </p>
                <Startfreescale />
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
export default HomePage;
