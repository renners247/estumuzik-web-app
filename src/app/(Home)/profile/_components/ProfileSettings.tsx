"use client";

import TextInput from "@/components/reusables/TextInput";
import { Form, FormikProvider, useFormik } from "formik";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { APICall } from "@/components/utils/extra";
import { getUser, updateUser } from "@/components/utils/endpoints";
import * as Yup from "yup";
import { FaCamera } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import Picture from "@/components/picture/Index";
import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";

interface ProfileFormValues {
  first_name: string;
  last_name: string;
  // username: string;
  phone_number: string;
  email: string;
  profile_picture?: File | null;
}

const ProfileSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  // username: Yup.string().required("Username is required"),
  phone_number: Yup.string().required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ProfileSettings = () => {
  const queryClient = useQueryClient();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Fetch profile
  const {
    data: profileData,
    isLoading: profileLoading,
    error: profileError,
  } = useQuery(
    ["profile"],
    async () => {
      const response = await APICall(getUser);
      return response?.data?.data;
    },
    {
      staleTime: Infinity,
      refetchOnWindowFocus: true,
      cacheTime: 0,
    },
  );

  // Update profile (including image)
  const updateProfileMutation = useMutation(
    (data: ProfileFormValues) => APICall(updateUser, data, true, true),
    {
      onSuccess: (data: any) => {
        queryClient.invalidateQueries("profile");
        setPreviewUrl(null);
      },
    },
  );

  const initialValues: ProfileFormValues = {
    first_name: profileData?.data?.user?.first_name || "",
    last_name: profileData?.data?.user?.last_name || "",
    // username: profileData?.user?.username || "",
    phone_number: profileData?.data?.user?.phone_number || "",
    email: profileData?.data?.user?.email || "",
    profile_picture: null,
  };

  const formik = useFormik<ProfileFormValues>({
    initialValues,
    validationSchema: ProfileSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const submissionData: ProfileFormValues = {
        first_name: values.first_name,
        last_name: values.last_name,
        // username: values.username,
        phone_number: `+${values.phone_number}`,
        email: values.email,
        profile_picture: values.profile_picture,
      };
      updateProfileMutation.mutate(submissionData);
    },
  });

  // Generate preview URL for the selected file
  const getPreviewUrl = () => {
    if (previewUrl) {
      return previewUrl;
    }
    return profileData?.data.profile_picture || null;
  };

  return (
    <div className="px-2 sm:px-4 pb-5 w-full md:w-[805px] items-start max-w-[950px] overflow-y-auto">
      <h1 className="text-xl sm:text-2xl lg:text-3xl text-center sm:text-start font-bold leading-[1.9rem] text-white mb-4 sm:mb-7">
        Profile
      </h1>
      <div className="border border-amber-50 pt-6 pb-8 sm:py-8 px-2 sm:px-5 rounded-lg">
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit} className="">
            <div className="space-y-5 mt-3 sm:mt-6">
              <div className="flex flex-col items-center gap-2">
                <label className="block text-white text-sm font-medium mb-1">
                  Profile Image
                </label>
                <div className="relative group w-28 h-28">
                  <div className="w-28 h-28 rounded-full overflow-hidden bg-zinc-800 border-4 border-primary-100 shadow-lg flex items-center justify-center transition-all duration-200">
                    {profileLoading ? (
                      <div className="animate-pulse flex items-center justify-center w-full h-full">
                        <div className="rounded-full bg-gray-700 w-full h-full"></div>
                      </div>
                    ) : getPreviewUrl() ? (
                      <Picture
                        src={getPreviewUrl()!}
                        alt="Profile Preview"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-white/80 text-3xl font-bold select-none">
                        {formik.values.first_name &&
                        formik.values.first_name.trim().length > 0
                          ? formik.values.first_name
                              .trim()
                              .split(" ")
                              .map((word) => word[0]?.toUpperCase())
                              .join("")
                              .slice(0, 2)
                          : "?"}
                      </span>
                    )}
                    {(formik.values.profile_picture ||
                      profileData?.data.profile_picture) && (
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-black/60 rounded-full p-1 text-white hover:bg-red-500 transition"
                        onClick={() => {
                          formik.setFieldValue("profile_picture", null);
                          setPreviewUrl(null);
                          const fileInput = document.getElementById(
                            "profile-image-upload",
                          ) as HTMLInputElement;
                          if (fileInput) fileInput.value = "";
                        }}
                        title="Remove"
                      >
                        <GoPencil size={16} />
                      </button>
                    )}
                    <label
                      htmlFor="profile-image-upload"
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      title="Change profile image"
                    >
                      <FaCamera className="text-white text-2xl" />
                      <input
                        id="profile-image-upload"
                        type="file"
                        accept="image/jpeg,image/png,image/jpg,image/gif"
                        onChange={(e) => {
                          if (
                            e.currentTarget.files &&
                            e.currentTarget.files[0]
                          ) {
                            const file = e.currentTarget.files[0];

                            formik.setFieldValue("profile_picture", file);
                            setPreviewUrl(URL.createObjectURL(file));
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <TextInput
                  id="first_name"
                  label="First Name"
                  type="text"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full pl-10 pr-2.5 py-3 text-xs md:text-base border border-white focus:border-transparent bg-transparent rounded-md outline-none text-white placeholder:text-gray-400 ${
                    formik.touched.first_name && formik.errors.first_name
                      ? "border-red-500"
                      : "border-black-300"
                  }`}
                  placeholder=""
                  readonly={profileData?.data?.user?.first_name !== null}
                />
                <TextInput
                  id="last_name"
                  label="Last Name"
                  type="text"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full pl-10 pr-2.5 py-3 text-xs md:text-base border border-white focus:border-transparent bg-transparent rounded-md outline-none text-white placeholder:text-gray-400 ${
                    formik.touched.last_name && formik.errors.last_name
                      ? "border-red-500"
                      : "border-black-300"
                  }`}
                  placeholder=""
                  readonly={profileData?.data?.last_name !== null}
                />
                <TextInput
                  id="phone_number"
                  label="Phone Number"
                  type="text"
                  value={
                    formik.values.phone_number
                      ? `+${formik.values.phone_number}`
                      : ""
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full pl-10 pr-2.5 py-3 text-xs md:text-base border border-white focus:border-transparent bg-transparent rounded-md outline-none text-white placeholder:text-gray-400 ${
                    formik.touched.phone_number && formik.errors.phone_number
                      ? "border-red-500"
                      : "border-black-300"
                  }`}
                  placeholder=""
                  readonly={profileData?.data?.phone_number !== null}
                />
                <TextInput
                  id="email"
                  label="Email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full pl-10 pr-2.5 py-3 text-xs md:text-base border border-white focus:border-transparent bg-transparent rounded-md outline-none text-white placeholder:text-gray-400 ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : "border-black-300"
                  }`}
                  placeholder=""
                />
              </div>
            </div>
            <div className="flex lg:grid grid-cols-3 gap-4 mt-8">
              <button
                type="button"
                className="w-full border border-amber-400 text-sm sm:text-base text-white flex justify-center items-center py-3 font-medium rounded-md hover:text-white transition-[.4] col-span-1"
                onClick={() => {
                  formik.resetForm();
                  setPreviewUrl(null);
                  const fileInput = document.getElementById(
                    "profile-image-upload",
                  ) as HTMLInputElement;
                  if (fileInput) fileInput.value = "";
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full bg-amber-400 text-sm sm:text-base text-white flex justify-center items-center py-3 font-medium rounded-md hover:bg-amber-400/90 transition-[.4] col-span-2"
                disabled={updateProfileMutation.isLoading}
              >
                {updateProfileMutation.isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <ImSpinner2 className="animate-spin" />
                  </span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default ProfileSettings;
