
import DHeader from "@/components/dHeader/dHeader";
import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-[#0f1011]">
      <div className="w-full xl:container mx-auto xl:shadow ">
          <div className="">
           <DHeader />
          </div>
          <div className="w-full flex space-x-5 ">
            <div className="w-[25%] lg:w-[18%]">
              <Sidebar />
            </div>
            <div className="w-[75%] lg:w-[77%] ">{children}</div>
          </div>
      </div>
    </section>
  );
};

export default Dashboard;