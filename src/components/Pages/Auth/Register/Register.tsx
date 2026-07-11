"use client";
import Link from "next/link";
import { Form, Checkbox, message } from "antd";
import GoogleAuthButton from "@/components/Pages/Auth/shared/GoogleAuthButton";
import AuthDivider from "@/components/Pages/Auth/shared/AuthDivider";
import InputComponent from "@/components/UI/InputComponent";import { FaLock, FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GiPhone } from "react-icons/gi";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";

interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  remember: boolean;
}

const Register: React.FC = () => {
  const [register, { isLoading }] = useRegisterMutation();

  const onFinish = async (values: RegisterFormValues) => {
    const registrationData = {
      name: values.fullName,
      email: values.email,
      password: values.password,
    };

    try {
      const res = await register(registrationData).unwrap();
      console.log("Registration Response: ", res);
      message.success("Registration successful! Please check your email for verification.");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      message.error(err?.data?.message || "Something went wrong during registration");
    }  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className=" w-[90%] mx-auto  px-4 py-20 md:px-6 lg:px-10 bg-[#282828] rounded-md my-10 ">
      <div className="w-full max-w-7xl mx-auto">
          {/* Form Content */}
          <div className="w-full max-w-[450px] mx-auto px-4 md:px-0">
            <div className="bg-[#5E5E5E] shadow-lg rounded-lg border-[3px] border-white">
              <div className="px-6 py-3 md:px-8 lg:px-10">
                <h2 className="text-xl md:text-2xl font-semibold text-white text-center ">
                  Create an Account
                </h2>
                <p className="text-center pb-2 text-white">Hello there, Let's start your journey with us.</p>
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  className="space-y-3"
                >
                  <Form.Item
                    label={<span className="text-white">Company  Name</span>}
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your full name",
                      },
                    ]}
                  >
                    <InputComponent placeholder="Enter Name" icon={FaUserCircle} />
                  </Form.Item>
                  <Form.Item
                    label={<span className="text-white">Company Email</span>}
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <InputComponent placeholder="Enter Email" icon={MdEmail} />
                  </Form.Item>
                  <Form.Item
                    label={<span className="text-white">Number Phone</span>}
                    name="number"
                    rules={[
                      { required: true, message: "Please enter your Phone" },
                    ]}
                  >
                    <InputComponent placeholder="Enter  Number"  icon={GiPhone} />
                  </Form.Item>
                  <Form.Item
                    label={<span className="text-white">Password</span>}
                    name="password"
                    rules={[
                      { required: true, message: "Please enter your password" },
                    ]}
                  >
                    <InputComponent placeholder="Enter Password" isPassword={true} icon={FaLock} />
                  </Form.Item>
                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox className="text-white">I accept the Terms of Service and Privacy Policy.</Checkbox>
                  </Form.Item>
                  <button 
                    type="submit" 
                    className="w-full px-5 py-3 bg-red-500 rounded text-white disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Sign up"}
                  </button>
                </Form>
                <div className="mt-2 text-center font-bold">
                  <span className="text-white">
                  Already have an account?
                  </span>
                  <Link
                    href="/login"
                    className="text-white font-semibold hover:underline ml-1"
                  >
                  Login
                  </Link>
                </div>
                <AuthDivider label="Or sign up with" labelClassName="text-white/70" />
                <GoogleAuthButton label="Continue with Google" />                </div>
              </div>
            </div>
          </div>
    </section>
  );
};

export default Register;
