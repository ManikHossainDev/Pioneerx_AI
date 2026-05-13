import PoweredBackground from "@/assets/giftfileall/poweredBackground.gif";
import frame from "@/assets/giftfileall/frame.png"
import Powered from '@/assets/giftfileall/powered.gif'
import Image from "next/image";
const PoweredbyAI = () => {
 return (
 <div className="bg-contain relative bg-center bg-no-repeat py-10 lg:py-16 xl:pt-20" style={{
         backgroundImage: `url(${PoweredBackground.src})`,
       }}>
         {/* Black overlay — GIF এর উপরে, text এর নিচে */}
      <div className="absolute inset-0 bg-black/30 z-0 bg-blur-lg" />

   <h2 className="text-xl font-bold text-white text-center mb-2 xl:mb-3">Powered by AI at every step</h2>
   <p className="text-center text-base text-[#D4D4D4] mb-3 xl:mb-7">Not just a tool — an intelligent system that guides, automates, and helps you execute.</p>

    <div className="xl:container mx-auto w-full flex justify-center  items-center   rounded-md lg:h-[65vh] bg-contain bg-center bg-no-repeat" style={{
         backgroundImage: `url(${frame.src})`,
       }}>
       <Image className="rounded-full w-[150px] h-[150px] md:w-[300px] md:h-[300px] lg:w-[500px] lg:h-[500px] xl:w-[700px] xl:h-[700px]" width={700} height={700} src={Powered} alt="powered" />
    </div>   
 </div>
 );
};

export default PoweredbyAI;