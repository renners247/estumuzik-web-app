"use client";
import Link from "next/link";
import Picture from "../picture/Index";
import { RefObject, useState } from "react";
import { TfiReload } from "react-icons/tfi";
// import { BannerProps, AllNavLinks, banners } from "./constants";
// import {
// 	AfihanLogo,
// 	AfihanShortLogo,
// 	lendoVerifyLogo,
// 	lendoVerifyLogoShort,
// } from "../../../public";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { logoImage } from "../../../public";

export const isValidImage = (url: string): Promise<boolean> => {
	return new Promise((resolve) => {
		const img = new Image();
		img.src = url;
		img.onload = () => resolve(true);
		img.onerror = () => resolve(false);
	});
	return new Promise((resolve) => {
		const img = new Image();
		img.src = url;
		img.onload = () => resolve(true);
		img.onerror = () => resolve(false);
	});
};

export const getInitials = (name: string) => {
	const initials = name
		.split(" ")
		.map((n) => n[0])
		.join("");
	return initials.toUpperCase();
};

// export const getPageTitle = (pathname: string) => {
// 	// Find matching navigation item where pathname includes the href
// 	const navItem = AllNavLinks.find((item) => pathname.includes(item.href));

// 	if (navItem) {
// 		return navItem.text;
// 	}
// };

export function formatDateTime(isoString: string): string {
	const date = new Date(isoString);
	const day = date.getDate();
	const month = date.getMonth() + 1; // Months are zero-based
	const year = date.getFullYear();

	let hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, "0"); // Pad minutes to 2 digits

	// Determine AM or PM
	const ampm = hours >= 12 ? "PM" : "AM";

	// Convert to 12-hour format
	hours = hours % 12 || 12; // Adjusts 0 to 12 for 12 AM

	return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
}

