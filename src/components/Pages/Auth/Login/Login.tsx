"use client";

import Link from "next/link";
import GoogleAuthButton from "@/components/Pages/Auth/shared/GoogleAuthButton";
import MagicLinkForm from "@/components/Pages/Auth/shared/MagicLinkForm";
import AuthDivider from "@/components/Pages/Auth/shared/AuthDivider";
import AlreadySignedIn from "@/components/Pages/Auth/shared/AlreadySignedIn";
import DevPasswordLogin, {
  isDevPasswordLoginEnabled,
} from "@/components/Pages/Auth/shared/DevPasswordLogin";

const Login: React.FC = () => {
  const useDevLogin = isDevPasswordLoginEnabled();

  return (
    <section className="w-[90%] mx-auto h-[90vh] px-4 py-10 md:px-6 lg:px-10 bg-[#282828] mt-10 rounded-md">
      <div className="w-full h-full px-4 py-10 md:px-6 lg:px-10">
        <div className="w-full mx-auto">
          <div className="w-full max-w-[510px] mx-auto px-4 md:px-0">
            <div className="bg-[#5E5E5E] shadow-lg rounded-lg border-[3px] border-white">
              <div className="px-6 md:py-8 md:px-8 lg:px-10">
                <AlreadySignedIn variant="page">
                  <h2 className="text-xl md:text-2xl font-semibold text-white text-center">
                    Welcome back!
                  </h2>
                  <p className="text-center pb-5 text-white">
                    {useDevLogin
                      ? "Dev mode — sign in with email & password"
                      : "Enter your email to log in"}
                  </p>

                  {useDevLogin ? (
                    <DevPasswordLogin variant="page" />
                  ) : (
                    <MagicLinkForm variant="page" />
                  )}

                  <AuthDivider
                    label="Or continue with"
                    labelClassName="text-white/70"
                  />

                  <GoogleAuthButton />

                  <div className="mt-3 text-center font-bold">
                    <span className="text-white">Don&apos;t have an account?</span>
                    <Link
                      href="/register"
                      className="text-white font-semibold hover:underline ml-1"
                    >
                      Sign up
                    </Link>
                  </div>
                </AlreadySignedIn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
