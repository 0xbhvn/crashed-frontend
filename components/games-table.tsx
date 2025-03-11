'use client';

import { usePagination } from '@/components/hooks/use-pagination';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
} from '@/components/ui/pagination';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	Copy,
	Check,
	AlertTriangle,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { z } from 'zod';

// Zod schemas for validation
const GameSchema = z.object({
	// Game ID appears to be a string of digits
	gameId: z.string().regex(/^\d+$/, 'Game ID must be numeric'),

	// Hash value is a 64-character hex string
	hashValue: z
		.string()
		.regex(/^[0-9a-f]{64}$/, 'Hash must be 64-character hex string'),

	// Financial numbers with 2 decimal precision
	crashPoint: z.number().min(1, 'Crash point must be at least 1').finite(),
	calculatedPoint: z
		.number()
		.min(1, 'Calculated point must be at least 1')
		.finite(),
	crashedFloor: z.number().int().nonnegative(),

	// ISO timestamps with timezone info
	endTime: z.string().datetime({ offset: true }),
	prepareTime: z.string().datetime({ offset: true }),
	beginTime: z.string().datetime({ offset: true }),
});

const PaginationSchema = z.object({
	page: z.number().int().positive(),
	per_page: z.number().int().positive(),
	total_items: z.number().int().nonnegative(),
	total_pages: z.number().int().positive(),
	has_next: z.boolean(),
	has_prev: z.boolean(),
});

const ApiResponseSchema = z.object({
	status: z.string(),
	count: z.number().int().nonnegative(),
	pagination: PaginationSchema,
	data: z.array(GameSchema),
});

// Type definitions derived from Zod schemas
type Game = z.infer<typeof GameSchema>;
type ApiResponse = z.infer<typeof ApiResponseSchema>;

// Safe utility functions with validation

// Check if a date string can be converted to a valid date
const isValidDate = (dateString: string | null | undefined): boolean => {
	if (!dateString) return false;

	try {
		const date = new Date(dateString);
		return !Number.isNaN(date.getTime());
	} catch {
		return false;
	}
};

// Format date strings to more readable format with validation
const formatDate = (dateString: string | null | undefined): string => {
	if (!isValidDate(dateString)) return 'Invalid date';

	try {
		const date = new Date(dateString as string);
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: true,
		}).format(date);
	} catch {
		return 'Invalid date';
	}
};

// Calculate duration between two dates in seconds with validation
const calculateDuration = (
	endTimeStr: string | null | undefined,
	beginTimeStr: string | null | undefined
): string => {
	if (!isValidDate(endTimeStr) || !isValidDate(beginTimeStr)) {
		return 'N/A';
	}

	try {
		const endTime = new Date(endTimeStr as string);
		const beginTime = new Date(beginTimeStr as string);
		const durationMs = endTime.getTime() - beginTime.getTime();

		// Check for negative duration (data error)
		if (durationMs < 0) {
			return 'Error';
		}

		const durationSec = durationMs / 1000;
		return durationSec.toFixed(2); // Return with 2 decimal places
	} catch {
		return 'Error';
	}
};

