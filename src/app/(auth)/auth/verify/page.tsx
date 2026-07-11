import { Suspense } from "react";
import MagicLinkVerifyClient from "./MagicLinkVerifyClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <section className="w-[90%] mx-auto min-h-[70vh] px-4 py-10 bg-[#282828] mt-10 rounded-md flex items-center justify-center">
          <p className="text-white">Loading...</p>
        </section>
      }
    >
      <MagicLinkVerifyClient />
    </Suspense>
  );
}
