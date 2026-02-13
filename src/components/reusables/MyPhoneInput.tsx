"use client";
import { ErrorMessage, useField } from "formik";
import PhoneInput from "react-phone-input-2";
import React, { useState } from "react";

interface MyPhoneInputProps {
	name: string;
	containerClassName?: string;
	inputClassName?: string;
	borderRadius?: string;
	isDisabled?: boolean;
}

const MyPhoneInput = ({
	name,
	containerClassName,
	inputClassName,
	borderRadius,
	isDisabled,
}: MyPhoneInputProps) => {
	const [field, meta, helpers] = useField(name);
	const [selected, setSelected] = useState("NG");
	const { value } = meta;
	const { setValue } = helpers;

	return (
		<div className='flex flex-col gap-1'>
			<div className='relative'>
				<PhoneInput
					country='ng'
					onlyCountries={["ng"]}
					disableDropdown={true}
					placeholder='234 800 000 0000'
					value={value}
					onChange={(phone) => setValue(phone.replace(/\D/g, ""))}
					inputClass={`responsive-phone-input outline-none border-none w-full ${inputClassName} text-base sm:text-xs md:text-base`}
					buttonClass='responsive-phone-button outline-none border-none'
					containerClass={`w-full border-1 border-black-100/70 rounded-md ${containerClassName}`}
					inputStyle={{
						border: "none",
						boxShadow: "none",
						borderRadius: borderRadius,
						backgroundColor: "transparent",
						color: "#000",
						width: "100%",
						fontSize: "16px",
					}}
					buttonStyle={{
						border: "1px",
						boxShadow: "none",
						padding: "0 4px 0 6px",
					}}
					disabled={isDisabled}
				/>
			</div>

			<ErrorMessage
				name={name}
				component={"div"}
				className='text-red-600 text-xs md:text-sm text-left'
			/>
		</div>
	);
};

export default MyPhoneInput;
