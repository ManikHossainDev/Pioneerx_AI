"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import logo from "@/assets/logo/logo.png";
import Image from "next/image";
import {
  useForgetPasswordMutation,
  useLoginMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
} from "@/redux/features/auth/authApi";
import { useState } from "react";
import { ImSpinner6 } from "react-icons/im";
import { IoEyeOutline, IoEyeOffOutline, IoArrowBackOutline } from "react-icons/io5";
import { HiLightBulb } from "react-icons/hi";
import { TbPlant2, TbChartLine } from "react-icons/tb";
import OTPInput from "react-otp-input";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";

// ─── Types ────────────────────────────────────────────────────────────────────
interface SignupData {
  name: string;
  email: string;
  password: string;
}

// ─── Auth Steps ───────────────────────────────────────────────────────────────
const STEPS = {
  LOGIN: "login",
  SIGNUP: "signup",
  BUSINESS_PROFILE: "business_profile",
  FORGOT: "forgot",
  VERIFY_OTP: "verify_otp",
  VERIFY_ACCOUNT_OTP: "verify_account_otp",
  RESET_PASSWORD: "reset_password",
};

// ─── Shared Styles ────────────────────────────────────────────────────────────
const inputClass =
  "w-full bg-transparent border border-[#2a2840] rounded-lg px-4 py-3 text-[#ddd] text-sm placeholder-[#444460] outline-none focus:border-[#7C6FE0] transition";

const primaryBtn =
  "w-full py-3 bg-[#6C5CE7] hover:bg-[#5a4dd4] text-white rounded-lg text-sm font-semibold tracking-wide transition flex items-center justify-center gap-2";

// ─── PioneerX Logo ────────────────────────────────────────────────────────────
const PioneerXLogo = () => (
  <div className="flex items-center justify-center gap-2 mb-2">
    <Image src={logo} alt="PioneerX Logo" className="w-6 h-6 object-contain" />
    <span className="text-white text-lg font-semibold tracking-wide">PioneerX</span>
  </div>
);

// ─── Step Indicator ───────────────────────────────────────────────────────────
const StepIndicator = ({ currentStep }: { currentStep: 1 | 2 }) => (
  <div className="flex items-center justify-center gap-2 mb-6">
    <div
      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
        currentStep >= 1 ? "bg-[#6C5CE7] text-white" : "bg-[#2a2840] text-[#888]"
      }`}
    >
      1
    </div>
    <div className={`h-[1px] w-10 ${currentStep >= 2 ? "bg-[#6C5CE7]" : "bg-[#2a2840]"}`} />
    <div
      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
        currentStep >= 2 ? "bg-[#6C5CE7] text-white" : "bg-[#2a2840] text-[#888]"
      }`}
    >
      2
    </div>
  </div>
);

// ─── Password Input ───────────────────────────────────────────────────────────
const PasswordInput = ({
  value,
  onChange,
  placeholder,
  name,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name?: string;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        className={inputClass + " pr-10"}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555570]"
      >
        {show ? <IoEyeOffOutline size={16} /> : <IoEyeOutline size={16} />}
      </button>
    </div>
  );
};

// ─── Card Wrapper ─────────────────────────────────────────────────────────────
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-[#0e0e14] rounded-2xl px-8 py-10 w-full shadow-[0_0_0_1px_#1e1e2e]">
    {children}
  </div>
);

const FormLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-[#8888aa] text-xs mb-1.5">{children}</label>
);

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center gap-2 text-[#8888aa] text-sm mb-5"
  >
    <span className="w-7 h-7 rounded-full border border-[#3a3a5a] flex items-center justify-center">
      <IoArrowBackOutline size={14} />
    </span>
  </button>
);

// ─── OTP Input Style ──────────────────────────────────────────────────────────
const otpInputStyle = {
  width: "48px",
  height: "52px",
  background: "#12111a",
  border: "1px solid #2a2840",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "20px",
  fontWeight: "600",
  textAlign: "center" as const,
  outline: "none",
  marginRight: "8px",
};

