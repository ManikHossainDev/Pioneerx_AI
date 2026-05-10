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
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${heroImage.src})`,
      }}
    >
      {/* Black overlay — GIF এর উপরে, text এর নিচে */}
      <div className="absolute inset-0 bg-black/40 z-0 bg-blur-lg" />

      {/* Content — overlay এর উপরে */}
      <div className="relative z-10 flex flex-col items-center justify-start h-full pt-10 px-5">
        {/* Badge */}
        <div className="flex items-center mt-5 md:mt-10 xl:mt-16 gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 mb-8 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
          <p className="text-white/85 text-xs">
            Now in Beta — Get a lead on other Entrepreneurs with{" "}
            <span className="text-violet-300 font-semibold">PioneerX</span>
          </p>
        </div>

        {/* Heading */}
        <h1 className="text-center font-extrabold text-white leading-tight tracking-tight text-5xl md:text-6xl lg:text-7xl mb-5">
          Build, Run, and Scale
          <br />
          <span className="relative inline-block">Your Business</span>{" "}
          All in One Platform
        </h1>

        {/* Subtext */}
        <p className="text-center text-white/60 text-base max-w-md leading-relaxed mb-9">
          AI-powered tools and systems to turn your idea into a real business
          and scale it. From validation to wealth — every stage, every tool,
          one OS.
        </p>

        {/* CTA Button */}
        <button className="flex items-center gap-2.5 bg-white/90 hover:bg-white text-[#1a0a3c] font-bold text-sm px-7 py-3.5 rounded-full transition-colors duration-200 mb-5">
          Start Building
          <span className="w-7 h-7 rounded-full bg-[#1a0a3c] flex items-center justify-center">
            <HiArrowRight size={14} color="white" />
          </span>
        </button>

        {/* Trust line */}
        <p className="text-white/45 text-xs flex items-center gap-2.5 mb-14">
          <span>Free to start</span>
          <span className="text-white/25">·</span>
          <span>No credit card required</span>
          <span className="text-white/25">·</span>
          <span>Upgrade anytime</span>
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-2xl">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white/[0.06] border border-white/[0.12] rounded-2xl p-5 flex flex-col items-center text-center gap-2.5 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-xl border border-white/15 bg-white/[0.07] flex items-center justify-center">
                {card.icon}
              </div>
              <p className="text-white font-bold text-sm">{card.title}</p>
              <p className="text-white/50 text-xs leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroBannerSection;