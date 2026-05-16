"use client";

import PoweredBackground from "@/assets/giftfileall/poweredBackground.gif";
import frame from "@/assets/giftfileall/frame.png";
import frame2 from "@/assets/giftfileall/framess.png";
import Powered from "@/assets/giftfileall/powered.gif";
import Image from "next/image";
import Cards from "./Cards";

const cards = [
  {
    title: "Idea & Validation",
    description:
      "Your AI knows your business stage, goals, and history. It generates tailored strategies, not generic advice.",
  },
  {
    title: "Idea & Validation",
    description:
      "Your AI knows your business stage, goals, and history. It generates tailored strategies, not generic advice.",
  },
  {
    title: "Idea & Validation",
    description:
      "Your AI knows your business stage, goals, and history. It generates tailored strategies, not generic advice.",
  },
  {
    title: "Idea & Validation",
    description:
      "Your AI knows your business stage, goals, and history. It generates tailored strategies, not generic advice.",
  },
];




const PoweredbyAI = () => {
  return (
    <div
      className="bg-contain relative bg-center bg-no-repeat py-10 lg:pb-16"
      style={{ backgroundImage: `url(${PoweredBackground.src})` }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* Content wrapper — above overlay */}
      <div className="relative z-10">
        <h2 className="text-xl font-bold text-white text-center mb-2 xl:mb-3">
          Powered by AI at every step
        </h2>
        <p className="text-center text-base text-[#D4D4D4] mb-3 xl:mb-7">
          Not just a tool — an intelligent system that guides, automates, and helps you execute.
        </p>

        {/* Mobile frame */}
        <div
          className="xl:container mx-auto w-full flex justify-center items-center rounded-md lg:h-[65vh] bg-contain bg-center bg-no-repeat block lg:hidden"
          style={{ backgroundImage: `url(${frame2.src})` }}
        >
          <Image
            className="rounded-full w-[150px] h-[150px]"
            width={150}
            height={150}
            src={Powered}
            alt="powered"
          />
        </div>

        {/* Desktop frame */}
        <div
          className="xl:container mx-auto w-full justify-center items-center rounded-md lg:h-[65vh] bg-contain bg-center bg-no-repeat hidden lg:flex"
          style={{ backgroundImage: `url(${frame.src})` }}
        >
          <Image
            className="rounded-full md:w-[300px] md:h-[300px] lg:w-[500px] lg:h-[500px] xl:w-[700px] xl:h-[700px]"
            width={700}
            height={700}
            src={Powered}
            alt="powered"
          />
        </div>

        {/* Cards Grid */}
        <div className="block lg:hidden mt-1">
         <div className=" w-full xl:container mx-auto px-1 2 grid grid-cols-1 sm:grid-cols-2 gap-1">
          {cards.map((card, index) => (
            <Cards key={index} title={card.title} description={card.description} />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default PoweredbyAI;