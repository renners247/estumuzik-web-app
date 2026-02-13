"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FormikProvider, useFormik } from "formik";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";

// Reusable components from your pattern
import MyPhoneInput from "@/components/reusables/MyPhoneInput";
import { APICall } from "@/components/utils/extras";
import { login } from "@/components/utils/endpoint";
// Replace this with your actual logo component
const JollyLogo = () => (
  <div className="flex items-center gap-1">
    <Image
      src="/jolly-logo.png"
      alt="Jolly Logo"
      width={80}
      height={30}
      priority
    />
  </div>
);

const LoginPage = () => {
  const router = useRouter();

  const loginMutation = useMutation(
    (values: { phone_number: string }) => APICall(login, values, true, true),
    {
      onSuccess: (data) => {
        // ... your existing success logic (Cookies, Redux, etc.)
        router.push("/dashboard");
      },
    },
  );

  const formik = useFormik({
    initialValues: { phone_number: "" },
    // validationSchema: LoginSchema, // Apply your phone-only validation schema
    onSubmit: (values) => {
      loginMutation.mutate(values);
    },
  });

  return (
    <main className="flex flex-col md:flex-row min-h-screen w-full bg-[#0D0D0D] text-white overflow-hidden">
      {/* LEFT SECTION: Login Form */}
      <section className="relative w-full md:w-1/2 flex flex-col justify-between p-8 md:p-16">
        {/* Logo at Top Left */}
        <div className="mb-12">
          <JollyLogo />
        </div>

        {/* Form Container */}
        <div className="w-full max-w-[400px] mx-auto md:mx-0">
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-gray-400 text-sm">
              Welcome back! Please enter your details.
            </p>
          </div>

          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="relative">
                {/* Note: Ensure MyPhoneInput is styled with bg-white and rounded-full */}
                <MyPhoneInput
                  name="phone_number"
                  className="w-full bg-white text-black rounded-full py-4 px-6 outline-none"
                  placeholder="Enter your phone number"
                />
              </div>

              <button
                type="submit"
                disabled={loginMutation.isLoading}
                className="w-full bg-[#003838] hover:bg-[#004d4d] text-white font-semibold py-4 rounded-full transition-all flex justify-center items-center"
              >
                {loginMutation.isLoading ? (
                  <ImSpinner2 className="animate-spin text-xl" />
                ) : (
                  "Continue"
                )}
              </button>

              <p className="text-center md:text-left text-xs text-gray-400">
                By proceeding, you agree and accept our{" "}
                <Link
                  href="/terms"
                  className="underline hover:text-white transition-colors"
                >
                  T&C
                </Link>
              </p>
            </form>
          </FormikProvider>
        </div>

        {/* Footer Copyright */}
        <div className="mt-auto pt-8">
          <p className="text-[10px] text-gray-500">© Jolly 2023</p>
        </div>
      </section>

      {/* RIGHT SECTION: Hero Visual */}
      <section className="hidden md:flex relative w-1/2 h-screen">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-studio.jpg" // Add your actual image path here
            alt="Podcasters in studio"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />{" "}
          {/* Dark overlay to make text pop */}
        </div>

        {/* Centered Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full text-center p-12">
          <div className="mb-6">
            <Image
              src="/jolly-logo-large.png"
              alt="Jolly Large"
              width={180}
              height={60}
            />
          </div>

          <h2 className="text-2xl md:text-3xl font-black tracking-widest mb-4">
            PODCASTS FOR <br /> AFRICA, BY AFRICANS
          </h2>

          <Link
            href="/become-creator"
            className="text-sm font-bold tracking-widest hover:underline underline-offset-8 transition-all"
          >
            BECOME A PODCAST CREATOR
          </Link>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
