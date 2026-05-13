import { HiArrowRight } from "react-icons/hi2";

const Readytobuild = () => {
 return (
  <section className="px-2">
    <div className="w-full  my-10 xl:my-16 py-10 xl:py-12 xl:container border border-gray-500 rounded-xl">
    <h1 className="text-center text-white font-bold text-xl xl:text-4xl mb-2 md:mb-5 ">Ready to build your PioneerX? </h1>
    <p className="text-[#D4D4D4] text-center text-sm md:text-base mb-2 md:mb-5 ">Join thousands of founders who use Business OS to execute faster and scale smarter.</p>
      {/* CTA Button */}
             <button className="flex items-center mx-auto gap-2.5 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-[#FFFFFF] border border-white font-bold text-sm px-7 md:py-3.5 py-1 rounded-full transition-colors duration-200">
               Start Building for Free
               <span className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-[#8E51FF33] flex items-center justify-center">
                 <HiArrowRight size={14} color="white" />
               </span>
             </button>
 </div>
  </section>
 );
};

export default Readytobuild;