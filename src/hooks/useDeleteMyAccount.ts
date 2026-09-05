"use client";

// Unused while delete-account UI is commented out.
// Uncomment authApi `deleteMyAccount` + UI wiring, then restore this hook.

// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { useDeleteMyAccountMutation } from "@/redux/features/auth/authApi";
// import { logout } from "@/redux/features/auth/authSlice";
// import { useAppDispatch } from "@/redux/hooks";
// import { getApiErrorMessage } from "@/utils/apiError";
//
// export function useDeleteMyAccount() {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const [deleteMyAccount, { isLoading }] = useDeleteMyAccountMutation();
//
//   const confirmDelete = async () => {
//     try {
//       await deleteMyAccount().unwrap();
//       dispatch(logout());
//       toast.success("Your account has been deleted");
//       router.push("/");
//     } catch (error) {
//       toast.error(getApiErrorMessage(error, "Failed to delete account"));
//     }
//   };
//
//   return { confirmDelete, isDeleting: isLoading };
// }

export function useDeleteMyAccount() {
  return {
    confirmDelete: async () => {},
    isDeleting: false,
  };
}