// Column definitions with robust error handling
const columns: ColumnDef<Game>[] = [
	{
		header: 'Game ID',
		accessorKey: 'gameId',
		cell: ({ row }) => {
			const gameId = row.getValue('gameId');
			return (
				<div className="font-medium">
					{gameId ? String(gameId) : 'Unknown ID'}
				</div>
			);
		},
	},
	{
		header: 'Crash Point',
		accessorKey: 'crashPoint',
		cell: ({ row }) => {
			// Safely parse the value
			const rawValue = row.getValue('crashPoint');

			// Handle missing or invalid values
			if (
				rawValue === null ||
				rawValue === undefined ||
				(typeof rawValue === 'number' && !Number.isFinite(rawValue))
			) {
				return (
					<div className="rounded font-semibold px-2 py-0.5 bg-yellow-600/20 text-yellow-600 dark:bg-yellow-800/30 dark:text-yellow-400 flex items-center gap-1">
						<AlertTriangle size={12} />
						<span>Invalid</span>
					</div>
				);
			}

			const value =
				typeof rawValue === 'number'
					? rawValue
					: Number.parseFloat(String(rawValue));

			if (Number.isNaN(value)) {
				return (
					<div className="rounded font-semibold px-2 py-0.5 bg-yellow-600/20 text-yellow-600 dark:bg-yellow-800/30 dark:text-yellow-400 flex items-center gap-1">
						<AlertTriangle size={12} />
						<span>Invalid</span>
					</div>
				);
			}

			return (
				<div
					className={cn(
						'rounded font-semibold px-2 py-0.5 inline-block',
						value < 10
							? 'bg-red-600/20 text-red-600 dark:bg-red-800/30 dark:text-red-400'
							: 'bg-green-600/20 text-green-600 dark:bg-green-800/30 dark:text-green-400'
					)}
				>
					{value.toFixed(2)}
				</div>
			);
		},
	},
	{
		header: 'Begin Time',
		accessorKey: 'beginTime',
		cell: ({ row }) => {
			const beginTime = row.getValue('beginTime');
			return formatDate(beginTime as string | null | undefined);
		},
	},
	{
		header: 'Duration (sec)',
		accessorKey: 'endTime',
		cell: ({ row }) => {
			const endTime = row.getValue('endTime') as
				| string
				| null
				| undefined;
			const beginTime = row.original?.beginTime as
				| string
				| null
				| undefined;
			return <div>{calculateDuration(endTime, beginTime)}</div>;
		},
	},
];

