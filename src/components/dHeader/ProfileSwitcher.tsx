"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LuBuilding2,
  LuChevronDown,
  LuCreditCard,
  LuLogOut,
  LuPencil,
  LuPlus,
  LuStar,
  LuTrash2,
} from "react-icons/lu";
import { ImSpinner6 } from "react-icons/im";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser, selectToken } from "@/redux/features/auth/authSlice";
import {
  useActivateBusinessProfileMutation,
  useCreateBusinessProfileMutation,
  useDeleteBusinessProfileMutation,
  useGetProfileContextQuery,
  useUpdateBusinessProfileMutation,
} from "@/redux/api/businessProfileApi";
import {
  profileDisplayName,
  profileSubtitle,
  type BusinessProfile,
  type CreateBusinessProfileDto,
} from "@/types/businessProfile";
import { getApiErrorMessage } from "@/utils/apiError";
import CreateBusinessProfileForm from "@/components/dashboard/CreateBusinessProfileForm";
import LeaveReviewModal from "./LeaveReviewModal";
import LogoutConfirmModal from "@/components/Header/LogoutConfirmModal";
import DeleteProfileConfirmModal from "./DeleteProfileConfirmModal";

const ProfileSwitcher = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectCurrentUser);
  const [open, setOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState<BusinessProfile | null>(
    null
  );
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [profileToDelete, setProfileToDelete] =
    useState<BusinessProfile | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isFetching } = useGetProfileContextQuery(undefined, {
    skip: !token,
  });

  const [activateProfile, { isLoading: isActivating }] =
    useActivateBusinessProfileMutation();
  const [createProfile, { isLoading: isCreating }] =
    useCreateBusinessProfileMutation();
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateBusinessProfileMutation();
  const [deleteProfile, { isLoading: isDeleting }] =
    useDeleteBusinessProfileMutation();

  const activeProfile = data?.activeProfile;
  const profiles = data?.profiles ?? [];
  const formOpen = showAddForm || !!editingProfile;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setShowAddForm(false);
        setEditingProfile(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setOpen(false);
    setLogoutConfirmOpen(true);
  };

  const confirmLogout = () => {
    dispatch(logout());
    setLogoutConfirmOpen(false);
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

  const handleUpdate = async (data: CreateBusinessProfileDto) => {
    if (!editingProfile) return;

    try {
      await updateProfile({ id: editingProfile.id, body: data }).unwrap();
      setEditingProfile(null);
      toast.success("Business profile updated");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to update profile"));
    }
  };

  const startEdit = (profile: BusinessProfile, event: React.MouseEvent) => {
    event.stopPropagation();
    setShowAddForm(false);
    setEditingProfile(profile);
  };

  const startDelete = (profile: BusinessProfile, event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(false);
    setProfileToDelete(profile);
  };

  const confirmDelete = async () => {
    if (!profileToDelete) return;

    try {
      await deleteProfile(profileToDelete.id).unwrap();
      toast.success(`Deleted ${profileDisplayName(profileToDelete)}`);
      setProfileToDelete(null);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to delete profile"));
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
        <div
          className={`absolute right-0 top-[calc(100%+6px)] z-[100] bg-[#14151a] border border-[#2c2d32] rounded-xl shadow-2xl overflow-hidden ${
            formOpen ? "w-[320px]" : "w-[280px]"
          }`}
        >
          {user?.name && (
            <div className="px-4 py-2.5 border-b border-[#2c2d32]">
              <p className="text-[#6b6b8a] text-[11px] truncate">
                Signed in as {user.name}
              </p>
            </div>
          )}

          {!formOpen && (
            <div className="max-h-[220px] overflow-y-auto py-1">
              {profiles.map((profile) => {
                const isActive = profile.id === activeProfile?.id;
                return (
                  <div
                    key={profile.id}
                    className={`flex items-center gap-1 px-2 hover:bg-[#1c1d24] transition-colors ${
                      isActive ? "bg-[#6C5CE7]/10" : ""
                    }`}
                  >
                    <button
                      type="button"
                      disabled={isActivating}
                      onClick={() => handleActivate(profile)}
                      className="flex-1 min-w-0 text-left px-2 py-2.5 disabled:opacity-60"
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
                    <button
                      type="button"
                      title="Edit business"
                      onClick={(e) => startEdit(profile, e)}
                      className="shrink-0 p-2 text-[#6b6b8a] hover:text-white rounded-md transition-colors"
                    >
                      <LuPencil size={14} />
                    </button>
                    {profiles.length > 1 && (
                      <button
                        type="button"
                        title="Delete business"
                        onClick={(e) => startDelete(profile, e)}
                        className="shrink-0 p-2 text-[#6b6b8a] hover:text-red-400 rounded-md transition-colors"
                      >
                        <LuTrash2 size={14} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="border-t border-[#2c2d32] p-2 space-y-1">
            {editingProfile ? (
              <CreateBusinessProfileForm
                key={editingProfile.id}
                initialProfile={editingProfile}
                onSubmit={handleUpdate}
                onCancel={() => setEditingProfile(null)}
                isSubmitting={isUpdating}
                submitLabel="Save changes"
                submittingLabel="Saving..."
              />
            ) : showAddForm ? (
              <CreateBusinessProfileForm
                onSubmit={handleCreate}
                onCancel={() => setShowAddForm(false)}
                isSubmitting={isCreating}
              />
            ) : (
              <button
                type="button"
                onClick={() => {
                  setEditingProfile(null);
                  setShowAddForm(true);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-[#c8c8cf] hover:bg-[#1c1d24] rounded-md text-sm transition-colors"
              >
                <LuPlus size={16} />
                Add business
              </button>
            )}

            {!formOpen && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    router.push("/billing");
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[#c8c8cf] hover:bg-[#1c1d24] rounded-md text-sm transition-colors"
                >
                  <LuCreditCard size={16} />
                  Billing
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setShowReviewModal(true);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[#c8c8cf] hover:bg-[#1c1d24] rounded-md text-sm transition-colors"
                >
                  <LuStar size={16} />
                  Rate your experience
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[#f87171] hover:bg-[#1c1d24] rounded-md text-sm transition-colors"
                >
                  <LuLogOut size={16} />
                  Log out
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <LeaveReviewModal
        open={showReviewModal}
        onClose={() => setShowReviewModal(false)}
      />
      <LogoutConfirmModal
        open={logoutConfirmOpen}
        onContinue={() => setLogoutConfirmOpen(false)}
        onLogout={confirmLogout}
      />
      <DeleteProfileConfirmModal
        open={!!profileToDelete}
        profileName={
          profileToDelete ? profileDisplayName(profileToDelete) : ""
        }
        isDeleting={isDeleting}
        onCancel={() => setProfileToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ProfileSwitcher;
