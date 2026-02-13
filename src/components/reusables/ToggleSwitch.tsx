import React from "react";
import Switch from "react-switch";

interface ToggleSwitchProps {
	name: string;
	checked: boolean;
	onChange: (name: string, checked: boolean) => void;

	label?: string;
	labelClassName?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
	name,
	checked,
	onChange,
	label,
	labelClassName,
}) => {
	return (
		<div className='flex w-full justify-between gap-5 text-black-300 items-center text-xxs xl:text-sm font-medium'>
			<label htmlFor={name} className={labelClassName}>
				{label}{" "}
				{checked ? (
					<span className='text-green_1-200 animate-pulse'>(Live)</span>
				) : null}
			</label>
			<Switch
				aria-label='Toggle Switch'
				checked={checked}
				onChange={(checked) => onChange(name, checked)}
				uncheckedIcon={false}
				checkedIcon={false}
				onColor={`${checked ? "#10B981" : "#EF4444"}`}
				handleDiameter={14}
				height={24}
				width={44}
			/>
		</div>
	);
};

export default ToggleSwitch;
