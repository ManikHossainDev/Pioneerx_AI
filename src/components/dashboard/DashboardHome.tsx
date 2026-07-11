"use client";

import DashboardSetup from "@/components/dashboard/DashboardSetup";
import Status from "@/components/dashboard/status";
import TodayAITaskList from "@/components/dashboard/TodayAITaskList";
import { useGetProfileContextQuery } from "@/redux/api/businessProfileApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser, selectToken } from "@/redux/features/auth/authSlice";
import { profileDisplayName, profileSubtitle } from "@/types/businessProfile";

const DashboardHome = () => {
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectCurrentUser);
  const { data } = useGetProfileContextQuery(undefined, { skip: !token });

  const activeProfile = data?.activeProfile;
  const greetingName = user?.name?.split(" ")[0] || "there";

  return (
    <div>
      <h1 className="text-white text-md">Good morning, {greetingName} 👋</h1>
      <p className="text-gray-500 text-xs mb-2">
        {activeProfile
          ? `${profileDisplayName(activeProfile)} · ${profileSubtitle(activeProfile)}`
          : "Loading your business profile..."}
      </p>
      <DashboardSetup currentPhase={activeProfile?.currentPhase} />
      <br />
      <Status />
      <br />
      <TodayAITaskList />
    </div>
  );
};

export default DashboardHome;
