import heroImage from "@/assets/giftfileall/hero.gif";
import { HiArrowRight } from "react-icons/hi2";
import { LuBadgeCheck, LuBox, LuSunMedium } from "react-icons/lu";

const HeroBannerSection = () => {
  const cards = [
    {
      title: "Idea & Validation",
      desc: "Score viability & demand",
      icon: <LuSunMedium size={20} color="rgba(255,255,255,0.8)" />,
    },
    {
      title: "Branding",
      desc: "Name, identity & voice",
      icon: <LuBadgeCheck size={20} color="rgba(255,255,255,0.8)" />,
    },
    {
      title: "Product/Service",
      desc: "Offers & pricing strategy",
      icon: <LuBox size={20} color="rgba(255,255,255,0.8)" />,
    },
  ];

  return (
    <section
      className="relative w-full h-full lg:h-screen bg-cover bg-center bg-no-repeat lg:mb-10"
      style={{
        backgroundImage: `url(${heroImage.src})`,
      }}
    >
      {/* Black overlay — GIF এর উপরে, text এর নিচে */}
      <div className="absolute inset-0 bg-black/20 z-0 backdrop-blur-sm" />

      {/* Content — overlay এর উপরে */}
      <div className="relative z-10 flex flex-col items-center justify-start h-full pt-10 px-1 md:px-5">
        {/* Badge */}
        <div className="flex items-center mt-7 md:mt-10 xl:mt-16 gap-2 bg-white/10 border border-[#A3B3FF] rounded-full md:px-4 px-2 py-2.5  mb-2 md:mb-8 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A3B3FF] flex-shrink-0" />
          <p className="text-white/85 text-[8px] sm:text-[10px] md:text-xs ">
            Now in Beta Get a lead on other Entrepreneurs with{" "}
            PioneerX
          </p>
        </div>

        {/* Heading */}
        <h1 className="text-center font-extrabold text-white leading-tight tracking-tight text-3xl sm:text-4xl md:text-6xl lg:text-7xl mt-5 md:mb-5 xl:mb-7">
          Build, Run, and Scale
          <br />
          <span className="font-extrabold text-white leading-tight tracking-tight text-3xl sm:text-4xl md:text-6xl lg:text-7xl">Your Business</span>{" "}
          All in One Platform
        </h1>

        {/* Subtext */}
        <p className="text-center text-white/60 text-[11px] md:text-base xl:text-lg w-full md:max-w-xl leading-relaxed mt-2  md:mb-9">
          AI-powered tools and systems to turn your idea into a real business
          and scale it. From validation to wealth  every stage, every tool,
          one OS.
        </p>

        {/* CTA Button */}
        <button className="flex items-center gap-2.5 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-[#FFFFFF] border border-white font-bold text-[10px] md:text-sm px-7 md:py-3.5 py-1 rounded-full transition-colors duration-200 mt-5 md:mb-5 xl:mb-8">
          Start Building
          <span className="w-4 h-4 md:w-7 md:h-7 rounded-full bg-[#8E51FF33] flex items-center justify-center">
            <HiArrowRight size={14} color="white" />
          </span>
        </button>

        {/* Trust line */}
        <p className="text-white/45 text-xs md:text-lg flex items-center sm:gap-1 md:gap-2.5 my-5 md:mb-14">
          <span>Free to start</span>
          <span className="text-white/25">·</span>
          <span>No credit card required</span>
          <span className="text-white/25">·</span>
          <span>Upgrade anytime</span>
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-1 md:gap-3 xl:gap-5 w-full md:max-w-2xl mt-7 ">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white/[0.06] border border-white/[0.12] rounded-2xl p-1 md:p-5 flex flex-col items-center text-center gap-2.5 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-xl border border-white/15 bg-white/[0.07] flex items-center justify-center">
                {card.icon}
              </div>
              <p className="text-white font-bold text-[10px] sm:text-xs md:text-sm">{card.title}</p>
              <p className="text-white/50 text-[10px] sm:text-xs leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroBannerSection;