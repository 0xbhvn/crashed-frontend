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
} from 'lucide-react';
import { useEffect, useState } from 'react';

// Type definitions based on the API response
type Game = {
	gameId: string;
	hashValue: string;
	crashPoint: number;
	calculatedPoint: number;
	crashedFloor: number;
	endTime: string;
	prepareTime: string;
	beginTime: string;
};

type ApiResponse = {
	status: string;
	count: number;
	pagination: {
		page: number;
		per_page: number;
		total_items: number;
		total_pages: number;
		has_next: boolean;
		has_prev: boolean;
	};
	data: Game[];
};

// Format date strings to more readable format
const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: true,
	}).format(date);
};

// Calculate duration between two dates in seconds
const calculateDuration = (endTimeStr: string, beginTimeStr: string) => {
	const endTime = new Date(endTimeStr);
	const beginTime = new Date(beginTimeStr);
	const durationMs = endTime.getTime() - beginTime.getTime();
	const durationSec = durationMs / 1000;
	return durationSec.toFixed(2); // Return with 2 decimal places
};

// Column definitions
const columns: ColumnDef<Game>[] = [
	{
		header: 'Game ID',
		accessorKey: 'gameId',
		cell: ({ row }) => (
			<div className="font-medium">{row.getValue('gameId')}</div>
		),
	},
	{
		header: 'Crash Point',
		accessorKey: 'crashPoint',
		cell: ({ row }) => {
			const value = row.getValue('crashPoint') as number;
			const isHighValue = value >= 10;

			return (
				<div
					className={`font-medium ${
						isHighValue
							? 'text-green-600 dark:text-green-400'
							: 'text-primary'
					}`}
				>
					{value.toFixed(2)}
				</div>
			);
		},
	},
	{
		header: 'Begin Time',
		accessorKey: 'beginTime',
		cell: ({ row }) => formatDate(row.getValue('beginTime') as string),
	},
	{
		header: 'Duration (sec)',
		accessorKey: 'endTime',
		cell: ({ row }) => {
			const endTime = row.getValue('endTime') as string;
			const beginTime = row.original.beginTime;
			return <div>{calculateDuration(endTime, beginTime)}</div>;
		},
	},
];

export function Component() {
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [apiData, setApiData] = useState<ApiResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [sorting, setSorting] = useState<SortingState>([
		{
			id: 'gameId',
			desc: true,
		},
	]);

	// Fetch data from API
	useEffect(() => {
		async function fetchGames() {
			setLoading(true);
			try {
				// Use our local API proxy instead of calling the external API directly
				const res = await fetch(
					`/api/games?per_page=${perPage}&page=${page}`
				);
				if (!res.ok) {
					throw new Error(`API error: ${res.status}`);
				}
				const data = await res.json();
				setApiData(data);
				setError(null);
			} catch (err) {
				console.error('Failed to fetch games:', err);
				setError('Failed to load data. Please try again later.');
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

	// Add this after the usePagination hook functions and before the return statement
	const [copySuccess, setCopySuccess] = useState(false);

	// Function to copy table data to clipboard
	const copyTableDataToClipboard = () => {
		if (!table.getRowModel().rows.length) return;

		// Format visible data for Google Sheets (TSV format)
		const visibleData = table
			.getRowModel()
			.rows.map((row) => {
				// Get cell values for each visible column
				return row
					.getVisibleCells()
					.map((cell) => {
						// Get raw value when possible
						const column = cell.column.id;
						const rawValue =
							row.original[column as keyof typeof row.original];

						// For formatted values, try to get the raw value first
						if (column === 'crashPoint')
							return String(rawValue || '');

						// For duration column (which has accessorKey 'endTime'), calculate duration instead of showing raw endTime
						if (column === 'endTime') {
							const beginTime = row.original.beginTime;
							return calculateDuration(
								String(rawValue || ''),
								beginTime
							);
						}

						if (column === 'beginTime')
							return String(rawValue || '');

						// Return the rendered value as fallback
						return String(rawValue || '');
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
	};

	return (
		<div className="space-y-4">
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
							// Loading state - using unique ID patterns for keys instead of index
							Array.from({ length: perPage }).map((_, index) => (
								<TableRow
									// biome-ignore lint/suspicious/noArrayIndexKey: Using index as key for loading skeletons is acceptable
									key={`loading-row-${index}`}
								>
									{columns.map((column, colIndex) => (
										<TableCell
											// biome-ignore lint/suspicious/noArrayIndexKey: Using indices for loading skeleton cells is acceptable
											key={`loading-cell-${index}-${colIndex}`}
											className="h-10 py-2"
										>
											<div className="h-3 bg-muted/30 animate-pulse rounded" />
										</TableCell>
									))}
								</TableRow>
							))
						) : error ? (
							// Error state
							<TableRow>
								<TableCell
									colSpan={4}
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
