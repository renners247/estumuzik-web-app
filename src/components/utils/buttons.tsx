import { Menu, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { BiChevronDown } from "react-icons/bi";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useEffect, useState } from "react";

interface GeneralDropdownOption {
	id: string | number;
	name: string;
	icon?: ReactNode;
	[key: string]: any;
}

interface GeneralDropdownProps {
	options: GeneralDropdownOption[];
	selectedOption: GeneralDropdownOption;
	onSelect: (option: any) => void;
	buttonContent?: ReactNode;
	placeholder?: string;
	className?: string;
	buttonClassName?: string;
	itemsClassName?: string;
	showCheckmark?: boolean;
	sectionTitle?: string;
	isLoading?: boolean;
}

export const AndriodButtons = () => {
	const { installApp, isInstallable, isStandalone } = usePWAInstall();

	// 1. HIDDEN IF ALREADY DOWNLOADED:
	// If the app is already installed and running, return null (no fallback)
	if (isStandalone) return null;

	// 2. DETECT iOS:
	// We check if the user is on an iPhone/iPad to show the App Store disguise
	const isIos =
		typeof window !== "undefined" &&
		/iPad|iPhone|iPod/.test(navigator.userAgent);

	// 3. ANDROID / CHROME / EDGE LOGIC:
	// If the browser supports the automated install prompt
	if (isInstallable) {
		return (
			<button
				onClick={installApp}
				className='flex items-center gap-x-2 justify-center bg-primary-400 hover:bg-primary-500 transition-all px-1 sm:px-4 py-2 sm:py-3 rounded-full shadow-lg active:scale-95 group border border-white/10'
			>
				<FaGooglePlay className='text-2xl text-black group-hover:scale-110 transition-transform' />
				<div className='flex flex-col items-start leading-tight'>
					<span className='text-[9px] font-bold text-black uppercase tracking-tighter'>
						Download for Free
					</span>
					<span className='text-xs lg:text-sm font-black text-black text-start -mt-1 tracking-tight'>
						Google Playstore
					</span>
				</div>
			</button>
		);
	}

	// 4. iOS DISGUISE:
	// If we are on iOS, show the App Store disguise (manual instructions)
	if (isIos) {
		return (
			<button
				onClick={() =>
					alert(
						"To install: \n1. Tap the 'Share' icon (square with arrow). \n2. Scroll down and tap 'Add to Home Screen'.",
					)
				}
				className='flex items-center gap-x-2 justify-center bg-primary-400 hover:bg-primary-500 px-1 sm:px-4 transition-all py-2 sm:py-3 rounded-full shadow-lg active:scale-95 group border border-white/10'
			>
				<FaApple className='text-3xl text-black group-hover:scale-110 transition-transform' />
				<div className='flex flex-col items-start leading-tight'>
					<span className='text-[9px] font-bold text-black uppercase tracking-tighter'>
						Download for Free
					</span>
					<span className='text-xs lg:text-sm font-black text-black text-start -mt-1 tracking-tight'>
						App Store
					</span>
				</div>
			</button>
		);
	}

	// 5. NO FALLBACK:
	// If the app isn't installable and it's not iOS (e.g., standard desktop browser), show nothing.
	return null;
};
export const AppleButtons = () => {
	const { installApp, isInstallable, isStandalone } = usePWAInstall();

	// 1. HIDDEN IF ALREADY DOWNLOADED:
	// If the app is already installed and running, return null (no fallback)
	if (isStandalone) return null;

	// 2. DETECT iOS:
	// We check if the user is on an iPhone/iPad to show the App Store disguise
	const isIos =
		typeof window !== "undefined" &&
		/iPad|iPhone|iPod/.test(navigator.userAgent);

	// 3. ANDROID / CHROME / EDGE LOGIC:
	// If the browser supports the automated install prompt
	if (isInstallable) {
		return (
			<button
				onClick={installApp}
				className='flex items-center gap-x-2 justify-center bg-primary-400 hover:bg-primary-500 transition-all px-1 sm:px-4 py-2 sm:py-3 rounded-full shadow-lg active:scale-95 group border border-white/10'
			>
				<FaApple className='text-3xl text-black group-hover:scale-110 transition-transform' />
				<div className='flex flex-col items-start leading-tight'>
					<span className='text-[9px] font-bold text-black uppercase tracking-tighter'>
						Download for Free
					</span>
					<span className='text-xs lg:text-sm font-black text-black text-start -mt-1 tracking-tight'>
						App Store
					</span>
				</div>
			</button>
		);
	}

	// 4. iOS DISGUISE:
	// If we are on iOS, show the App Store disguise (manual instructions)
	if (isIos) {
		return (
			<button
				onClick={() =>
					alert(
						"To install: \n1. Tap the 'Share' icon (square with arrow). \n2. Scroll down and tap 'Add to Home Screen'.",
					)
				}
				className='flex items-center gap-x-2 justify-center bg-primary-400 hover:bg-primary-500 transition-all px-4 py-2 sm:py-3 rounded-full shadow-lg active:scale-95 group border border-white/10'
			>
				<FaApple className='text-3xl text-black group-hover:scale-110 transition-transform' />
				<div className='flex flex-col items-start leading-tight'>
					<span className='text-[9px] font-bold text-black uppercase tracking-tighter'>
						Download for Free
					</span>
					<span className='text-xs xs:text-sm font-black text-black text-start -mt-1 tracking-tight'>
						App Store
					</span>
				</div>
			</button>
		);
	}

	// 5. NO FALLBACK:
	// If the app isn't installable and it's not iOS (e.g., standard desktop browser), show nothing.
	return null;
};