// ─── Screen 1: Login ──────────────────────────────────────────────────────────
const LoginScreen = ({
  onNavigate,
  onClose,
}: {
  onNavigate: (step: string) => void;
  onClose?: () => void;
}) => {
  const [fields, setFields] = useState({ email: "", password: "" });
  const [login, { isLoading }] = useLoginMutation?.() ?? [() => {}, {}];
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email: fields.email, password: fields.password }).unwrap();
      if (res?.statusCode === 200) {
        dispatch(setUser({ user: res.data, token: res.tokens.accessToken }));
        toast.success("Logged in successfully");
        onClose?.();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong during login");
    }
  };

  return (
    <Card>
      <PioneerXLogo />
      <h2 className="text-2xl font-bold text-white text-center mb-1">Sign In</h2>
      <p className="text-[#6b6a8a] text-xs text-center mb-6">
        Put correct information to get access
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <FormLabel>Email</FormLabel>
          <input
            type="email"
            className={inputClass}
            placeholder="Enter your email"
            value={fields.email}
            onChange={(e) => setFields({ ...fields, email: e.target.value })}
          />
        </div>
        <div>
          <FormLabel>Password</FormLabel>
          <PasswordInput
            value={fields.password}
            placeholder="Enter your password"
            onChange={(e) => setFields({ ...fields, password: e.target.value })}
          />
        </div>

        <div className="text-right -mt-2">
          <button
            type="button"
            className="text-[#7C6FE0] text-xs"
            onClick={() => onNavigate(STEPS.FORGOT)}
          >
            Forgot password?
          </button>
        </div>

        <button type="submit" disabled={isLoading as boolean} className={primaryBtn}>
          {isLoading ? (
            <>
              <ImSpinner6 className="animate-spin size-4" /> Signing in...
            </>
          ) : (
            <>Login</>
          )}
        </button>
      </form>

      <p className="text-center text-xs text-[#6b6a8a] mt-5">
        Don&apos;t have an account?{" "}
        <button type="button" className="text-[#7C6FE0]" onClick={() => onNavigate(STEPS.SIGNUP)}>
          Sign up free
        </button>
      </p>
    </Card>
  );
};

// ─── Screen 2: Sign Up — Step 1
// No API call here. Just collects data and saves it to parent via onSignupDataReady.
// ─────────────────────────────────────────────────────────────────────────────
const SignupScreen = ({
  onNavigate,
  onSignupDataReady,
}: {
  onNavigate: (step: string) => void;
  onSignupDataReady: (data: SignupData) => void;
  onClose?: () => void;
}) => {
  const [fields, setFields] = useState({ name: "", email: "", password: "" });

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fields.name || !fields.email || !fields.password) {
      toast.error("Please fill in all fields");
      return;
    }
    // Save to parent state — no API call yet
    onSignupDataReady({ name: fields.name, email: fields.email, password: fields.password });
    onNavigate(STEPS.BUSINESS_PROFILE);
  };

  return (
    <Card>
      <PioneerXLogo />
      <h2 className="text-2xl font-bold text-white text-center mb-1">Create Your Account</h2>
      <p className="text-[#6b6a8a] text-xs text-center mb-1">
        Free to start · No credit card required · Upgrade anytime
      </p>

      <StepIndicator currentStep={1} />

      <form onSubmit={handleContinue} className="space-y-4">
        <div>
          <FormLabel>Full Name</FormLabel>
          <input
            type="text"
            className={inputClass}
            placeholder="Your Full Name"
            value={fields.name}
            onChange={(e) => setFields({ ...fields, name: e.target.value })}
          />
        </div>
        <div>
          <FormLabel>Email</FormLabel>
          <input
            type="email"
            className={inputClass}
            placeholder="Your Email Address"
            value={fields.email}
            onChange={(e) => setFields({ ...fields, email: e.target.value })}
          />
        </div>
        <div>
          <FormLabel>Password</FormLabel>
          <PasswordInput
            value={fields.password}
            placeholder="Create a password"
            onChange={(e) => setFields({ ...fields, password: e.target.value })}
          />
        </div>

        {/* Continue saves data & opens Business Profile — no API call */}
        <button type="submit" className={primaryBtn}>
          Sign Up
        </button>
      </form>

      <p className="text-center text-xs text-[#6b6a8a] mt-5">
        Already have an account?{" "}
        <button type="button" className="text-[#7C6FE0]" onClick={() => onNavigate(STEPS.LOGIN)}>
          Sign In
        </button>
      </p>
    </Card>
  );
};

