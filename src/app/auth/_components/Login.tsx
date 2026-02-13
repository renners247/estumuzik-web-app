"use client";

import { useState } from "react";
import { flag } from "../../../../public";
import Picture from "@/components/picture/Index";
import { EstuMuzikLogo } from "@/components/utils/function";

const LoginForm: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting phone number:", phoneNumber);
    // Add navigation or API call logic here
  };

  return (
    <main className="min-h-screen w-full grid grid-cols-10 bg-black-600 relative">
      {/* Left Column: Form & Login */}
      <section className="col-span-4 p-8 md:p-12 lg:p-16 relative min-h-screen md:min-h-0 flex items-center justify-center">
        <div className="w-full max-w-sm mx-auto md:mx-0 flex flex-col justify-center h-full">
          <div className="absolute top-8 left-8">
            <EstuMuzikLogo />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl tracking-tight text-white raleway-bold">
                Welcome back
              </h1>
              <p className="text-gray-200 text-base font-medium poppins-regular">
                Welcome back! Please enter your details.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center space-x-2 pointer-events-none">
                  <Picture src={flag} alt="" className="w-auto h-auto" />
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full h-14 pl-14 pr-4 bg-white rounded-full text-black text-sm font-medium outline-none focus:ring-2 focus:ring-gray-600 transition-all placeholder:text-gray-400"
                />
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center space-x-2 pointer-events-none">
                  <Picture src={flag} alt="" className="w-auto h-auto" />
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full h-14 pl-14 pr-4 bg-white rounded-full text-black text-sm font-medium outline-none focus:ring-2 focus:ring-gray-600 transition-all placeholder:text-gray-400"
                />
              </div>

              <button
                type="submit"
                className="w-full h-14 bg-secondary-300 hover:bg-secondary-300/90 text-white rounded-full font-bold transition-colors flex items-center justify-center"
              >
                Continue
              </button>
            </form>

            <p className="text-white text-xs text-center jost">
              By proceeding, you agree and accept our{" "}
              <a
                href="#"
                className="underline hover:text-white transition-colors"
              >
                T&C
              </a>
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-gray-50 text-xs mt-auto absolute bottom-4 left-4">
          © Jolly 2023
        </div>
      </section>

      {/* Right Column: Hero Visuals */}
      <section className="relative col-span-6">
        <div
          // className="h-auto relative"
          style={{
            backgroundImage: "url(/dev_images/onboarding_image.png)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          id="hero"
          className="flex items-center justify-center p-12 h-screen"
        >
          {/* Brand Overlay Content */}
          <div className="relative flex flex-col items-center text-center space-y-6">
            <EstuMuzikLogo />

            <div className="space-y-8">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-wider leading-loose text-white max-w-md mx-auto">
                PODCASTS FOR
                <br />
                AFRICA, BY AFRICANS
              </h2>

              <span className="block text-sm font-bold tracking-[0.2em] text-white jost">
                BECOME A PODCAST CREATOR
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginForm;
