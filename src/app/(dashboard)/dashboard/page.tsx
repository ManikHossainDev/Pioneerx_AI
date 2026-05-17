import DashboardSetup from "@/components/dashboard/DashboardSetup";
import Status from "@/components/dashboard/status";
import TodayAITaskList from "@/components/dashboard/TodayAITaskList";

const Page = () => {
 return (
 <div className="">
    <h1 className="text-white text-md">Good morning, Nur 👋</h1>
    <p className="text-gray-500 text-xs mb-2">My Business General Early Stage</p>
    <DashboardSetup />
    <br />
    <Status />
    <br />
    <TodayAITaskList />
 </div>
 );
};

export default Page;