"use client";
import { Pagination, Input, Button } from "@heroui/react";
import {
	useState,
	useEffect,
	KeyboardEvent,
	ChangeEvent,
	Dispatch,
} from "react";

interface PaginationWithControlsProps {
	currentPage: number;
	perPage: number;
	totalContent: number;
	onPageChange: (page: number) => void;
	onPerPageChange?: (perPage: number) => void;
	setPerPage: Dispatch<React.SetStateAction<number>>;
	setCurrentPage: Dispatch<React.SetStateAction<number>>;
}

const PaginationWithControls = ({
	currentPage,
	perPage,
	totalContent,
	onPageChange,
	onPerPageChange,
	setPerPage,
	setCurrentPage,
}: PaginationWithControlsProps) => {
	const totalPages = Math.max(1, Math.ceil(totalContent / perPage));
	const [pageInput, setPageInput] = useState(currentPage.toString());
	const [perPageInput, setPerPageInput] = useState(perPage.toString());
	const [inputErrors, setInputErrors] = useState({
		page: false,
		perPage: false,
	});

	// Sync inputs with current values
	useEffect(() => {
		setPageInput(currentPage.toString());
		setPerPageInput(perPage.toString());
	}, [currentPage, perPage]);

	const validateAndChangePage = (value: string) => {
		const newPage = parseInt(value);
		if (!isNaN(newPage)) {
			const validatedPage = Math.max(1, Math.min(newPage, totalPages));
			onPageChange(validatedPage);
			setPageInput(validatedPage.toString());
			setInputErrors({ ...inputErrors, page: false });
		}
	};

	const handlePageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value === "" || /^[1-9]\d*$/.test(value)) {
			setPageInput(value);
			setInputErrors({ ...inputErrors, page: false });
		}
	};

	const handlePageInputSubmit = () => {
		if (pageInput === "") {
			setInputErrors({ ...inputErrors, page: true });
			setPageInput(currentPage.toString());
			return;
		}
		validateAndChangePage(pageInput);
	};

	const handlePerPageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value === "" || /^[1-9]\d*$/.test(value)) {
			setPerPageInput(value);
			setInputErrors({ ...inputErrors, perPage: false });
		}
	};

	const handlePerPageInputSubmit = () => {
		if (perPageInput === "") {
			setInputErrors({ ...inputErrors, perPage: true });
			setPerPageInput(perPage.toString());
			return;
		}

		const newPerPage = parseInt(perPageInput);
		if (newPerPage > 0) {
			setPerPage(newPerPage);
			setCurrentPage(1); // Reset to first page
			setInputErrors({ ...inputErrors, perPage: false });
		} else {
			setInputErrors({ ...inputErrors, perPage: true });
		}
	};

	const handleKeyDown = (
		e: KeyboardEvent<HTMLInputElement>,
		type: "page" | "perPage",
	) => {
		if (e.key === "Enter") {
			type === "page" ? handlePageInputSubmit() : handlePerPageInputSubmit();
		}
	};

	return (
		<div className='space-y-3 lg:w-4/5 overflow-hidden'>
			<div className='flex flex-wrap items-center justify-between gap-4'>
				{/* Items per page control */}
				<div className='flex items-center gap-2'>
					<div className='flex items-center gap-2'>
						<span className='text-sm text-foreground-500'>Items per page:</span>
						<div className='flex items-center gap-1'>
							<Input
								aria-label='Items per page'
								size='sm'
								className='w-24'
								value={perPageInput}
								onChange={handlePerPageInputChange}
								onKeyDown={(e) => handleKeyDown(e, "perPage")}
								isInvalid={inputErrors.perPage}
								errorMessage={inputErrors.perPage ? "Must be > 0" : undefined}
							/>
							<Button
								size='sm'
								variant='flat'
								onPress={handlePerPageInputSubmit}
								isIconOnly
							>
								✓
							</Button>
						</div>
					</div>
				</div>

				{/* Page info */}
				<div className='text-sm font-bold text-bg3-700 leading-5'>
					Showing{" "}
					<span className='font-medium'>{(currentPage - 1) * perPage + 1}</span>{" "}
					-{" "}
					<span className='font-medium'>
						{Math.min(currentPage * perPage, totalContent)}
					</span>{" "}
					of <span className='font-medium'>{totalContent}</span>
				</div>
			</div>

			<div className='flex flex-wrap items-center justify-between gap-4'>
				<div className='flex items-center gap-2'>
					<span className='text-sm text-foreground-500'>Go to page:</span>
					<div className='flex items-center gap-1'>
						<Input
							aria-label='Page number'
							size='sm'
							className='w-20'
							value={pageInput}
							onChange={handlePageInputChange}
							onKeyDown={(e) => handleKeyDown(e, "page")}
							isInvalid={inputErrors.page}
							errorMessage={
								inputErrors.page ? `Must be 1-${totalPages}` : undefined
							}
						/>
						<Button
							size='sm'
							variant='flat'
							onPress={handlePageInputSubmit}
							isIconOnly
						>
							✓
						</Button>
					</div>
				</div>

				<Pagination
					page={currentPage}
					total={totalPages}
					onChange={onPageChange}
					size='md'
					color='default'
					showControls
					classNames={{
						wrapper: "gap-0",
						item: "w-8 h-8",
						prev: "min-w-8",
						next: "min-w-8",
						cursor: "font-medium",
					}}
				/>
			</div>
		</div>
	);
};

export default PaginationWithControls;