// ─── Screen 3: Business Profile — Step 2
// register API is called here with signup data + business profile data combined.
// ─────────────────────────────────────────────────────────────────────────────
const BusinessProfileScreen = ({
  onNavigate,
  signupData,
}: {
  onNavigate: (step: string) => void;
  signupData: SignupData | null;
  onClose?: () => void;
}) => {
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [stage, setStage] = useState<"idea" | "early" | "scaling" | "">("");

  const [register, { isLoading }] = useRegisterMutation();

  const stages = [
    { key: "idea", label: "Idea", Icon: HiLightBulb },
    { key: "early", label: "Early", Icon: TbPlant2 },
    { key: "scaling", label: "Scaling", Icon: TbChartLine },
  ] as const;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signupData) {
      toast.error("Session expired. Please fill the sign up form again.");
      onNavigate(STEPS.SIGNUP);
      return;
    }

    try {
      // Single register call with all data combined
      const payload = {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        ...(businessName && { businessName }),
        ...(industry && { industry }),
        ...(stage && { businessStage: stage }),
      };

      const res = await register(payload).unwrap();

      if (res?.statusCode === 201) {
        localStorage.setItem("verify_email", signupData.email);
        toast.success("Account created! Please verify your email.");
        onNavigate(STEPS.VERIFY_ACCOUNT_OTP);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create account");
    }
  };

  return (
    <Card>
      <div className="flex justify-center mb-4">
        <div className="w-10 h-10 rounded-full bg-[#6C5CE7] flex items-center justify-center text-white text-sm font-bold">
          P
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white text-center mb-1">
        Set Up Your Business Profile
      </h2>
      <p className="text-[#6b6a8a] text-xs text-center mb-4">
        Help us personalize your AI advisor and recommendations.
      </p>

      <StepIndicator currentStep={2} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <FormLabel>Business Name (optional)</FormLabel>
          <input
            type="text"
            className={inputClass}
            placeholder=""
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>

        <div>
          <FormLabel>Industry</FormLabel>
          <div className="relative">
            <select
              className={inputClass + " appearance-none cursor-pointer"}
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value="" disabled>Select your Industry</option>
              <option value="tech">Technology</option>
              <option value="finance">Finance</option>
              <option value="health">Healthcare</option>
              <option value="education">Education</option>
              <option value="retail">Retail</option>
              <option value="other">Other</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555570] pointer-events-none text-xs">
              ▾
            </span>
          </div>
        </div>

        <div>
          <FormLabel>Business Stage</FormLabel>
          <div className="grid grid-cols-3 gap-2">
            {stages.map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setStage(key)}
                className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-lg border text-xs font-medium transition
                  ${
                    stage === key
                      ? "border-[#6C5CE7] text-white bg-[#6C5CE7]/10"
                      : "border-[#2a2840] text-[#8888aa] hover:border-[#6C5CE7]/50"
                  }`}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* This Continue calls register API with signup + business data */}
        <button type="submit" disabled={isLoading} className={primaryBtn}>
          {isLoading ? (
            <>
              <ImSpinner6 className="animate-spin size-4" /> Creating account...
            </>
          ) : (
            <>Register</>
          )}
        </button>
      </form>

      <p className="text-center text-xs text-[#6b6a8a] mt-5">
        Already have an account?{" "}
        <button type="button" className="text-[#7C6FE0]" onClick={() => onNavigate(STEPS.LOGIN)}>
          Sign In
        </button>
      </p>
    </Card>
  );
};

// ─── Screen 4: Forgot Password ────────────────────────────────────────────────
const ForgotScreen = ({ onNavigate }: { onNavigate: (step: string) => void }) => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgetPasswordMutation?.() ?? [() => {}, {}];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await (forgotPassword({ email }) as any).unwrap();
      if (res?.statusCode === 200) {
        localStorage.setItem("verify_email", email);
        toast.success("Reset code sent to your email");
        onNavigate(STEPS.VERIFY_OTP);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send reset link");
    }
  };

  return (
    <Card>
      <BackButton onClick={() => onNavigate(STEPS.LOGIN)} />
      <PioneerXLogo />
      <h2 className="text-xl font-bold text-white mb-2">Forgot Password?</h2>
      <p className="text-[#6b6a8a] text-xs mb-6 leading-relaxed">
        Enter the email associated with your account.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <FormLabel>Email</FormLabel>
          <input
            type="email"
            className={inputClass}
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isLoading as boolean} className={primaryBtn}>
          {isLoading ? (
            <><ImSpinner6 className="animate-spin size-4" /> Sending...</>
          ) : (
            <>Forgot Password</>
          )}
        </button>
      </form>
    </Card>
  );
};

// ─── Screen 5: Verify Account OTP (registration flow) ────────────────────────
const VerifyOtpScreen = ({ onNavigate }: { onNavigate: (step: string) => void }) => {
  const [otp, setOtp] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyEmailMutation?.() ?? [() => {}, {}];
  const email = localStorage.getItem("verify_email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await (verifyOtp({ oneTimeCode: otp, email }) as any).unwrap();
      if (res?.statusCode === 200) {
        toast.success("Account verified successfully");
        onNavigate(STEPS.LOGIN);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid OTP");
    }
  };

  return (
    <Card>
      <BackButton onClick={() => onNavigate(STEPS.BUSINESS_PROFILE)} />
      <PioneerXLogo />
      <h2 className="text-xl font-bold text-white mb-2">Verify your Account</h2>
      <p className="text-[#6b6a8a] text-xs mb-6 leading-relaxed">
        We&apos;ve sent a 6-digit code to your email address.
        <br />
        Enter the code below to verify.
      </p>

      <form onSubmit={handleSubmit}>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputStyle={otpInputStyle}
          renderInput={(props: any) => <input {...props} />}
        />
        <p className="text-center text-xs text-[#6b6a8a] mt-4 mb-6">
          Didn&apos;t receive the code?{" "}
          <span className="text-[#7C6FE0] cursor-pointer">Resend</span>
        </p>
        <button
          type="submit"
          disabled={(isLoading as boolean) || otp.length < 6}
          className={primaryBtn + " disabled:opacity-50"}
        >
          {isLoading ? (
            <><ImSpinner6 className="animate-spin size-4" /> Verifying...</>
          ) : (
            <>Verify Account OTP</>
          )}
        </button>
      </form>
    </Card>
  );
};

// ─── Screen 6: Verify Email OTP (forgot password flow) ───────────────────────
const VerifyOtpEmailScreen = ({ onNavigate }: { onNavigate: (step: string) => void }) => {
  const [otp, setOtp] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyEmailMutation?.() ?? [() => {}, {}];
  const email = localStorage.getItem("verify_email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await (verifyOtp({ oneTimeCode: otp, email }) as any).unwrap();
      if (res?.statusCode === 200) {
        toast.success("Email verified successfully");
        onNavigate(STEPS.RESET_PASSWORD);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid OTP");
    }
  };

  return (
    <Card>
      <BackButton onClick={() => onNavigate(STEPS.FORGOT)} />
      <PioneerXLogo />
      <h2 className="text-xl font-bold text-white mb-2">Verify your Email</h2>
      <p className="text-[#6b6a8a] text-xs mb-6 leading-relaxed">
        We&apos;ve sent a 6-digit code to your email address.
        <br />
        Enter the code below to regain access.
      </p>

      <form onSubmit={handleSubmit}>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputStyle={otpInputStyle}
          renderInput={(props: any) => <input {...props} />}
        />
        <p className="text-center text-xs text-[#6b6a8a] mt-4 mb-6">
          Didn&apos;t receive the code?{" "}
          <span className="text-[#7C6FE0] cursor-pointer">Resend</span>
        </p>
        <button
          type="submit"
          disabled={(isLoading as boolean) || otp.length < 6}
          className={primaryBtn + " disabled:opacity-50"}
        >
          {isLoading ? (
            <><ImSpinner6 className="animate-spin size-4" /> Verifying...</>
          ) : (
            <>Verify Email OTP</>
          )}
        </button>
      </form>
    </Card>
  );
};

// ─── Screen 7: Reset Password ─────────────────────────────────────────────────
const ResetPasswordScreen = ({ onNavigate }: { onNavigate: (step: string) => void }) => {
  const [fields, setFields] = useState({ password: "", confirm: "" });
  const [ResetPassword, { isLoading }] = useResetPasswordMutation?.() ?? [() => {}, {}];
  const email = localStorage.getItem("verify_email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fields.password !== fields.confirm) return toast.error("Passwords do not match!");
    try {
      const res = await (ResetPassword({ password: fields.password, email }) as any).unwrap();
      if (res?.statusCode === 200) {
        toast.success("Password reset successfully");
        onNavigate(STEPS.LOGIN);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to reset password");
    }
  };

  return (
    <Card>
      <BackButton onClick={() => onNavigate(STEPS.VERIFY_OTP)} />
      <PioneerXLogo />
      <h2 className="text-xl font-bold text-white mb-2">Create new Password</h2>
      <p className="text-[#6b6a8a] text-xs mb-6 leading-relaxed">
        Set a new password to continue to access your account
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <FormLabel>Enter Password</FormLabel>
          <PasswordInput
            value={fields.password}
            placeholder="Enter password"
            onChange={(e) => setFields({ ...fields, password: e.target.value })}
          />
        </div>
        <div>
          <FormLabel>Re-enter Password</FormLabel>
          <PasswordInput
            value={fields.confirm}
            placeholder="Re-enter password"
            onChange={(e) => setFields({ ...fields, confirm: e.target.value })}
          />
        </div>
        <button type="submit" disabled={isLoading as boolean} className={primaryBtn}>
          {isLoading ? (
            <><ImSpinner6 className="animate-spin size-4" /> Updating...</>
          ) : (
            <>Reset Password </>
          )}
        </button>
      </form>
      
    </Card>
  );
};

// ─── Main Auth Component ──────────────────────────────────────────────────────
// signupData lives in parent so it survives screen transitions.
const PioneerxAuth = ({ onClose }: { onClose?: () => void }) => {
  const [step, setStep] = useState(STEPS.LOGIN);

  // Signup data kept alive between Step 1 and Step 2
  const [signupData, setSignupData] = useState<SignupData | null>(null);

  const screens: Record<string, React.ReactNode> = {
    [STEPS.LOGIN]: (
      <LoginScreen onNavigate={setStep} onClose={onClose} />
    ),
    [STEPS.SIGNUP]: (
      // onSignupDataReady → saves name/email/password to parent, no API call
      <SignupScreen
        onNavigate={setStep}
        onSignupDataReady={setSignupData}
        onClose={onClose}
      />
    ),
    [STEPS.BUSINESS_PROFILE]: (
      // register API called here with signupData + business profile merged
      <BusinessProfileScreen
        onNavigate={setStep}
        signupData={signupData}
        onClose={onClose}
      />
    ),
    [STEPS.FORGOT]: <ForgotScreen onNavigate={setStep} />,
    [STEPS.VERIFY_ACCOUNT_OTP]: <VerifyOtpScreen onNavigate={setStep} />,
    [STEPS.VERIFY_OTP]: <VerifyOtpEmailScreen onNavigate={setStep} />,
    [STEPS.RESET_PASSWORD]: <ResetPasswordScreen onNavigate={setStep} />,
  };

  return screens[step] || screens[STEPS.LOGIN];
};

export default PioneerxAuth;