
"use client"
import { useState, useEffect } from "react";
import logo from "@/assets/logo/logo.png";
import { Sparkles, Bell, ChevronDown, MessageSquare, Image as ImageIcon, Send, Bookmark, ExternalLink,  Lock } from "lucide-react";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
const coreItems = [
  { label: "Idea & Validation", icon: "💡" },
  { label: "Branding", icon: "🎯" },
  { label: "Product/Service", icon: "▦" },
  { label: "Website & Tech", icon: "🌐" },
  { label: "Marketing", icon: "📣" },
  { label: "Sales", icon: "📈" },
  { label: "Operations", icon: "⚙" },
  { label: "Legal & Finance", icon: "⚖" },
  { label: "Launch", icon: "🚀" },
  { label: "Scaling", icon: "📊" },
];

const advancedItems = [
  "Financial Strategy",
  "Personal Execution",
  "Opportunity Engine",
  "Partnerships",
  "Customer Experience",
];



const eliteItems = ["Investment & Acqui...", "Personal Brand", "Multi-Business Mgmt"];

const tasks = [
  {
    title: "Draft Customer Discovery Questions",
    desc: "Create a set of 5-8 open-ended interview questions focused on understanding how potential users select, carry, and clean their current water bottles.",
    done: false,
  },
  {
    title: "Design a Landing Page Smoke Test",
    desc: "Outline a simple waitlist landing page concept to capture email sign-ups and measure initial consumer interest in your water bottle feature set.",
    done: false,
  },
  {
    title: "Establish Go/No-Go Decision Criteria",
    desc: "Define clear criteria for validating demand, such as target waitlist conversion rates or consistent interview themes, before committing to manufacturing.",
    done: true,
  },
];

const suggestedLinks = [
  "Idea & Validation Overview",
  "Define Brand Identity & Naming",
  "Design Product Specifications",
  "Customer Discovery Interview Guide",
];