export function GamesTable() {
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [apiData, setApiData] = useState<ApiResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [dataValidationIssues, setDataValidationIssues] = useState(false);

	const [sorting, setSorting] = useState<SortingState>([
		{
			id: 'gameId',
			desc: true,
		},
	]);

	// Fetch data from API
	useEffect(() => {
		// Helper function to create an empty but valid response object
		const createEmptyResponse = (
			currentPage: number,
			itemsPerPage: number
		): ApiResponse => {
			return {
				status: 'ok',
				count: 0,
				pagination: {
					page: currentPage,
					per_page: itemsPerPage,
					total_items: 0,
					total_pages: 1,
					has_next: false,
					has_prev: currentPage > 1,
				},
				data: [],
			};
		};

		async function fetchGames() {
			setLoading(true);
			setDataValidationIssues(false);

			try {
				// Use our local API proxy instead of calling the external API directly
				const res = await fetch(
					`/api/games?per_page=${perPage}&page=${page}`
				);
				if (!res.ok) {
					throw new Error(`API error: ${res.status}`);
				}

				let rawData: unknown;
				try {
					rawData = await res.json();
				} catch (parseError) {
					throw new Error('Failed to parse API response', {
						cause: parseError,
					});
				}

				// Validate using Zod schema
				let validatedData: ApiResponse;
				try {
					// Parse the data with Zod schema
					console.log(
						'API raw data:',
						JSON.stringify(rawData, null, 2)
					); // Debug response
					const result = ApiResponseSchema.safeParse(rawData);

					if (result.success) {
						validatedData = result.data;
						console.log('Validation successful:', validatedData);
					} else {
						// If validation fails, set flag and create empty response
						console.error(
							'Validation errors:',
							JSON.stringify(result.error.format(), null, 2)
						);
						setDataValidationIssues(true);
						validatedData = createEmptyResponse(page, perPage);
					}
				} catch (validationError) {
					setDataValidationIssues(true);
					// Create a minimal valid structure to prevent UI errors
					validatedData = createEmptyResponse(page, perPage);
					console.error('Failed to validate data:', validationError);
				}

				setApiData(validatedData);
				setError(null);
			} catch (err) {
				console.error('Failed to fetch games:', err);
				setError('Failed to load data. Please try again later.');
				setApiData(createEmptyResponse(page, perPage));
			} finally {
				setLoading(false);
			}
		}

		fetchGames();
	}, [page, perPage]);

	// Create table instance
	const table = useReactTable({
		data: apiData?.data || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		enableSortingRemoval: false,
		state: {
			sorting,
		},
		manualPagination: true, // We're handling pagination outside of the table
	});

	// Get pagination data for the UI
	const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
		currentPage: apiData?.pagination?.page || 1,
		totalPages: apiData?.pagination?.total_pages || 1,
		paginationItemsToDisplay: 5,
	});

	// Handle pagination changes
	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	const handlePerPageChange = (value: string) => {
		setPerPage(Number(value));
		setPage(1); // Reset to first page when changing per_page
	};

	// Copy to clipboard functionality
	const [copySuccess, setCopySuccess] = useState(false);

	// Function to safely copy table data to clipboard
	const copyTableDataToClipboard = () => {
		if (!table.getRowModel().rows.length) return;

		try {
			// Format visible data for Google Sheets (TSV format)
			const visibleData = table
				.getRowModel()
				.rows.map((row) => {
					// Get cell values for each visible column
					return row
						.getVisibleCells()
						.map((cell) => {
							try {
								// Get raw value when possible
								const column = cell.column.id;
								const rawValue =
									row.original?.[column as keyof Game];

								// For formatted values, use appropriate conversions
								if (column === 'crashPoint') {
									return typeof rawValue === 'number' &&
										Number.isFinite(rawValue)
										? String(rawValue)
										: '';
								}

								// For duration column (calculate from the raw dates)
								if (column === 'endTime') {
									const beginTime = row.original?.beginTime;
									return calculateDuration(
										rawValue as string | undefined,
										beginTime as string | undefined
									);
								}

								if (column === 'beginTime') {
									return isValidDate(
										rawValue as string | undefined
									)
										? String(rawValue)
										: '';
								}

								// Default case for other columns
								return String(rawValue ?? '');
							} catch {
								return 'Error';
							}
						})
						.join('\t'); // Tab separated for spreadsheet compatibility
				})
				.join('\n'); // New line for each row

			// Copy to clipboard
			navigator.clipboard
				.writeText(visibleData)
				.then(() => {
					setCopySuccess(true);
					setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
				})
				.catch((err) => {
					console.error('Failed to copy: ', err);
				});
		} catch (error) {
			console.error('Error copying data to clipboard:', error);
		}
	};

	return (
		<div className="space-y-4">
			{dataValidationIssues && (
				<div
					className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
					role="alert"
				>
					<strong className="font-bold">Warning: </strong>
					<span className="block sm:inline">
						Some data validation issues were detected. The displayed
						information might not be accurate.
					</span>
				</div>
			)}

			<div className="overflow-hidden rounded-lg border border-border bg-background">
				{/* Add a toolbar with copy button */}
				<div className="flex justify-between items-center p-2 border-b border-border">
					<div className="text-sm font-medium">Game Data</div>
					<Button
						variant="outline"
						size="sm"
						onClick={copyTableDataToClipboard}
						className="h-8 gap-1"
						title="Copy data to clipboard for spreadsheet"
						disabled={
							loading ||
							!!error ||
							!table.getRowModel().rows.length
						}
					>
						{copySuccess ? (
							<>
								<Check className="h-3.5 w-3.5" />
								<span>Copied!</span>
							</>
						) : (
							<>
								<Copy className="h-3.5 w-3.5" />
								<span>Copy Data</span>
							</>
						)}
					</Button>
				</div>
				<Table className="table-fixed">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow
								key={headerGroup.id}
								className="hover:bg-transparent"
							>
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										className="h-11"
									>
										{header.isPlaceholder ? null : header.column.getCanSort() ? (
											<div
												className={cn(
													header.column.getCanSort() &&
														'flex h-full cursor-pointer select-none items-center justify-between gap-2'
												)}
												onClick={header.column.getToggleSortingHandler()}
												onKeyDown={(e) => {
													if (
														header.column.getCanSort() &&
														(e.key === 'Enter' ||
															e.key === ' ')
													) {
														e.preventDefault();
														header.column.getToggleSortingHandler()?.(
															e
														);
													}
												}}
												tabIndex={
													header.column.getCanSort()
														? 0
														: undefined
												}
											>
												{flexRender(
													header.column.columnDef
														.header,
													header.getContext()
												)}
												{{
													asc: (
														<ChevronUp
															className="shrink-0 opacity-60"
															size={16}
															strokeWidth={2}
															aria-hidden="true"
														/>
													),
													desc: (
														<ChevronDown
															className="shrink-0 opacity-60"
															size={16}
															strokeWidth={2}
															aria-hidden="true"
														/>
													),
												}[
													header.column.getIsSorted() as string
												] ?? null}
											</div>
										) : (
											flexRender(
												header.column.columnDef.header,
												header.getContext()
											)
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{loading ? (
							// Loading state with stable keys for skeleton rows
							Array.from({ length: perPage }).map((_, i) => {
								// Create a stable row key that doesn't use just the index
								const rowKey = `skeleton-row-${page}-${i}`;
								return (
									<TableRow key={rowKey}>
										{columns.map((column, j) => {
											// Create a stable cell key that includes column information
											const cellKey = `${rowKey}-cell-${
												column.id || j
											}`;
											return (
												<TableCell
													key={cellKey}
													className="h-10 py-2"
												>
													<div className="h-3 bg-muted/30 animate-pulse rounded" />
												</TableCell>
											);
										})}
									</TableRow>
								);
							})
						) : error ? (
							// Error state
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-16 text-center text-destructive"
								>
									{error}
								</TableCell>
							</TableRow>
						) : table.getRowModel().rows?.length ? (
							// Data display
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className="py-2"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							// No results
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-16 text-center text-muted-foreground"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{apiData && !loading && !error && (
				<div className="flex items-center justify-between gap-3 max-sm:flex-col">
					{/* Page number information */}
					<p
						className="flex-1 whitespace-nowrap text-sm text-muted-foreground"
						aria-live="polite"
					>
						Page{' '}
						<span className="text-foreground">
							{apiData.pagination.page}
						</span>{' '}
						of{' '}
						<span className="text-foreground">
							{apiData.pagination.total_pages}
						</span>{' '}
						•{' '}
						<span className="text-foreground">
							{apiData.pagination.total_items}
						</span>{' '}
						total items
					</p>

					{/* Pagination buttons */}
					<div className="grow">
						<Pagination>
							<PaginationContent>
								{/* Previous page button */}
								<PaginationItem>
									<Button
										size="icon"
										variant="outline"
										className="disabled:pointer-events-none disabled:opacity-50"
										onClick={() =>
											handlePageChange(page - 1)
										}
										disabled={!apiData.pagination.has_prev}
										aria-label="Go to previous page"
									>
										<ChevronLeft
											size={16}
											strokeWidth={2}
											aria-hidden="true"
										/>
									</Button>
								</PaginationItem>

								{/* Left ellipsis (...) */}
								{showLeftEllipsis && (
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
								)}

								{/* Page number buttons */}
								{pages.map((pageNum) => {
									const isActive =
										pageNum === apiData.pagination.page;
									return (
										<PaginationItem key={pageNum}>
											<Button
												size="icon"
												variant={`${
													isActive
														? 'outline'
														: 'ghost'
												}`}
												onClick={() =>
													handlePageChange(pageNum)
												}
												aria-current={
													isActive
														? 'page'
														: undefined
												}
											>
												{pageNum}
											</Button>
										</PaginationItem>
									);
								})}

								{/* Right ellipsis (...) */}
								{showRightEllipsis && (
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
								)}

								{/* Next page button */}
								<PaginationItem>
									<Button
										size="icon"
										variant="outline"
										className="disabled:pointer-events-none disabled:opacity-50"
										onClick={() =>
											handlePageChange(page + 1)
										}
										disabled={!apiData.pagination.has_next}
										aria-label="Go to next page"
									>
										<ChevronRight
											size={16}
											strokeWidth={2}
											aria-hidden="true"
										/>
									</Button>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</div>

					{/* Results per page */}
					<div className="flex flex-1 justify-end">
						<Select
							value={perPage.toString()}
							onValueChange={handlePerPageChange}
							aria-label="Results per page"
						>
							<SelectTrigger
								id="results-per-page"
								className="w-fit whitespace-nowrap"
							>
								<SelectValue placeholder="Select number of results" />
							</SelectTrigger>
							<SelectContent>
								{[10, 25, 50, 100].map((size) => (
									<SelectItem
										key={size}
										value={size.toString()}
									>
										{size} / page
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			)}
		</div>
	);
}
