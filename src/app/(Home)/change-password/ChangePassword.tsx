"use client";

import * as Yup from "yup";
import { useState } from "react";
import { useMutation } from "react-query";
import { APICall } from "@/components/utils/extra";
import TextInput from "@/components/reusables/TextInput";
import { Form, FormikProvider, useFormik } from "formik";
import { updatePassword } from "@/components/utils/endpoints";

import { useAppSelector } from "@/components/Hooks";

interface SecurityFormValues {
  phone_number: string;
  old_password: string;
  new_password: string;
  password_confirmation: string;
}

const UpdatePasswordSchema = Yup.object().shape({
  old_password: Yup.string().required("Old password is required"),
  new_password: Yup.string().required("New password is required"),
  password_confirmation: Yup.string()
    .label("password_confirmation")
    // .required()
    .oneOf([Yup.ref("new_password")], "Passwords must match"),
});

const SecuritySettings = () => {
  const { user } = useAppSelector((state: any) => state.auth);
  const UserProfileData = user;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const SecurityValues: SecurityFormValues = {
    phone_number: "",
    old_password: "",
    new_password: "",
    password_confirmation: "",
  };

  // Update password
  const updatePasswordMutation = useMutation(
    (
      values: Pick<
        SecurityFormValues,
        "phone_number" | "old_password" | "new_password"
      >,
    ) =>
      APICall(
        updatePassword,
        {
          phone_number: UserProfileData?.phone_number,
          old_password: values.old_password,
          new_password: values.new_password,
        },
        true,
        true,
      ),
  );

  const formik = useFormik({
    initialValues: SecurityValues,
    validationSchema: UpdatePasswordSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm, setTouched, setErrors }) => {
      updatePasswordMutation.mutate(
        {
          phone_number: UserProfileData?.phone_number,
          old_password: values.old_password,
          new_password: values.new_password,
        },
        {
          onSuccess: () => {
            // Reset form and clear all validation states
            resetForm();
            setTouched({});
            setErrors({});

            // Also manually clear any field-level state
            setTimeout(() => {
              formik.setFieldValue("old_password", "", false);
              formik.setFieldValue("new_password", "", false);
              formik.setFieldValue("password_confirmation", "", false);
              formik.setFieldValue("phone_number", "", false);
            }, 0);
          },
        },
      );
    },
  });

  return (
    <div className="px-4 pb-5 w-full md:w-[805px] items-start max-w-[950px] overflow-y-auto">
      <h1 className="text-xl sm:text-2xl lg:text-3xl text-center sm:text-start font-bold leading-[1.9rem] text-white mb-4 sm:mb-7">
        Security
      </h1>
      <div className="border border-bg-900 rounded-lg pt-6 pb-8 sm:py-8 px-2 sm:px-5">
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit} className="">
            <div className={`space-y-1 sm:space-y-2`}>
              <h1
                className={`text-lg lg:text-3xl font-bold leading-[1.9rem] text-white`}
              >
                Update Password
              </h1>
              <p className="font-normal text-gray-600 line-clamp-2 leading-5 w-[85%] lg:w-full text-white/80">
                Enter your current password to update it
              </p>
            </div>

            <div className="space-y-5 mt-3 sm:mt-6">
              {/* Old Password */}
              <TextInput
                id="old_password"
                label="Current Password"
                type="text"
                className={`w-full px-2.5 py-5 lg:py-4 text-xs md:text-base border border-white focus:border-transparent bg-transparent rounded-md outline-none text-white placeholder:text-white/40 ${
                  formik.touched.old_password && formik.errors.old_password
                    ? "border-red-500"
                    : "border-black-300"
                }`}
                placeholder="Enter your current password"
                passwordIconClassname="top-6"
                togglePasswordVisibility={handlePasswordVisibility}
              />

              {/* New Password */}
              <TextInput
                id="new_password"
                label="Enter New Password"
                type={showPassword ? "text" : "password"}
                className={`w-full px-2.5 py-5 lg:py-4 text-xs md:text-base border border-white focus:border-transparent bg-transparent rounded-md outline-none text-white placeholder:text-white/40 ${
                  formik.touched.new_password && formik.errors.new_password
                    ? "border-red-500"
                    : "border-black-300"
                }`}
                placeholder="Enter your new password"
                passwordIconClassname="top-6"
                showPasswordIcon={true}
                showPassword={showPassword}
                togglePasswordVisibility={handlePasswordVisibility}
              />

              {/* Confirm Password */}
              <TextInput
                id="password_confirmation"
                label="Re-Enter New Password"
                type={showConfirmPassword ? "text" : "password"}
                className={`w-full px-2.5 py-5 lg:py-4 text-xs md:text-base border border-white focus:border-transparent bg-transparent rounded-md outline-none text-white placeholder:text-white/40 ${
                  formik.touched.password_confirmation &&
                  formik.errors.password_confirmation
                    ? "border-red-500"
                    : "border-black-300"
                }`}
                placeholder="Enter your new password again"
                passwordIconClassname="top-6"
                showPasswordIcon={true}
                showPassword={showConfirmPassword}
                togglePasswordVisibility={handleConfirmPasswordVisibility}
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                type="submit"
                className="border border-primary-500 text-sm sm:text-base text-primary-500 flex justify-center items-center py-3 font-medium rounded-md hover:bg-primary-500 hover:text-black-100 transition-[.4] w-[200px]"
                disabled={updatePasswordMutation.isLoading}
              >
                {updatePasswordMutation.isLoading
                  ? "Updating..."
                  : "Update Password"}
              </button>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default SecuritySettings;