export function formatDateToYYYYMMDD(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Add 1 since months are zero-based
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

export const formatDateToISOString = (date: Date | null): string => {
	if (!date) return "";

	// Format to YYYY-MM-DDTHH:MM:SS
	const pad = (num: number) => num.toString().padStart(2, "0");

	const year = date.getFullYear();
	const month = pad(date.getMonth() + 1); // getMonth() is 0-indexed
	const day = pad(date.getDate());
	const hours = pad(date.getHours());
	const minutes = pad(date.getMinutes());
	const seconds = pad(date.getSeconds());

	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export const BackButton = () => {
	const router = useRouter();

	return (
		<button
			type='button'
			onClick={() => router.back()}
			className='
        flex items-center justify-center
        w-9 h-9
        rounded-full
        bg-gray-200 hover:bg-gray-300
        transition
      '
		>
			<FaChevronLeft size={14} className='text-black' />
		</button>
	);
};

// export const getCreditBureauStatusBgColor = (status: string): string => {
//   switch (status.toLowerCase()) {
//     case "found":
//       return "bg-green-100";
//     case "not found":
//       return "bg-red-100";
//     case "pending":
//       return "bg-orange-100";
//     default:
//       return "bg-gray-100";
//   }
// };

export const getCreditBureauStatusBgColor = (status: string): string => {
	switch (status?.toLowerCase()) {
		case "successful":
			return "bg-green-100 border border-green-500 text-green-800";
		case "pending":
			return "bg-yellow-100 border border-yellow-500 text-yellow-800";
		case "failed":
			return "bg-red-100 border border-red-500 text-red-800";
		default:
			return "bg-gray-100 border border-gray-500 text-gray-800";
	}
};

export const getBusinessVerificationStatusBgColor = (status: string) => {
	switch (status) {
		case "verified":
			return "bg-green-100";
		case "not_verified":
			return "bg-red-100";
		default:
			return "bg-gray-100";
	}
};

export const parseAbilities = (abilitiesString: string | null): string[] => {
	if (!abilitiesString) return [];

	try {
		const parsed = JSON.parse(abilitiesString);
		if (Array.isArray(parsed)) {
			return parsed.filter(
				(item): item is string =>
					typeof item === "string" && item.trim().length > 0,
			);
		}
		return [];
	} catch (error) {
		return [];
	}
};

export const formatAbilitiesDisplay = (abilitiesString: any): string => {
	// Handle all falsy values
	if (!abilitiesString) return "No abilities";

	// If it's already an array
	if (Array.isArray(abilitiesString)) {
		const validAbilities = abilitiesString.filter(
			(ability) => typeof ability === "string" && ability.trim().length > 0,
		);

		if (validAbilities.length === 0) return "No abilities";
		if (validAbilities.length <= 2) return validAbilities.join(", ");
		return `${validAbilities.length} abilities`;
	}

	// If it's a string, try to parse
	if (typeof abilitiesString === "string") {
		try {
			const parsed = JSON.parse(abilitiesString);
			if (Array.isArray(parsed)) {
				const validAbilities = parsed.filter(
					(ability) => typeof ability === "string" && ability.trim().length > 0,
				);

				if (validAbilities.length === 0) return "No abilities";
				if (validAbilities.length <= 2) return validAbilities.join(", ");
				return `${validAbilities.length} abilities`;
			}
		} catch {}
	}

	return "No abilities";
};

export const getAbilitiesArray = (abilities: any): string[] => {
	if (!abilities) return [];

	if (Array.isArray(abilities)) {
		return abilities;
	}

	if (typeof abilities === "string") {
		try {
			const parsed = JSON.parse(abilities);
			if (Array.isArray(parsed)) {
				return parsed;
			}
		} catch (error) {
			return abilities.split(",").map((item: string) => item.trim());
		}
	}

	return [];
};

export const downloadBlobFile = (
	data: BlobPart,
	fileName: string,
	mimeType = "application/octet-stream",
) => {
	const blob = new Blob([data], { type: mimeType });
	const url = window.URL.createObjectURL(blob);
	const link = document.createElement("a");

	link.href = url;
	link.setAttribute("download", fileName);
	document.body.appendChild(link);
	link.click();
	link.remove();
	window.URL.revokeObjectURL(url); // Clean up
};

// export const getStatusClasses = (status: string) => {
// 	const s = status as EmailHistory["status"];
// 	switch (s) {
// 		case "SENT":
// 			return "bg-green-100 text-green-800 border border-green-200";
// 		case "PENDING":
// 			return "bg-yellow-100 text-yellow-800 border border-yellow-200";
// 		case "FAILED":
// 			return "bg-red-100 text-red-800 border border-red-200";
// 		default:
// 			return "bg-gray-100 text-gray-800 border border-gray-200";
// 	}
// };

export const getActiveStatusBgColor = (isActive: boolean | string): string => {
	// Handle both boolean and string "true"/"false"
	const active =
		typeof isActive === "string"
			? isActive.toLowerCase() === "true"
			: Boolean(isActive);

	if (active) {
		return "bg-green-50 text-green-700 border border-green-200";
	} else {
		return "bg-red-50 text-red-700 border border-red-200";
	}
};

export const getStatusColor = (status: string) => {
	const statusLower = status.toLowerCase();
	if (statusLower.includes("match")) return "success";
	if (statusLower.includes("pending")) return "warning";
	if (statusLower.includes("fail") || statusLower.includes("invalid"))
		return "danger";
	return "primary";
};

export const getFieldMatchColor = (isMatch: boolean) => {
	return isMatch ? "success" : "danger";
};

export const getTransactionStatusBgColor = (status: string) => {
	switch (status) {
		case "SUCCESSFUL":
			return "bg-[#B9F8B5] font-semibold";
		case "FAILED":
			return "bg-[#FFC9C9] font-semibold";
		case "ABANDONED":
			return "bg-[#DEDEDE] font-semibold";
		case "PENDING":
			return "bg-[#D4A51A] font-semibold";
		case "REVERSED":
			return "bg-[#BED6FF] font-semibold";
		case "OTP_REQUIRED":
			return "bg-[#FFE5B4] font-semibold";
		case "ALL":
		case "":
			return "bg-white font-semibold";
		default:
			return "bg-white font-semibold";
	}
};

export const formatDate = (dateString: string) => {
	if (!dateString) return "N/A";
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
};
export const formatNumber = (value: string): string => {
	if (!value) return "";

	// Remove all non-digit characters except decimal point
	const cleanValue = value.replace(/[^\d.]/g, "");

	// Split into whole and decimal parts
	const parts = cleanValue.split(".");
	let wholePart = parts[0];
	let decimalPart = parts[1] || "";

	// Limit decimal to 2 places
	if (decimalPart.length > 2) {
		decimalPart = decimalPart.substring(0, 2);
	}

	// Add commas to whole number part only if it's not empty
	if (wholePart && wholePart !== "") {
		// Use BigInt to handle large numbers safely
		try {
			// Remove existing commas and parse
			const numericValue = wholePart.replace(/,/g, "");
			if (numericValue) {
				wholePart = BigInt(numericValue).toLocaleString("en-US");
			}
		} catch (error) {
			// If BigInt fails (empty string), just return the original
			console.warn("Error formatting number:", error);
		}
	}

	// Combine parts
	return decimalPart ? `${wholePart}.${decimalPart}` : wholePart;
};

export const getMandateStatus = (
	isActive: string,
): "Approved" | "Pending" | "Inactive" => {
	switch (isActive) {
		case "true":
			return "Approved";
		case "false":
			return "Inactive";
		default:
			return "Pending";
	}
};

export const getPayoutStatusBgColor = (status: string) => {
	switch (status) {
		case "Pending":
			return "bg-[#5A5A5A]";
		case "Paid":
			return "bg-[#248418]";
		default:
			return "bg-black-200";
	}
};

export const parseNumber = (formattedValue: string): string => {
	// Remove commas and any non-digit characters except decimal point
	return formattedValue.replace(/,/g, "").replace(/[^\d.]/g, "");
};

export const MsgStatusColors = {
	DELIVERED: "bg-green-100 text-green-600",
	SENT: "bg-blue-100 text-blue-600",
	REJECTED: "bg-yellow-100 text-yellow-600",
	FAILED: "bg-red-100 text-red-600",
};

interface LendoVerifyLogoProps {
	short?: boolean;
	logoClassName?: string;
	className?: string;
	textOnly?: boolean;
}

// export const LendoVerifyLogo = ({
//   short = false,
//   logoClassName,
//   className,
//   textOnly,
// }: LendoVerifyLogoProps) => {
//   return (
//     <Link href="/" className="">
//       <div
//         className={`text-base lg:text-sm flex items-center gap-1.5 xl:gap-2 font-recursive ${className}`}
//       >
//         {short ? (
//           <Picture
//             src={AfihanShortLogo}
//             alt="Àfihàn logo"
//             loading="eager"
//             className="!w-8 object-contain"
//           />
//         ) : textOnly ? (
//           <Picture
//             src={AfihanLogo}
//             alt="Àfihàn logo"
//             loading="eager"
//             className="object-contain w-[100px] xl:w-[120px] brightness-0 invert hue-rotate-180"
//           />
//         ) : (
//           <Picture
//             src={AfihanLogo}
//             alt="Àfihàn logo"
//             loading="eager"
//             className="object-contain invert-0 w-[100px] xl:w-[120px]"
//           />
//         )}
//       </div>
//     </Link>
//   );
// };

export const EstuMuzikLogo = () => {
	return (
		<Link href='/'>
			<Picture src={logoImage} alt='logo image' className='w-16 rounded-sm' />
		</Link>
	);
};

// export const PlayResponsiblyImage = () => {
// 	return (
// 		<div className='flex items-center gap-2 text-xs text-white'>
// 			<span>Play Responsibly</span>
// 			<Picture src={rated} alt='' className='w-5 h-auto' />
// 		</div>
// 	);
// };

export interface ReloadButtonProps {
	showText?: boolean;
}

export const ReloadButton = ({ showText }: ReloadButtonProps) => {
	const [isSpinning, setIsSpinning] = useState(false);

	const handleReload = () => {
		setIsSpinning(true);
		window.location.reload(); // Reloads the current page

		// Reset spinning state after animation completes (though page will reload before this)
		setTimeout(() => setIsSpinning(false), 1000);
	};

	return (
		<div
			onClick={handleReload}
			className='text-sm text-bold flex items-center gap-2 group'
		>
			{showText && "Refresh"}
			<TfiReload
				title='Reload'
				className={`text-sm font-extrabold text-black-100/70 group-hover:text-primary-100 group-hover:scale-110 flex items-center gap-2 cursor-pointer hover:-rotate-90 transition-transform duration-400 ${
					isSpinning ? "animate-spin" : ""
				}`}
			/>
		</div>
	);
};

interface FormatMoneyProps {
	value: number | string;
}
export const FormatMoney = ({ value }: FormatMoneyProps) => {
	if (!value) return <>₦ 0.00</>;

	// Convert value to number and divide by 100 to convert kobo to naira
	const numericValue = typeof value === "string" ? parseFloat(value) : value;
	const nairaValue = numericValue / 100;

	// Check if conversion resulted in a valid number
	if (isNaN(nairaValue)) return <>₦ 0.00</>;

	// Format the converted value
	const formattedValue = nairaValue.toLocaleString("en-NG", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	return <>₦ {formattedValue}</>;
};

interface FormatOptions {
	currencySymbol?: string;
	divideBy100?: boolean;
	locale?: string;
	decimals?: number;
	compact?: boolean;
}

export const formatAmount = (
	value: number,
	options: FormatOptions = {},
): string => {
	const {
		currencySymbol = "₦",
		divideBy100 = true,
		locale = "en-NG",
		decimals = 2,
		compact = true,
	} = options;

	const baseValue = divideBy100 ? value / 100 : value;

	if (compact) {
		if (baseValue >= 1_000_000) {
			const millions = baseValue / 1_000_000;
			const decimalPlaces = millions < 10 ? 1 : 0;
			return `${currencySymbol}${millions.toFixed(decimalPlaces)}M`;
		}

		if (baseValue >= 10_000) {
			const thousands = baseValue / 1_000;
			return `${currencySymbol}${thousands.toFixed(0)}k`;
		}
	}

	const formatter = new Intl.NumberFormat(locale, {
		style: "currency",
		currency: "NGN",
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
		currencyDisplay: "narrowSymbol",
	});

	const formatted = formatter.format(baseValue);
	return formatted.replace("NGN", currencySymbol);
};

export const formatAmountSimple = (
	value: number,
	currencySymbol: string = "₦",
	divideBy100: boolean = true,
): string => {
	return formatAmount(value, { currencySymbol, divideBy100 });
};
// hooks/useCurrencyInput.ts

interface UseCurrencyInputOptions {
	onValueChange?: (rawValue: string) => void; // e.g., for Formik
	locale?: string;
	currency?: string;
	maxDecimals?: number;
}

export const useCurrencyInput = ({
	onValueChange,
	locale = "en-NG",
	currency = "NGN",
	maxDecimals = 2,
}: UseCurrencyInputOptions = {}) => {
	const [displayValue, setDisplayValue] = useState<string>("");

	const formatDisplay = (raw: string | number): string => {
		const num = parseFloat(raw.toString());
		if (isNaN(num)) return "";
		return num.toLocaleString(locale, {
			minimumFractionDigits: maxDecimals,
			maximumFractionDigits: maxDecimals,
		});
	};

	const parseInput = (input: string): string => {
		// Remove everything except digits and dot
		let cleaned = input.replace(/[^0-9.]/g, "");

		// Prevent multiple dots
		const parts = cleaned.split(".");
		if (parts.length > 2) {
			cleaned = parts[0] + "." + parts.slice(1).join("");
		}

		// Limit decimal places
		if (parts[1] && parts[1].length > maxDecimals) {
			cleaned = parseFloat(cleaned).toFixed(maxDecimals);
		}

		// Prevent invalid leading zeros
		if (
			cleaned !== "" &&
			!cleaned.startsWith("0.") &&
			cleaned.startsWith("0")
		) {
			cleaned = cleaned.replace(/^0+/, "");
			if (cleaned === "" || cleaned === ".") cleaned = "0";
		}

		return cleaned;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value;

		// If user pastes formatted value like "1,234.56", clean it first
		if (value.includes(",")) {
			value = value.replace(/,/g, "");
		}

		const cleaned = parseInput(value);
		const rawNumber = cleaned === "" ? "" : parseFloat(cleaned).toString();

		// Update formik/react-hook-form/etc.
		onValueChange?.(rawNumber || "");

		// Update display
		if (cleaned && !isNaN(parseFloat(cleaned))) {
			setDisplayValue(formatDisplay(cleaned));
		} else if (cleaned === "" || cleaned === ".") {
			setDisplayValue("");
		} else {
			setDisplayValue("0.00");
		}
	};

	const handleBlur = () => {
		const raw = onValueChange ? null : displayValue.replace(/,/g, "");
		const num = raw
			? parseFloat(raw)
			: parseFloat(displayValue.replace(/,/g, "") || "0");

		if (!isNaN(num)) {
			const formatted = formatDisplay(num);
			setDisplayValue(formatted);
			if (raw !== null) onValueChange?.(num.toString());
		} else {
			setDisplayValue("0.00");
			onValueChange?.("0");
		}
	};

	const setValue = (rawValue: string | number) => {
		const num = parseFloat(rawValue.toString());
		if (!isNaN(num)) {
			setDisplayValue(formatDisplay(num));
			onValueChange?.(num.toString());
		} else {
			setDisplayValue("");
			onValueChange?.("");
		}
	};

	return {
		displayValue,
		handleChange,
		handleBlur,
		setValue, // Useful for resetting or pre-filling
	};
};

export const SidebarSkeleton = () => (
	<div className='w-fit hidden lg:block'>
		<div className='flex items-center gap-2 mb-8'>
			<div className='w-4 h-4 bg-gray-300 rounded animate-pulse'></div>
			<div className='h-4 bg-gray-300 rounded w-32 animate-pulse'></div>
		</div>

		<nav className='space-y-2 bg-white pl-3 pr-10 pt-3 pb-12 rounded-2xl shadow-sm'>
			{[...Array(7)].map((_, i) => (
				<div key={i} className='flex items-center gap-3 py-3 px-2'>
					<div className='w-6 h-6 bg-gray-300 rounded-full animate-pulse'></div>
					<div className='h-4 bg-gray-300 rounded w-32 animate-pulse'></div>
				</div>
			))}
		</nav>
	</div>
);

export const FormSkeleton = () => (
	<div className='space-y-8'>
		{/* Header */}
		<div>
			<div className='h-8 bg-gray-300 rounded w-3/4 mb-2 animate-pulse'></div>
			<div className='h-4 bg-gray-300 rounded w-1/2 animate-pulse'></div>
		</div>

		{/* Logo upload area */}
		<div className='space-y-3'>
			<div className='size-32 rounded-lg bg-gray-300 animate-pulse flex items-center justify-center'>
				<div className='w-10 h-10 bg-gray-400 rounded-full'></div>
			</div>
			<div className='space-y-2'>
				<div className='h-3 bg-gray-300 rounded w-1/3 animate-pulse'></div>
				<div className='h-3 bg-gray-300 rounded w-1/4 animate-pulse'></div>
			</div>
		</div>

		{/* Form fields */}
		<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
			{[...Array(8)].map((_, i) => (
				<div key={i} className='space-y-2'>
					<div className='h-4 bg-gray-300 rounded w-1/3 animate-pulse'></div>
					<div className='h-12 bg-gray-200 rounded-xl animate-pulse'></div>
				</div>
			))}
		</div>

		{/* Action buttons */}
		<div className='flex items-center gap-3 pt-8'>
			<div className='h-10 bg-gray-300 rounded-xl w-24 animate-pulse'></div>
			<div className='h-10 bg-gray-400 rounded-xl w-32 animate-pulse'></div>
		</div>
	</div>
);

// Usage
<div className='bg-gray-50 pt-3 pb-8 min-h-screen'>
	<div className='max-w-7xl mx-auto px-4 flex gap-10'>
		<SidebarSkeleton />
		<div className='flex-1 bg-white rounded-2xl shadow-sm p-8 lg:p-12 mt-14'>
			<FormSkeleton />
		</div>
	</div>
</div>;
