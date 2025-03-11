'use client';

import { usePagination } from '@/components/hooks/use-pagination';
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
} from 'lucide-react';
import type { ApiResponse } from '@/models/game';

interface PaginationControlsProps {
	apiData: ApiResponse;
	page: number;
	perPage: number;
	loading: boolean;
	error: string | null;
	onPageChange: (page: number) => void;
	onPerPageChange: (value: string) => void;
}

export function PaginationControls({
	apiData,
	page,
	perPage,
	loading,
	error,
	onPageChange,
	onPerPageChange,
}: PaginationControlsProps) {
	// Get pagination data for the UI
	const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
		currentPage: apiData?.pagination?.page || 1,
		totalPages: apiData?.pagination?.total_pages || 1,
		paginationItemsToDisplay: 5,
	});

	if (loading || error || !apiData) {
		return null;
	}

	return (
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
						{/* First page button */}
						<PaginationItem>
							<Button
								size="icon"
								variant="outline"
								className="disabled:pointer-events-none disabled:opacity-50"
								onClick={() => onPageChange(1)}
								disabled={
									page === 1 || !apiData.pagination.has_prev
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
								size="icon"
								variant="outline"
								className="disabled:pointer-events-none disabled:opacity-50"
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
											isActive ? 'outline' : 'ghost'
										}`}
										onClick={() => onPageChange(pageNum)}
										aria-current={
											isActive ? 'page' : undefined
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
								size="icon"
								variant="outline"
								className="disabled:pointer-events-none disabled:opacity-50"
								onClick={() =>
									onPageChange(apiData.pagination.total_pages)
								}
								disabled={
									page === apiData.pagination.total_pages ||
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

			{/* Results per page */}
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
		</div>
	);
}
