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

interface FormValues {
	phone_number: string;
	password?: string; // Optional if only phone login is used
}

const LoginForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const initialValues: FormValues = {
		phone_number: "",
		password: "Development@101", // Default password if backend requires it
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
					router.push("/age");
				});
				formik.resetForm();
			},
		},
	);

	const formik = useFormik({
		initialValues: initialValues,
		enableReinitialize: true,
		onSubmit: async (values) => {
			await loginMutation.mutateAsync(values);
		},
	});

	const currentYear = new Date().getFullYear();

	return (
		<>
			<main className='min-h-screen w-full grid grid-cols-1 lg:grid-cols-10 bg-white lg:bg-[#0A0A0A]'>
				{/* Left Column: Form Section */}
				<section className='col-span-1 lg:col-span-4 flex flex-col relative'>
					{/* MOBILE ONLY: Top Image and Overlapping Logo */}
					<div className='block lg:hidden relative'>
						<div
							className='h-64 w-full bg-cover bg-center'
							style={{
								backgroundImage: "url('/dev_images/onboarding_image.png')",
							}}
						/>
						<div className='absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-auto flex items-center justify-center p-2 z-10'>
							<div>
								<EstuMuzikLogo />
							</div>
						</div>
					</div>

					{/* Form Container */}
					<div className='w-full max-w-sm mx-auto flex flex-col justify-center flex-1 px-6 lg:px-0 mt-16 lg:mt-0'>
						<div className='space-y-8'>
							{/* Header Text: Switches between Image-style and Original-style */}
							<div className='space-y-2 text-center lg:text-left'>
								<h1 className='text-3xl font-bold text-black lg:text-white tracking-tight'>
									<span className='lg:hidden'>Login Account</span>
									<span className='hidden lg:inline'>Welcome back</span>
								</h1>
								<p className='text-gray-500 lg:text-gray-400 text-sm font-medium'>
									<span className='lg:hidden'>
										Enter your personal data to login your account.
									</span>
									<span className='hidden lg:inline'>
										Welcome back! Please enter your details.
									</span>
								</p>
							</div>

							<FormikProvider value={formik}>
								<Form
									onSubmit={formik.handleSubmit}
									className='space-y-5 lg:pb-8'
								>
									<div className='space-y-2'>
										{/* Label visible on mobile to match screenshot */}
										<label className='block lg:hidden text-sm font-bold text-gray-700 ml-1'>
											Phone Number
										</label>

										<div className='relative'>
											<div className='absolute left-5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none'>
												<Picture
													src={flag}
													alt='NG'
													className='w-6 h-auto rounded-sm'
												/>
											</div>
											<input
												name='phone_number'
												type='tel'
												value={formik.values.phone_number}
												onChange={formik.handleChange}
												placeholder='Enter your phone number'
												className='w-full h-14 pl-16 pr-4 bg-[#F3F4F6] lg:bg-white rounded-xl lg:rounded-full text-black text-base font-medium outline-none border-2 border-transparent focus:border-primary-300/50 transition-all placeholder:text-gray-400'
											/>
										</div>
									</div>

									<button
										type='submit'
										disabled={loginMutation.isLoading}
										className='w-full h-14 bg-primary-300 hover:bg-primary-600 text-white rounded-xl lg:rounded-full font-bold text-lg transition-all active:scale-95 flex items-center justify-center'
									>
										{loginMutation.isLoading ? "Please wait..." : "Continue"}
									</button>
								</Form>
							</FormikProvider>
						</div>
					</div>

					{/* Bottom Copyright - Hidden on mobile if you want it exactly like the screenshot */}
					<div className='mt-auto pt-8 pb-8 px-6 hidden lg:block'>
						<p className='text-gray-500 text-xs'>© Jolly {currentYear}</p>
					</div>
				</section>

				{/* Right Column: Hero Visuals (REMAINING UNCHANGED FROM INITIAL CODE) */}
				<section className='hidden lg:block relative col-span-6 h-screen overflow-hidden'>
					<div
						style={{
							backgroundImage: "url(/dev_images/onboarding_image.png)",
							backgroundPosition: "center",
							backgroundSize: "cover",
						}}
						className='w-full h-full flex items-center justify-center relative'
					>
						<div className='absolute inset-0 bg-black/40'></div>

						<div className='relative z-10 flex flex-col items-center text-center px-12'>
							<div className='scale-150 mb-12'>
								<EstuMuzikLogo />
							</div>

							<div className='space-y-6'>
								<h2 className='text-4xl xl:text-5xl font-black tracking-wider text-white leading-tight max-w-lg'>
									PODCASTS FOR
									<br />
									AFRICA, BY AFRICANS
								</h2>

								<span className='block text-sm font-bold tracking-[0.3em] text-white/90 uppercase mt-4'>
									BECOME A PODCAST CREATOR
								</span>
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