export const usePWAInstall = () => {
	const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
	const [isInstallable, setIsInstallable] = useState(false);
	const [isStandalone, setIsStandalone] = useState(false);

	useEffect(() => {
		// Check if already installed/standalone
		if (
			window.matchMedia("(display-mode: standalone)").matches ||
			(window.navigator as any).standalone
		) {
			setIsStandalone(true);
		}

		const handler = (e: Event) => {
			e.preventDefault();
			setDeferredPrompt(e);
			setIsInstallable(true);
		};

		window.addEventListener("beforeinstallprompt", handler);

		// Listen for successful installation
		window.addEventListener("appinstalled", () => {
			setIsStandalone(true);
			setIsInstallable(false);
			setDeferredPrompt(null);
		});

		return () => window.removeEventListener("beforeinstallprompt", handler);
	}, []);

	const installApp = async () => {
		if (!deferredPrompt) return;
		deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;
		if (outcome === "accepted") {
			setDeferredPrompt(null);
			setIsInstallable(false);
		}
	};

	return { installApp, isInstallable, isStandalone };
};

// export const AndriodButtons = () => {
// 	const { installApp, isInstallable } = usePWAInstall();

// 	if (!isInstallable) return null;

// 	return (
// 		<button
// 			onClick={installApp}
// 			className='flex items-center gap-2 justify-center bg-[#DAB13C] hover:bg-[#c9a130] transition-all px-3 py-3 rounded-full shadow-lg active:scale-95 group'
// 		>
// 			<FaGooglePlay className='text-2xl text-black-100 group-hover:scale-110 transition-transform' />
// 			<div className='flex flex-col items-start leading-tight'>
// 				<span className='text-[9px] font-bold text-black uppercase tracking-tighter'>
// 					Download for Free
// 				</span>
// 				<span className='text-sm font-black text-black text-start -mt-1 tracking-tight'>
// 					Install App
// 				</span>
// 			</div>
// 		</button>
// 	);
// };

// export const AppleButtons = () => {
// 	const handleIOSInstall = () => {
// 		alert("To install this app:\n\nTap Share → 'Add to Home Screen'");
// 	};

