"use client";

import { useTransition } from "react";
import { flag } from "../../../../public";
import Picture from "@/components/picture/Index";
import { EstuMuzikLogo } from "@/components/utils/function";
import Cookies from "js-cookie";
import { Form, FormikProvider, useFormik } from "formik";
import { useMutation } from "react-query";
import { APICall } from "@/components/utils/extra";
import { login } from "@/components/utils/endpoints";
import { AUTH_TOKEN_KEY, hasSignedOut } from "@/components/utils/data";
import { useAppDispatch } from "@/components/Hooks";
import { authLogin, resetAuth } from "@/components/Redux/auth";
import { useRouter } from "next/navigation";
import GlobalLoader from "@/components/reusables/GlobalLoader";
import { AndriodButtons, AppleButtons } from "@/components/utils/buttons";
import { ImSpinner2 } from "react-icons/im";
import * as Yup from "yup";

interface FormValues {
  phone_number: string;
  password: string; // Keep for API but hidden from UI
}

// Phone number validation schema - digits only, must start with 234
const phoneValidationSchema = Yup.object({
  phone_number: Yup.string()
    .required("Phone number is required")
    .matches(
      /^234\d+$/,
      "Phone number must start with 234 and contain only digits",
    )
    .min(13, "Phone number must be at least 13 digits (including 234)")
    .max(15, "Phone number must not exceed 15 digits (including 234)"),
  password: Yup.string(), // No validation needed since it's hidden/default
});

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialValues: FormValues = {
    phone_number: "234", // Pre-filled with country code
    password: "Development@101", // Default password for API
  };

  const loginMutation = useMutation(
    (value: FormValues) => APICall(login, [value], true, true),
    {
      onSuccess: (data) => {
        const Token = data?.data?.data?.token;
        const User = data?.data?.data?.user;
        Cookies.set(AUTH_TOKEN_KEY as string, Token as string, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });
        dispatch(resetAuth());
        dispatch(authLogin({ token: Token, user: User }));
        hasSignedOut === false;
        startTransition(() => {
          router.push("/loggedIn");
        });
        formik.resetForm();
      },
    },
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: phoneValidationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      const data = {
        phone_number: values.phone_number,
        password: values.password, // Using the default password
      };
      await loginMutation.mutateAsync(data);
    },
  });

  // Handler to allow only digits and preserve 234 prefix
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Only allow digits
    const digitsOnly = value.replace(/\D/g, "");

    // Ensure it always starts with 234
    if (digitsOnly === "") {
      formik.setFieldValue("phone_number", "234");
    } else if (digitsOnly.startsWith("234")) {
      formik.setFieldValue("phone_number", digitsOnly);
    } else if (digitsOnly.startsWith("23")) {
      formik.setFieldValue("phone_number", "234" + digitsOnly.slice(2));
    } else if (digitsOnly.startsWith("2")) {
      formik.setFieldValue("phone_number", "234" + digitsOnly.slice(1));
    } else {
      formik.setFieldValue("phone_number", "234" + digitsOnly);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <main className="h-[90vh] lg:min-h-screen w-full grid grid-cols-1 lg:grid-cols-10 bg-white lg:bg-[#0A0A0A]">
        {/* Left Column: Form Section */}
        <section className="col-span-1 lg:col-span-4 flex flex-col relative">
          {/* MOBILE ONLY: Top Image and Overlapping Logo */}
          <div className="block lg:hidden relative">
            <div className="block lg:hidden relative w-full h-[40vh] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                style={{
                  backgroundImage: "url('/dev_images/onboarding_image.png')",
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10" />

              <div className="relative z-20 h-full flex flex-col justify-end p-3 pt-2 pb-8">
                <div className="space-y-3">
                  <h2 className="text-xl font-black tracking-wide uppercase text-white leading-[1.4]">
                    Enjoy access to <br />
                    Unlimited <span className="text-primary-500">
                      Podcasts
                    </span>{" "}
                    <br />
                    Worldwide
                  </h2>

                  <span className="block text-[10px] font-black tracking-[0.3em] text-white/70 uppercase">
                    Listen, learn, enjoy; anywhere, anytime!
                  </span>

                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <AndriodButtons />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute inset-0 w-[96%] mx-auto bg-cover bg-center transition-transform duration-1000 scale-105"
              style={{
                backgroundImage: "url('/dev_images/onboarding_image.png')",
              }}
            />

            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-auto flex items-center justify-center p-2 z-10">
              <div>
                <EstuMuzikLogo className="!w-12" />
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="w-full max-w-sm mx-auto flex flex-col justify-center flex-1 px-6 lg:px-0 mt-6 lg:mt-0">
            <div className="space-y-8">
              {/* Header Text */}
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold text-black lg:text-white tracking-tight">
                  <span className="lg:hidden">Login Account</span>
                  <span className="hidden lg:inline">Welcome back</span>
                </h1>
                <p className="text-gray-500 lg:text-gray-400 text-sm font-medium">
                  <span className="lg:hidden">
                    Enter your phone number to login your account.
                  </span>
                  <span className="hidden lg:inline">
                    Welcome back! Please enter your phone number.
                  </span>
                </p>
              </div>

              <FormikProvider value={formik}>
                <Form
                  onSubmit={formik.handleSubmit}
                  className="space-y-5 lg:pb-8"
                >
                  {/* Hidden password field - satisfies backend requirement */}
                  <input
                    type="hidden"
                    name="password"
                    value={formik.values.password}
                  />

                  <div className="space-y-2">
                    {/* Phone Number Label */}
                    <label className="text-sm font-medium mb-1 block text-black-200">
                      Phone Number
                    </label>

                    <div className="relative">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                        <Picture
                          src={flag}
                          alt="NG"
                          className="w-6 h-auto rounded-sm"
                        />
                      </div>
                      <input
                        name="phone_number"
                        type="tel"
                        inputMode="numeric"
                        pattern="\d*"
                        value={formik.values.phone_number}
                        onChange={handlePhoneNumberChange}
                        onBlur={formik.handleBlur}
                        placeholder="234XXXXXXXXX"
                        className={`w-full h-14 pl-16 pr-4 bg-[#F3F4F6] lg:bg-white rounded-xl lg:rounded-full text-black text-base font-medium outline-none border-2 transition-all placeholder:text-gray-400 ${
                          formik.touched.phone_number &&
                          formik.errors.phone_number
                            ? "border-red-500 focus:border-red-500"
                            : "border-transparent focus:border-primary-300/50"
                        }`}
                      />
                    </div>
                    {/* Error message */}
                    {formik.touched.phone_number &&
                      formik.errors.phone_number && (
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {formik.errors.phone_number}
                        </p>
                      )}
                  </div>

                  <button
                    type="submit"
                    disabled={!formik.isValid || loginMutation.isLoading}
                    className={`w-full h-14 text-white font-bold text-lg rounded-xl lg:rounded-full transition-all duration-200 flex items-center justify-center ${
                      formik.isValid && !loginMutation.isLoading
                        ? "bg-primary-300 hover:bg-primary-600 active:scale-95"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    {loginMutation.isLoading ? (
                      <ImSpinner2 className="text-xl animate-spin" />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </Form>
              </FormikProvider>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="mt-auto pt-8 pb-8 px-6 hidden lg:block">
            <p className="text-gray-500 text-xs">© {currentYear}</p>
          </div>
        </section>

        {/* Right Column: Hero Visuals */}
        <section className="hidden lg:block relative col-span-6 h-screen overflow-hidden">
          <div
            style={{
              backgroundImage: "url(/dev_images/onboarding_image.png)",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-full h-full flex items-center aspect-square justify-center relative"
          >
            <div className="absolute inset-0 bg-black-100/40"></div>

            <div className="relative z-10 flex flex-col items-center text-center px-12">
              <div className="scale-150 mb-12">
                <EstuMuzikLogo />
              </div>

              <div className="space-y-6">
                <h2 className="text-4xl xl:text-5xl font-black tracking-wider capitalize text-white leading-tight max-w-lg">
                  Enjoy access to Unlimited <br /> Podcast Worldwide
                </h2>

                <span className="block text-sm font-bold tracking-[0.3em] text-white/90 uppercase mt-4">
                  Listen, learn, enjoy; anywhere, anytime!
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-2 mt-5">
                <AndriodButtons />
                <AppleButtons />
              </div>
            </div>
          </div>
        </section>
      </main>
      <GlobalLoader isPending={isPending} />
    </>
  );
};

export default LoginForm;