const Buildwithpioneer = () => {
  const [activeTab, setActiveTab] = useState("Chat");
  const [message, setMessage] = useState("");
  const [saveLabel, setSaveLabel] = useState("Idea & Validation — 7/28/2026");

  const fullText = "Pioneerx";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;
    let typingInterval: ReturnType<typeof setInterval>;
    let pauseTimeout: ReturnType<typeof setTimeout>;

    const startTyping = () => {
      typingInterval = setInterval(() => {
        index += 1;
        setTypedText(fullText.slice(0, index));

        if (index === fullText.length) {
          clearInterval(typingInterval);
          // full text kicchukhon dekhabe, tarpor reset hoye abar type hobe
          pauseTimeout = setTimeout(() => {
            index = 0;
            setTypedText("");
            startTyping();
          }, 1200);
        }
      }, 230);
    };

    startTyping();

    return () => {
      clearInterval(typingInterval);
      clearTimeout(pauseTimeout);
    };
  }, []);

  return (
    <div className="flex flex-col h-[760px] w-full bg-white/[0.06] backdrop-blur  border border-white/[0.06]  rounded-lg text-[#e2e0f0] font-sans overflow-hidden">
      {/* Top header */}
      <div className="flex items-center justify-between px-5 py-3  border-b border-white/[0.08] shrink-0">
        <div className="flex items-center">
            <Image
                  src={logo}
                  alt=""
                  width={28}
                  height={28}
                  className="rounded-full "
                />
              <span className="font-extrabold xl:text-xl mt-2">Pioneerx</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-white/[0.1] transition-colors">
            <Bell size={28} className="text-[#9d9bba]" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-violet-500 text-[9px] font-semibold flex items-center justify-center text-white">
              1
            </span>
          </button>
          <button className="flex items-center gap-1.5 pl-1 pr-2.5 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.1] transition-colors">
            <FaRegUserCircle size={28} />
            <span className="text-[13px] text-[#e2e0f0]">AquaForge</span>
            <ChevronDown size={13} className="text-[#7c7a96]" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex w-[210px] shrink-0 flex-col gap-5 py-5 px-3 bg-black/[0.3] backdrop-blur-lg border  border-r border-white/[0.06] overflow-y-auto  scrollbar-hide">
          <div>
            <div className="px-2 pb-2 text-[11px] font-semibold tracking-widest text-violet-400 uppercase">
              Core
            </div>
            <div className="flex flex-col gap-0.5">
              {coreItems.map((item, i) => (
                <button
                  key={item.label}
                  className={`flex items-center gap-2.5 text-left text-[13px] px-2.5 py-[9px] rounded-lg transition-colors
                    ${i === 0
                      ? "bg-violet-500/15 text-[#e2e0f0] font-medium"
                      : "hover:text-[#ffffff] hover:bg-white/[0.04] text-violet-300"
                    }`}
                >
                  <span className="text-[13px] leading-none opacity-90">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="px-2 pb-2 text-[11px] font-semibold tracking-widest text-[#615f78] uppercase">
              Advanced
            </div>
            <div className="flex flex-col gap-0.5">
              {advancedItems.map((label) => (
                <button
                  key={label}
                  className="flex items-center justify-between text-left text-[13px] px-2.5 py-[9px] rounded-lg text-[#555369] cursor-not-allowed"
                >
                  <span className="truncate text-[#9b98aa]">{label}</span>
                  <span className="flex items-center gap-1 text-[10px] text-[#9b98aa] shrink-0">
                    <Lock size={10} /> Upgrade
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="px-2 pb-2 text-[11px] font-semibold tracking-widest text-[#615f78] uppercase">
              Elite
            </div>
            <div className="flex flex-col gap-0.5">
              {eliteItems.map((label) => (
                <button
                  key={label}
                  className="flex items-center justify-between text-left text-[13px] px-2.5 py-[9px] rounded-lg text-[#555369] cursor-not-allowed"
                >
                  <span className="truncate">{label}</span>
                  <span className="flex items-center gap-1 text-[10px] text-[#555369] shrink-0">
                    <Lock size={10} /> Upgrade
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-y-auto px-6 py-6">
          <h1 className="text-[22px] font-semibold tracking-tight text-white">Idea & Validation</h1>
          <p className="text-[13px] text-[#7c7a96] mt-1 mb-5">
            Test and refine your business idea before you invest time and money.
          </p>

          <div className="flex flex-1 gap-5 overflow-x-auto">
            {/* Left: tool panel */}
            <div className="flex-1 min-w-[320px] flex flex-col   border border-white/[0.08] rounded-xl p-4">
              <button className="self-start flex items-center gap-2 text-[13px] font-medium text-white bg-violet-600 hover:bg-violet-500 transition-colors px-3.5 py-2 rounded-lg mb-4">
                <Sparkles size={14} />
                AI Idea & Validation Tool
              </button>
                {/*  this thex typinkg hobe  */}
              {/* Center logo + typing text */}
<div className="flex-1 text-white flex justify-center items-center">
  <div className="flex items-center">
    <Image
      src={logo}
      alt=""
      width={40}
      height={40}
      className="rounded-full"
    />
    <span className="font-extrabold xl:text-4xl mt-2 ml-[2px]">
      {typedText}
      <span className="inline-block w-[3px] h-[0.9em] bg-white ml-[2px] align-middle animate-pulse" />
    </span>
  </div>
</div>

              <div className="flex items-center gap-2 mb-3">
                {["Chat", "Image"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-md transition-colors
                      ${activeTab === tab
                        ? "bg-violet-600 text-white"
                        : "bg-white/[0.05] text-[#9d9bba] hover:bg-white/[0.08]"
                      }`}
                  >
                    {tab === "Chat" ? <MessageSquare size={12} /> : <ImageIcon size={12} />}
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Where We Mind Your Business"
                  className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-[13px] text-[#e2e0f0] placeholder:text-[#615f78] outline-none focus:border-violet-500/50"
                />
                <button className="flex items-center gap-1.5 text-[13px] font-medium text-white bg-violet-600 hover:bg-violet-500 transition-colors px-4 py-2.5 rounded-lg shrink-0">
                  <Send size={13} />
                  Send Message
                </button>
              </div>

              <div className="text-[11px] text-[#7c7a96] mb-1.5">Save this output</div>
              <div className="flex items-center gap-2">
                <input
                  value={saveLabel}
                  onChange={(e) => setSaveLabel(e.target.value)}
                  className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-lg px-3.5 py-2 text-[13px] text-[#e2e0f0] outline-none focus:border-violet-500/50"
                />
              </div>
              <button className="mt-2 self-start flex items-center gap-1.5 text-[12px] text-[#9d9bba] bg-white/[0.04] px-3 py-1.5 rounded-lg">
                <Bookmark size={12} />
                Already saved
              </button>
            </div>

            {/* Right: info panels */}
            <div className="flex w-[280px] shrink-0 flex-col gap-4 overflow-y-auto">
              {/* Saved Outputs */}
              <div className=" border backdrop-blur-sm bg-black/[0.3] border-white/[0.08] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-semibold text-white">Saved Outputs</span>
                  <span className="text-[11px] text-[#7c7a96]">Click to view</span>
                </div>
                <div className="text-[13px] font-medium text-[#e2e0f0]">Idea & Validation — 7/28/2026</div>
                <div className="text-[11px] text-[#7c7a96] mt-0.5">Idea & Validation</div>
                <div className="text-[11px] text-violet-400 mt-1">4 action steps · tap to view</div>
                <button className="text-[11px] text-violet-400 mt-2">Remove</button>
              </div>

              {/* Tasks */}
              <div className=" border backdrop-blur-sm bg-black/[0.3] border-white/[0.08] rounded-xl p-4 flex-1 overflow-y-auto scrollbar-hide">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-semibold text-white">Tasks</span>
                  <span className="text-[11px] text-[#7c7a96]">1/4 done</span>
                </div>
                <div className="flex flex-col gap-3.5">
                  {tasks.map((task) => (
                    <div key={task.title} className="flex gap-2.5">
                      <div
                        className={`mt-0.5 w-[15px] h-[15px] rounded-full border shrink-0 ${
                          task.done ? "bg-violet-500 border-violet-500" : "border-[#615f78]"
                        }`}
                      />
                      <div>
                        <div
                          className={`text-[12.5px] font-medium ${
                            task.done ? "text-[#615f78] line-through" : "text-[#e2e0f0]"
                          }`}
                        >
                          {task.title}
                        </div>
                        <div className="text-[11.5px] text-[#7c7a96] leading-relaxed mt-0.5">
                          {task.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Links */}
              <div className=" border backdrop-blur-sm bg-black/[0.3] border-white/[0.08] rounded-xl p-4">
                <span className="text-[13px] font-semibold text-white">Suggested Links</span>
                <div className="flex flex-col mt-2.5">
                  {suggestedLinks.map((link) => (
                    <button
                      key={link}
                      className="flex items-center justify-between text-[12.5px] text-[#c3c1d9] py-2.5 border-t border-white/[0.06] first:border-t-0"
                    >
                      {link}
                      <ExternalLink size={12} className="text-[#615f78]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-[11px] text-white pt-4">
            AI can make mistakes. Please verify important information before making decisions.
          </div>
        </main>
      </div>
    </div>
  );
};

export default Buildwithpioneer;