// 	return (
// 		<button
// 			onClick={handleIOSInstall}
// 			className='flex items-center gap-2 justify-center bg-[#DAB13C] hover:bg-[#c9a130] transition-all px-3 py-3 rounded-full shadow-lg active:scale-95 group'
// 		>
// 			<FaApple className='text-3xl text-black group-hover:scale-110 transition-transform' />
// 			<div className='flex flex-col items-start leading-tight'>
// 				<span className='text-[9px] font-bold text-black uppercase tracking-tighter'>
// 					Download for Free
// 				</span>
// 				<span className='text-sm font-black text-black -mt-1 tracking-tight'>
// 					Add to Home Screen
// 				</span>
// 			</div>
// 		</button>
// 	);
// };

export const GeneralDropdown = ({
	options,
	selectedOption,
	onSelect,
	buttonContent,
	placeholder = "Select an option",
	className = "relative inline-block text-left z-40",
	buttonClassName,
	itemsClassName,
	showCheckmark = true,
	sectionTitle = "Select Option",
}: GeneralDropdownProps) => {
	const defaultButtonContent = (
		<div className='flex items-center gap-1'>
			<span className='text-xs lg:text-sm font-semibold text-slate-700'>
				{placeholder}:
			</span>
			<span className='text-xs lg:text-sm text-slate-800'>
				{selectedOption.name}
			</span>
		</div>
	);

	return (
		<Menu as='div' className={`z-40 ${className}`}>
			<Menu.Button
				className={`flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-1.5 lg:py-2 bg-bg4-600/50 border border-bg4-600 rounded-lg shadow-sm hover:bg-bg4-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${buttonClassName}`}
			>
				{buttonContent || defaultButtonContent}

				{/* Chevron dropdown icon */}
				<BiChevronDown
					className='text-lg lg:text-xl text-slate-500'
					aria-hidden='true'
				/>
			</Menu.Button>

			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-1 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-1 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<Menu.Items
					className={`absolute right-0 mt-2 w-72 lg:w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black-100 ring-opacity-5 focus:outline-none z-40 border border-slate-200 ${itemsClassName}`}
				>
					<div className='p-2'>
						<div className='px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide border-b border-bg4-600'>
							{sectionTitle}
						</div>
						<div className='space-y-1 mt-2'>
							{options.map((option) => (
								<Menu.Item key={option.id}>
									{({ active }) => (
										<button
											className={`${
												active ? "bg-slate-50" : ""
											} group flex w-full items-center gap-4 rounded-md px-3 py-2.5 text-sm transition-all ${
												selectedOption.id === option.id
													? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
													: "text-slate-700 hover:bg-slate-50"
											}`}
											onClick={() => onSelect(option)}
										>
											{option.icon && (
												<span className='flex-shrink-0'>{option.icon}</span>
											)}
											<span className='font-medium flex-1 text-left'>
												{option.name}
											</span>

											{showCheckmark && selectedOption.id === option.id && (
												<IoMdCheckmarkCircle className='text-primary-200 text-xl flex-shrink-0' />
											)}
										</button>
									)}
								</Menu.Item>
							))}
						</div>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

// ============= MULTI-SELECT DROPDOWN COMPONENT =============

interface MultiSelectDropdownProps {
	options: GeneralDropdownOption[];
	selectedOptions: GeneralDropdownOption[];
	onSelectionChange: (options: GeneralDropdownOption[]) => void;
	buttonContent?: ReactNode;
	placeholder?: string;
	className?: string;
	buttonClassName?: string;
	itemsClassName?: string;
	sectionTitle?: string;
	showSelectAll?: boolean;
	showClearAll?: boolean;
}

export const MultiSelectDropdown = ({
	options,
	selectedOptions,
	onSelectionChange,
	buttonContent,
	placeholder = "Select options",
	className = "relative inline-block text-left z-40",
	buttonClassName,
	itemsClassName,
	sectionTitle = "Select Options",
	showSelectAll = true,
	showClearAll = true,
}: MultiSelectDropdownProps) => {
	const handleToggleOption = (option: GeneralDropdownOption) => {
		const isSelected = selectedOptions.some((item) => item.id === option.id);

		if (isSelected) {
			onSelectionChange(
				selectedOptions.filter((item) => item.id !== option.id),
			);
		} else {
			onSelectionChange([...selectedOptions, option]);
		}
	};

	const handleSelectAll = () => {
		onSelectionChange(options);
	};

	const handleClearAll = () => {
		onSelectionChange([]);
	};

	const isOptionSelected = (option: GeneralDropdownOption) => {
		return selectedOptions.some((item) => item.id === option.id);
	};

	const getButtonLabel = () => {
		if (selectedOptions.length === 0) {
			return "None selected";
		}
		if (selectedOptions.length === 1) {
			return selectedOptions[0].name;
		}
		return `${selectedOptions.length} selected`;
	};

	const defaultButtonContent = (
		<div className='flex items-center gap-1'>
			<span className='text-xs lg:text-sm font-semibold text-slate-700'>
				{placeholder}:
			</span>
			<span className='text-xs lg:text-sm text-slate-800'>
				{getButtonLabel()}
			</span>
		</div>
	);

	const allSelected =
		selectedOptions.length === options.length && options.length > 0;

	return (
		<Menu as='div' className={`z-40 ${className}`}>
			{({ open }) => (
				<>
					<Menu.Button
						className={`flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-1.5 lg:py-2 bg-bg4-600/50 border border-bg4-600 rounded-lg shadow-sm hover:bg-bg4-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${buttonClassName}`}
					>
						{buttonContent || defaultButtonContent}

						{/* Chevron dropdown icon */}
						<BiChevronDown
							className={`text-lg lg:text-xl text-slate-500 transition-transform duration-200 ${
								open ? "rotate-180" : ""
							}`}
							aria-hidden='true'
						/>
					</Menu.Button>

					<Transition
						as={Fragment}
						enter='transition ease-out duration-100'
						enterFrom='transform opacity-0 scale-95'
						enterTo='transform opacity-1 scale-100'
						leave='transition ease-in duration-75'
						leaveFrom='transform opacity-1 scale-100'
						leaveTo='transform opacity-0 scale-95'
					>
						<Menu.Items
							static
							className={`absolute right-0 mt-2 w-72 lg:w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black-100 ring-opacity-5 focus:outline-none z-40 border border-slate-200 ${itemsClassName}`}
						>
							<div className='p-2'>
								<div className='flex items-center justify-between px-3 py-2 border-b border-bg4-600'>
									<span className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>
										{sectionTitle}
									</span>
									{(showSelectAll || showClearAll) && (
										<div className='flex gap-2'>
											{showSelectAll && !allSelected && (
												<button
													type='button'
													onClick={(e) => {
														e.preventDefault();
														e.stopPropagation();
														handleSelectAll();
													}}
													className='text-xs text-blue-600 hover:text-blue-700 font-medium'
												>
													Select All
												</button>
											)}
											{showClearAll && selectedOptions.length > 0 && (
												<button
													type='button'
													onClick={(e) => {
														e.preventDefault();
														e.stopPropagation();
														handleClearAll();
													}}
													className='text-xs text-slate-600 hover:text-slate-700 font-medium'
												>
													Clear
												</button>
											)}
										</div>
									)}
								</div>
								<div className='space-y-1 mt-2 max-h-64 overflow-y-auto'>
									{options.map((option) => {
										const isSelected = isOptionSelected(option);
										return (
											<Menu.Item key={option.id}>
												{({ active }) => (
													<button
														type='button'
														className={`${
															active ? "bg-slate-50" : ""
														} group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all ${
															isSelected
																? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
																: "text-slate-700 hover:bg-slate-50"
														}`}
														onClick={(e) => {
															e.preventDefault();
															e.stopPropagation();
															handleToggleOption(option);
														}}
													>
														<input
															type='checkbox'
															checked={isSelected}
															onChange={() => {}}
															className='h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer flex-shrink-0'
															onClick={(e) => e.stopPropagation()}
														/>

														{option.icon && (
															<span className='flex-shrink-0'>
																{option.icon}
															</span>
														)}

														<span className='font-medium flex-1 text-left'>
															{option.name}
														</span>
													</button>
												)}
											</Menu.Item>
										);
									})}
								</div>
							</div>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
};

// PWA Button
