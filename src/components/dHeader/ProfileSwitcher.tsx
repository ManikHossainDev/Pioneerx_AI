"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LuBuilding2, LuChevronDown, LuLogOut, LuPlus } from "react-icons/lu";
import { ImSpinner6 } from "react-icons/im";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser, selectToken } from "@/redux/features/auth/authSlice";
import {
  useActivateBusinessProfileMutation,
  useCreateBusinessProfileMutation,
  useGetProfileContextQuery,
} from "@/redux/api/businessProfileApi";
import {
  profileDisplayName,
  profileSubtitle,
  type BusinessProfile,
  type CreateBusinessProfileDto,
} from "@/types/businessProfile";
import { getApiErrorMessage } from "@/utils/apiError";
import CreateBusinessProfileForm from "@/components/dashboard/CreateBusinessProfileForm";

const ProfileSwitcher = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectCurrentUser);
  const [open, setOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isFetching } = useGetProfileContextQuery(undefined, {
    skip: !token,
  });

  const [activateProfile, { isLoading: isActivating }] =
    useActivateBusinessProfileMutation();
  const [createProfile, { isLoading: isCreating }] =
    useCreateBusinessProfileMutation();

  const activeProfile = data?.activeProfile;
  const profiles = data?.profiles ?? [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setShowAddForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    router.push("/");
  };

  const handleActivate = async (profile: BusinessProfile) => {
    if (profile.id === activeProfile?.id) {
      setOpen(false);
      return;
    }

    try {
      await activateProfile(profile.id).unwrap();
      toast.success(`Switched to ${profileDisplayName(profile)}`);
      setOpen(false);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to switch profile"));
    }
  };

  const handleCreate = async (data: CreateBusinessProfileDto) => {
    try {
      await createProfile(data).unwrap();
      setShowAddForm(false);
      toast.success("Business profile created");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to create profile"));
    }
  };

  if (!token) {
    return (
      <button
        title="Login"
        onClick={() => router.push("/login")}
        className="flex items-center justify-center w-9 h-9 bg-[#18191d] border border-[#2c2d32] rounded-md text-[#8a8a96] hover:bg-[#202126] hover:border-[#3c3d44] hover:text-white transition-all duration-150 cursor-pointer"
      >
        <LuBuilding2 size={18} />
      </button>
    );
  }

  const busy = isLoading || isFetching || isActivating;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 max-w-[220px] px-2.5 py-1.5 bg-[#18191d] border border-[#2c2d32] rounded-md text-[#c8c8cf] hover:bg-[#202126] hover:border-[#3c3d44] hover:text-white transition-all duration-150 cursor-pointer"
      >
        <LuBuilding2 size={16} className="text-[#8a8a96] shrink-0" />
        <span className="text-[13px] font-medium truncate">
          {activeProfile ? profileDisplayName(activeProfile) : "My Business"}
        </span>
        {busy ? (
          <ImSpinner6 className="animate-spin size-3.5 shrink-0" />
        ) : (
          <LuChevronDown size={14} className="text-[#8a8a96] shrink-0" />
        )}
      </button>

      {open && (
        <div className={`absolute right-0 top-[calc(100%+6px)] z-[100] bg-[#14151a] border border-[#2c2d32] rounded-xl shadow-2xl overflow-hidden ${showAddForm ? "w-[320px]" : "w-[280px]"}`}>
          <div className="px-4 py-3 border-b border-[#2c2d32]">
            <p className="text-[11px] uppercase tracking-wider text-[#6b6b8a] mb-0.5">
              Active Business
            </p>
            {activeProfile ? (
              <>
                <p className="text-white text-sm font-semibold truncate">
                  {profileDisplayName(activeProfile)}
                </p>
                <p className="text-[#8a8a96] text-xs truncate">
                  {profileSubtitle(activeProfile)}
                </p>
              </>
            ) : (
              <p className="text-[#8a8a96] text-xs">Loading profile...</p>
            )}
            {user?.name && (
              <p className="text-[#6b6b8a] text-[11px] mt-2 truncate">
                Signed in as {user.name}
              </p>
            )}
          </div>

          <div className="max-h-[220px] overflow-y-auto py-1">
            {profiles.map((profile) => {
              const isActive = profile.id === activeProfile?.id;
              return (
                <button
                  key={profile.id}
                  type="button"
                  disabled={isActivating}
                  onClick={() => handleActivate(profile)}
                  className={`w-full text-left px-4 py-2.5 hover:bg-[#1c1d24] transition-colors disabled:opacity-60 ${
                    isActive ? "bg-[#6C5CE7]/10" : ""
                  }`}
                >
                  <p
                    className={`text-sm truncate ${
                      isActive ? "text-white font-medium" : "text-[#c8c8cf]"
                    }`}
                  >
                    {profileDisplayName(profile)}
                    {isActive && (
                      <span className="ml-2 text-[10px] text-[#6C5CE7] uppercase">
                        Active
                      </span>
                    )}
                  </p>
                  <p className="text-[11px] text-[#6b6b8a] truncate">
                    {profileSubtitle(profile)}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="border-t border-[#2c2d32] p-2 space-y-1">
            {showAddForm ? (
              <CreateBusinessProfileForm
                onSubmit={handleCreate}
                onCancel={() => setShowAddForm(false)}
                isSubmitting={isCreating}
              />
            ) : (
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="w-full flex items-center gap-2 px-3 py-2 text-[#c8c8cf] hover:bg-[#1c1d24] rounded-md text-sm transition-colors"
              >
                <LuPlus size={16} />
                Add business
              </button>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-[#f87171] hover:bg-[#1c1d24] rounded-md text-sm transition-colors"
            >
              <LuLogOut size={16} />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSwitcher;
