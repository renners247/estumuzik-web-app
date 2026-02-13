// @/components/skeletons/BeneficiaryTableSkeleton.tsx
import { Skeleton } from "@heroui/react"; // or wherever your Skeleton comes from

export const BeneficiaryTableSkeleton = () => {
	return (
		<>
			{/* TableInfo Skeleton */}
			<div className='bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-6'>
				<div className='flex items-center justify-between'>
					<div>
						<Skeleton className='w-32 h-4 rounded mb-2' />
						<Skeleton className='w-24 h-6 rounded' />
					</div>
					<div>
						<Skeleton className='w-32 h-4 rounded mb-2' />
						<Skeleton className='w-28 h-6 rounded' />
					</div>
				</div>
			</div>

			{/* Desktop Table Skeleton */}
			<div className='hidden lg:block overflow-x-auto'>
				<table className='w-full border-collapse table-auto whitespace-nowrap min-h-[400px]'>
					<thead className='text-base text-white text-left bg-black-200'>
						<tr className='table-row uppercase'>
							<th className='py-8 pl-4 font-medium rounded-tl-3xl text-xs'>
								ID
							</th>
							<th className='py-8 pl-4 font-medium text-xs'>NAME</th>
							<th className='py-8 pl-4 font-medium text-xs'>EMAIL</th>
							<th className='py-8 pl-4 font-medium text-xs'>BANK</th>
							<th className='py-8 pl-4 font-medium text-xs'>ACCOUNT NUMBER</th>
							<th className='py-8 pl-4 font-medium text-xs'>DATE ADDED</th>
							<th className='py-8 pl-4 rounded-tr-3xl font-medium text-xs'>
								ACTIONS
							</th>
						</tr>
					</thead>
					<tbody>
						{Array.from({ length: 10 }).map((_, index) => (
							<tr
								key={index}
								className={`table-row ${index % 2 === 1 ? "bg-gray-100" : ""}`}
							>
								<td className='px-3 py-4 pb-6 text-xs whitespace-nowrap'>
									<Skeleton className='w-16 h-4 rounded' />
								</td>
								<td className='px-3 py-4 pb-6 text-xs whitespace-nowrap'>
									<Skeleton className='w-32 h-4 rounded' />
								</td>
								<td className='px-3 py-4 pb-6 text-xs whitespace-nowrap'>
									<Skeleton className='w-40 h-4 rounded' />
								</td>
								<td className='px-3 py-4 pb-6 text-xs whitespace-nowrap'>
									<Skeleton className='w-20 h-4 rounded' />
								</td>
								<td className='px-3 py-4 pb-6 text-xs whitespace-nowrap'>
									<Skeleton className='w-36 h-4 rounded' />
								</td>
								<td className='px-3 py-4 pb-6 text-xs whitespace-nowrap'>
									<Skeleton className='w-28 h-4 rounded' />
								</td>
								<td className='px-2 py-4 whitespace-nowrap'>
									<div className='flex gap-2'>
										<Skeleton className='w-8 h-8 rounded-full' />
										<Skeleton className='w-8 h-8 rounded-full' />
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Mobile Cards Skeleton */}
			<div className='lg:hidden space-y-4'>
				{Array.from({ length: 6 }).map((_, index) => (
					<div
						key={index}
						className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm'
					>
						<div className='flex items-start justify-between mb-3'>
							<div className='flex-1'>
								<Skeleton className='w-20 h-3 rounded mb-1' />
								<Skeleton className='w-40 h-5 rounded mb-2' />
								<Skeleton className='w-48 h-3 rounded' />
							</div>
							<Skeleton className='w-16 h-6 rounded' />
						</div>

						<div className='grid grid-cols-2 gap-3 mb-3'>
							<div>
								<Skeleton className='w-20 h-3 rounded mb-1' />
								<Skeleton className='w-32 h-4 rounded' />
							</div>
							<div>
								<Skeleton className='w-24 h-3 rounded mb-1' />
								<Skeleton className='w-28 h-4 rounded' />
							</div>
						</div>

						<div className='flex justify-end gap-2 pt-3 border-t border-gray-100'>
							<Skeleton className='w-9 h-9 rounded-full' />
							<Skeleton className='w-9 h-9 rounded-full' />
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export const MandateRowSkeleton = () => (
	<tr className='animate-pulse'>
		<td className='px-4 py-4'>
			<div className='h-4 bg-gray-200 rounded w-32'></div>
		</td>
		<td className='px-4 py-4'>
			<div className='h-6 bg-gray-200 rounded-full w-20'></div>
		</td>
		<td className='px-4 py-4'>
			<div className='h-4 bg-gray-200 rounded w-24'></div>
		</td>
		<td className='px-4 py-4'>
			<div className='h-4 bg-gray-200 rounded w-20'></div>
		</td>
		<td className='px-4 py-4'>
			<div className='h-4 bg-gray-200 rounded w-24'></div>
		</td>
		<td className='px-4 py-4'>
			<div className='h-8 bg-gray-200 rounded-full w-16'></div>
		</td>
	</tr>
);

export const TableRowSkeleton = () => (
	<tr className='animate-pulse'>
		<td className='px-4 py-6'>
			<div className='h-4 bg-gray-200 rounded w-32 mb-2'></div>
			<div className='h-3 bg-gray-200 rounded w-24'></div>
		</td>
		<td className='px-4 py-6'>
			<div className='h-6 bg-gray-200 rounded-full w-24'></div>
		</td>
		<td className='px-4 py-6'>
			<div className='h-4 bg-gray-200 rounded w-20'></div>
		</td>
		<td className='px-4 py-6'>
			<div className='h-4 bg-gray-200 rounded w-20'></div>
		</td>
		<td className='px-4 py-6'>
			<div className='h-4 bg-gray-200 rounded w-20'></div>
		</td>
		<td className='px-4 py-6'>
			<div className='h-4 bg-gray-200 rounded w-24'></div>
		</td>
		<td className='px-4 py-6'>
			<div className='h-4 bg-gray-200 rounded w-20'></div>
		</td>
		<td className='px-4 py-6'>
			<div className='h-8 bg-gray-200 rounded-full w-16'></div>
		</td>
	</tr>
);

export const BusinessTableRowSkeleton = () => (
	<tr className='animate-pulse'>
		{/* Customer Name */}
		<td className='px-3 py-4 pb-6'>
			<div className='h-4 bg-gray-200 rounded w-32'></div>
		</td>

		{/* User ID */}
		<td className='px-3 py-4 pb-6'>
			<div className='h-4 bg-gray-200 rounded w-20'></div>
		</td>

		{/* ID Type */}
		<td className='px-3 py-4 pb-6'>
			<div className='h-4 bg-gray-200 rounded w-16'></div>
		</td>

		{/* Status */}
		<td className='px-3 py-4 pb-6'>
			<div className='h-6 bg-gray-200 rounded-full w-24'></div>
		</td>

		{/* Query Date */}
		<td className='px-3 py-4 pb-6'>
			<div className='h-4 bg-gray-200 rounded w-20'></div>
		</td>

		<td className='px-3 py-4 pb-6'>
			<div className='h-4 bg-gray-200 rounded w-20'></div>
		</td>

		<td className='px-3 py-4 pb-6'>
			<div className='h-4 bg-gray-200 rounded w-20'></div>
		</td>

		{/* Action */}
		<td className='px-2 py-4'>
			<div className='h-8 bg-gray-200 rounded-full w-16'></div>
		</td>
	</tr>
);

export const MobileCardSkeleton = () => (
	<div className='bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm animate-pulse'>
		<div className='flex items-start justify-between mb-3'>
			<div className='flex-1'>
				<div className='h-4 bg-gray-200 rounded w-32 mb-2'></div>
				<div className='h-3 bg-gray-200 rounded w-24'></div>
			</div>
			<div className='h-6 bg-gray-200 rounded-full w-20'></div>
		</div>
		<div className='grid grid-cols-2 gap-3'>
			<div>
				<div className='h-3 bg-gray-200 rounded w-12 mb-1'></div>
				<div className='h-3 bg-gray-200 rounded w-16'></div>
			</div>
			<div>
				<div className='h-3 bg-gray-200 rounded w-16 mb-1'></div>
				<div className='h-3 bg-gray-200 rounded w-20'></div>
			</div>
		</div>
		<div className='flex justify-end mt-3 pt-3 border-t border-gray-100'>
			<div className='h-8 bg-gray-200 rounded-full w-16'></div>
		</div>
	</div>
);

export const SkeletonRow = () => (
	<tr className='animate-pulse'>
		{Array.from({ length: 5 }).map((_, idx) => (
			<td key={idx} className='py-4 px-6 text-sm font-medium text-gray-900'>
				<div className='h-4 bg-gray-300 rounded w-full'></div>
			</td>
		))}
	</tr>
);

export const SkeletonCard = () => (
	<div className='bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm animate-pulse'>
		<div className='flex justify-between mb-3'>
			<div className='space-y-2 flex-1'>
				<div className='h-4 bg-gray-300 rounded w-3/4'></div>
				<div className='h-3 bg-gray-300 rounded w-1/2 mt-1'></div>
			</div>
			<div className='h-4 w-16 bg-gray-300 rounded'></div>
		</div>
		<div className='grid grid-cols-2 gap-3'>
			<div className='h-3 bg-gray-300 rounded w-full'></div>
			<div className='h-3 bg-gray-300 rounded w-full'></div>
			<div className='col-span-2 h-3 bg-gray-300 rounded w-full'></div>
		</div>
		<div className='flex justify-end items-center mt-3 pt-3 border-t border-gray-100'>
			<div className='h-6 w-20 bg-gray-300 rounded'></div>
		</div>
	</div>
);

export const DesktopTableSkeleton = () => (
	<div className='hidden lg:block'>
		<table className='w-full border-collapse table-auto whitespace-nowrap overflow-x-auto min-h-[200px]'>
			<thead className='text-base text-white text-left bg-black-200'>
				<tr className='table-row uppercase'>
					<th className='py-8 pl-4 font-medium rounded-tl-3xl text-xs'>ID</th>
					<th className='py-8 pl-4 font-medium text-xs'>AMOUNT</th>
					<th className='py-8 pl-4 font-medium text-xs'>STATUS</th>
					<th className='py-8 pl-4 font-medium text-xs'>RECEPIENT</th>
					<th className='py-8 pl-4 font-medium text-xs'>REFERENCE ID</th>
					<th className='py-8 pl-4 font-medium text-xs'>DATE</th>
					<th className='py-8 pl-4 rounded-tr-3xl font-medium text-xs'>
						ACTION
					</th>
				</tr>
			</thead>
			<tbody>
				{Array.from({ length: 7 }).map((_, index) => (
					<tr
						key={index}
						className={`table-row ${
							(index + 1) % 2 === 0 ? "bg-gray-100" : ""
						}`}
					>
						<td className='px-3 py-4 pb-6 text-xs whitespace-nowrap'>
							<Skeleton className='w-20 h-4 rounded' />
						</td>
						<td className='px-3 py-4 pb-6 text-xs whitespace-nowrap'>
							<Skeleton className='w-24 h-4 rounded' />
						</td>
						<td className='px-3 py-4 pb-6 text-xs whitespace-nowrap'>
							<Skeleton className='w-28 h-6 rounded-full' />
						</td>
						<td className='px-3 py-4 pb-6 text-xs whitespace-nowrap'>
							<Skeleton className='w-32 h-4 rounded' />
						</td>
						<td className='px-3 py-4 pb-6 text-xs whitespace-nowrap'>
							<Skeleton className='w-36 h-4 rounded' />
						</td>
						<td className='px-3 py-4 pb-6 text-xs whitespace-nowrap'>
							<Skeleton className='w-20 h-4 rounded' />
						</td>
						<td className='px-2 py-4 whitespace-nowrap'>
							<Skeleton className='w-16 h-8 rounded-full' />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

export const BalanceSummarySkeleton = () => (
	<div className='grid grid-cols-1 md:grid-cols-3 w-full gap-4 md:gap-6 mb-10 items-stretch'>
		{/* Available Balance Skeleton */}
		<div className='bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between min-h-[160px] h-full animate-pulse'>
			<div className='space-y-4'>
				<div className='space-y-3'>
					<div className='w-32 h-4 bg-gray-200 rounded-lg'></div>
					<div className='w-40 h-8 bg-gray-200 rounded-lg'></div>
				</div>
				<div className='flex items-center gap-6 mt-2'>
					<div className='w-20 h-8 bg-gray-200 rounded-lg'></div>
					<div className='w-20 h-8 bg-gray-200 rounded-lg'></div>
				</div>
			</div>
		</div>

		<div className='bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between min-h-[160px] h-full animate-pulse'>
			<div className='space-y-4'>
				<div className='space-y-3'>
					<div className='w-32 h-4 bg-gray-200 rounded-lg'></div>
					<div className='w-40 h-8 bg-gray-200 rounded-lg'></div>
				</div>
				<div className='flex items-center gap-6 mt-2'>
					<div className='w-20 h-8 bg-gray-200 rounded-lg'></div>
					<div className='w-20 h-8 bg-gray-200 rounded-lg'></div>
				</div>
			</div>
		</div>

		{/* Next Payout Skeleton */}
		<div className='bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between min-h-[160px] h-full animate-pulse'>
			<div className='space-y-4'>
				<div className='space-y-3'>
					<div className='w-24 h-4 bg-gray-200 rounded-lg'></div>
					<div className='w-40 h-8 bg-gray-200 rounded-lg'></div>
				</div>
				<div className='mt-4'>
					<div className='w-40 h-4 bg-gray-200 rounded-lg'></div>
				</div>
			</div>
		</div>
	</div>
);
