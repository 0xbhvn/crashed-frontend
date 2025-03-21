'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import type {
	SortingState,
	OnChangeFn,
	TableState,
} from '@tanstack/react-table';
import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';

import type { UseGamesDataReturn } from '@/hooks/useGamesData';
import { useClipboard } from '@/hooks/useClipboard';
import { columns } from './columns';
import { TableSkeleton } from './table-skeleton';
import { TableControlsHeader } from './table-controls-header';
import { TableFooter } from './table-footer';

export interface GamesTableProps {
	onPerPageChange?: (perPage: number) => void;
	gamesDataHook: UseGamesDataReturn;
	autoRefreshEnabled?: boolean;
	onAutoRefreshToggle?: () => void;
	newGamesCount?: number;
	onRefreshClick?: () => void;
	crashPointThreshold?: number;
	onCrashPointThresholdChange?: (threshold: number) => void;
}

// Extend TableState type to include crashPointThreshold
interface ExtendedTableState extends TableState {
	crashPointThreshold?: number;
}

export function GamesTable({
	onPerPageChange,
	gamesDataHook,
	autoRefreshEnabled = true,
	onAutoRefreshToggle = () => {},
	newGamesCount = 0,
	onRefreshClick = () => {},
	crashPointThreshold = 10,
	onCrashPointThresholdChange = () => {},
}: GamesTableProps) {
	// Use the passed hook
	const {
		page,
		perPage,
		apiData,
		loading,
		error,
		dataValidationIssues,
		sorting,
		connectionStatus,
		setPage,
		setPerPage,
		setSorting,
	} = gamesDataHook;

	// Notify parent component when perPage changes
	useEffect(() => {
		if (onPerPageChange && perPage) {
			onPerPageChange(perPage);
		}
	}, [perPage, onPerPageChange]);

	// Copy to clipboard functionality
	const { copySuccess, copyTableDataToClipboard } = useClipboard();

	// Create table instance
	const table = useReactTable({
		data: apiData?.data || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting as OnChangeFn<SortingState>,
		enableSortingRemoval: false,
		state: {
			sorting,
			crashPointThreshold,
		} as ExtendedTableState,
		manualPagination: true, // We're handling pagination outside of the table
		// Force re-calculation of data when it changes
		defaultColumn: {
			// This ensures the table is aware of cell updates
			cell: (info) => info.getValue(),
		},
		// Key the table data by gameId to help React identify which rows have changed
		getRowId: (row) => row.gameId,
	});

	// Extract the copy to clipboard handler for direct call
	const handleCopyData = () =>
		copyTableDataToClipboard(table.getRowModel().rows);

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

			{/* Table controls with WebSocket status - page info hidden */}
			<TableControlsHeader
				apiData={apiData}
				page={page}
				perPage={perPage}
				loading={loading}
				error={error}
				copySuccess={copySuccess}
				onPageChange={setPage}
				onPerPageChange={(value) => {
					setPerPage(Number(value));
					setPage(1); // Reset to first page when changing per_page
				}}
				onCopyClick={handleCopyData}
				showWebSocketStatus={true}
				connectionStatus={connectionStatus}
				hidePageInfo={true} // Hide page info from header
				autoRefreshEnabled={autoRefreshEnabled}
				onAutoRefreshToggle={onAutoRefreshToggle}
				newGamesCount={newGamesCount}
				onRefreshClick={onRefreshClick}
				crashPointThreshold={crashPointThreshold}
				onCrashPointThresholdChange={onCrashPointThresholdChange}
			/>

			<div className="space-y-4 flex flex-col">
				<div className="overflow-hidden rounded-lg border border-border bg-background">
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
															(e.key ===
																'Enter' ||
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
													header.column.columnDef
														.header,
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
								<TableSkeleton
									columns={columns}
									count={perPage}
									page={page}
								/>
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

				{/* Table footer with pagination info - only show when data is loaded */}
				{!loading && !error && apiData && (
					<TableFooter
						apiData={apiData}
						page={page}
						perPage={perPage}
						onPageChange={setPage}
					/>
				)}
			</div>
		</div>
	);
}
