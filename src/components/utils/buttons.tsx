import { Menu, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { BiChevronDown } from "react-icons/bi";
import { IoMdCheckmarkCircle } from "react-icons/io";

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
