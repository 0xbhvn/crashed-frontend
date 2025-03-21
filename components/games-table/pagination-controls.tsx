'use client';

import { usePagination } from '@/hooks/usePagination';
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
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	Rows,
} from 'lucide-react';
import type { ApiResponse } from '@/models/game';
import type { ReactNode } from 'react';

interface PaginationControlsProps {
	apiData: ApiResponse;
	page: number;
	perPage: number;
	loading: boolean;
	error: string | null;
	onPageChange: (page: number) => void;
	onPerPageChange: (value: string) => void;
	compact?: boolean;
	copyButton?: ReactNode;
}

export function PaginationControls({
	apiData,
	page,
	perPage,
	loading,
	error,
	onPageChange,
	onPerPageChange,
	compact = false,
	copyButton,
}: PaginationControlsProps) {
	// Get pagination data for the UI
	const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
		currentPage: apiData?.pagination?.page || 1,
		totalPages: apiData?.pagination?.total_pages || 1,
		paginationItemsToDisplay: compact ? 0 : 5,
	});

	if (loading || error || !apiData) {
		return null;
	}

	return (
		<div
			className={`flex items-center ${
				compact
					? 'justify-between gap-2'
					: 'justify-between gap-3 max-sm:flex-col'
			}`}
		>
			{/* Results per page - in compact mode, this appears on the left */}
			{compact && (
				<div className="flex-initial">
					<Select
						value={perPage.toString()}
						onValueChange={onPerPageChange}
						aria-label="Results per page"
					>
						<SelectTrigger
							id="results-per-page"
							className="h-8 w-fit gap-1 whitespace-nowrap px-2 sm:px-3"
						>
							<Rows className="h-3.5 w-3.5" />
							<SelectValue
								placeholder="10"
								className="hidden sm:inline"
							/>
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
			)}

			{/* Page number information */}
			<p
				className="flex-1 whitespace-nowrap text-sm text-muted-foreground"
				aria-live="polite"
			>
				{compact ? (
					<>
						Page{' '}
						<span className="text-foreground">
							{apiData.pagination.page}
						</span>
						/
						<span className="text-foreground">
							{apiData.pagination.total_pages}
						</span>
						<span className="hidden sm:inline">
							{' '}
							•{' '}
							<span className="text-foreground">
								{apiData.pagination.total_items}
							</span>{' '}
							items
						</span>
					</>
				) : (
					<>
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
					</>
				)}
			</p>

			{/* Pagination and copy button group (when in compact mode) */}
			<div className="flex items-center gap-1">
				{/* Pagination buttons */}
				<div className={`${compact ? 'flex-initial' : 'grow'}`}>
					<Pagination>
						<PaginationContent
							className={
								compact ? 'flex flex-nowrap gap-1' : undefined
							}
						>
							{/* First page button */}
							<PaginationItem>
								<Button
									size={compact ? 'icon' : 'icon'}
									variant="outline"
									className={
										compact
											? 'size-8'
											: 'disabled:pointer-events-none disabled:opacity-50'
									}
									onClick={() => onPageChange(1)}
									disabled={
										page === 1 ||
										!apiData.pagination.has_prev
									}
									aria-label="Go to first page"
								>
									<ChevronsLeft
										size={16}
										strokeWidth={2}
										aria-hidden="true"
									/>
								</Button>
							</PaginationItem>

							{/* Previous page button */}
							<PaginationItem>
								<Button
									size={compact ? 'icon' : 'icon'}
									variant="outline"
									className={
										compact
											? 'size-8'
											: 'disabled:pointer-events-none disabled:opacity-50'
									}
									onClick={() => onPageChange(page - 1)}
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

							{/* Page number buttons - only show in non-compact mode */}
							{!compact && (
								<>
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
														onPageChange(pageNum)
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
								</>
							)}

							{/* Next page button */}
							<PaginationItem>
								<Button
									size={compact ? 'icon' : 'icon'}
									variant="outline"
									className={
										compact
											? 'size-8'
											: 'disabled:pointer-events-none disabled:opacity-50'
									}
									onClick={() => onPageChange(page + 1)}
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

							{/* Last page button */}
							<PaginationItem>
								<Button
									size={compact ? 'icon' : 'icon'}
									variant="outline"
									className={
										compact
											? 'size-8'
											: 'disabled:pointer-events-none disabled:opacity-50'
									}
									onClick={() =>
										onPageChange(
											apiData.pagination.total_pages
										)
									}
									disabled={
										page ===
											apiData.pagination.total_pages ||
										!apiData.pagination.has_next
									}
									aria-label="Go to last page"
								>
									<ChevronsRight
										size={16}
										strokeWidth={2}
										aria-hidden="true"
									/>
								</Button>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>

				{/* Copy button (in compact mode) */}
				{compact && copyButton}
			</div>

			{/* Results per page (in non-compact mode) */}
			{!compact && (
				<div className="flex flex-1 justify-end">
					<Select
						value={perPage.toString()}
						onValueChange={onPerPageChange}
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
			)}
		</div>
	);
}
