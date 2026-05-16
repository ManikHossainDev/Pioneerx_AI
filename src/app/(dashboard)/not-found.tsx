
import DHeader from "@/components/dHeader/dHeader";
import Sidebar from "@/components/Sidebar/Sidebar";
import Image from "next/image";
import React from "react";
import NotFoundHome  from "@/assets/NotFoundHome.png";
const NotFound = () => {
  return (
    <section className="">
      <div className="w-full xl:container mx-auto xl:shadow ">
          <div className="">
           <DHeader />
          </div>
          <div className="grid grid-cols-12 md:grid-cols-11 lg:grid-cols-12 ">
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <Sidebar />
            </div>
            <div className="col-span-11 md:col-span-9 lg:col-span-9">
                <div className="w-full flex flex-col items-center bg-[#000000] justify-center min-h-screen ">
                        <Image
                          src={NotFoundHome} // Replace with your "Not Found" image URL
                          alt="Not Found"
                          className="w-ful h-full" // Adjust size as needed
                        />
                        <div className="text-xl font-semibold text-white">This is NotFound page</div>
                      </div>
            </div>
          </div>
      </div>
    </section>
  );
};

export default NotFound;