'use client';

import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
} from 'react';
import type { ReactNode } from 'react';
import type { ApiResponse } from '@/models/game';

// Define the context type
interface PaginationContextType {
	// Current pagination state
	page: number;
	perPage: number;
	totalPages: number;
	totalItems: number;
	hasNext: boolean;
	hasPrev: boolean;

	// Methods to update pagination
	updatePaginationInfo: (apiData: ApiResponse) => void;
	setPage: (page: number) => void;
	setPerPage: (perPage: number) => void;

	// Original callbacks from parent
	onPageChange: (page: number) => void;
	onPerPageChange: (perPage: string) => void;
}

// Create the context with a default value
const PaginationContext = createContext<PaginationContextType | null>(null);

// Custom hook to use the pagination context
export const usePaginationContext = () => {
	const context = useContext(PaginationContext);
	if (!context) {
		throw new Error(
			'usePaginationContext must be used within a PaginationProvider'
		);
	}
	return context;
};

// Props for the provider component
interface PaginationProviderProps {
	children: ReactNode;
	initialApiData: ApiResponse | null;
	initialPage: number;
	initialPerPage: number;
	onPageChange: (page: number) => void;
	onPerPageChange: (perPage: string) => void;
	onProviderInit?: (updateFn: (apiData: ApiResponse) => void) => void;
}

// Provider component that will wrap the header
export function PaginationProvider({
	children,
	initialApiData,
	initialPage,
	initialPerPage,
	onPageChange,
	onPerPageChange,
	onProviderInit,
}: PaginationProviderProps) {
	// Initialize state from props
	const [page, setPageState] = useState(initialPage);
	const [perPage, setPerPageState] = useState(initialPerPage);
	const [totalPages, setTotalPages] = useState(
		initialApiData?.pagination?.total_pages || 1
	);
	const [totalItems, setTotalItems] = useState(
		initialApiData?.pagination?.total_items || 0
	);
	const [hasNext, setHasNext] = useState(
		initialApiData?.pagination?.has_next || false
	);
	const [hasPrev, setHasPrev] = useState(
		initialApiData?.pagination?.has_prev || false
	);

	// Update pagination info from API data
	const updatePaginationInfo = useCallback((apiData: ApiResponse) => {
		if (apiData?.pagination) {
			setPageState(apiData.pagination.page);
			setTotalPages(apiData.pagination.total_pages);
			setTotalItems(apiData.pagination.total_items);
			setHasNext(apiData.pagination.has_next);
			setHasPrev(apiData.pagination.has_prev);
		}
	}, []);

	// Provide the update function to the parent component
	useEffect(() => {
		if (onProviderInit) {
			onProviderInit(updatePaginationInfo);
		}
	}, [onProviderInit, updatePaginationInfo]);

	// Page change handler that updates context and calls the parent callback
	const setPage = useCallback(
		(newPage: number) => {
			setPageState(newPage);
			onPageChange(newPage);
		},
		[onPageChange]
	);

	// Per page change handler that updates context and calls the parent callback
	const setPerPage = useCallback(
		(newPerPage: number) => {
			setPerPageState(newPerPage);
			onPerPageChange(newPerPage.toString());
		},
		[onPerPageChange]
	);

	// Create the context value object
	const contextValue: PaginationContextType = {
		page,
		perPage,
		totalPages,
		totalItems,
		hasNext,
		hasPrev,
		updatePaginationInfo,
		setPage,
		setPerPage,
		onPageChange,
		onPerPageChange,
	};

	return (
		<PaginationContext.Provider value={contextValue}>
			{children}
		</PaginationContext.Provider>
	);
}

// Static components that don't need to re-render

// Page Info component - only updates when page info changes
export const PageInfo = React.memo(function PageInfo({
	compact = false,
}: {
	compact?: boolean;
}) {
	const { page, totalPages, totalItems } = usePaginationContext();

	return (
		<p
			className="flex-1 whitespace-nowrap text-sm text-muted-foreground"
			aria-live="polite"
		>
			{compact ? (
				<>
					Page <span className="text-foreground">{page}</span>/
					<span className="text-foreground">{totalPages}</span>
					<span className="hidden sm:inline">
						{' '}
						• <span className="text-foreground">
							{totalItems}
						</span>{' '}
						items
					</span>
				</>
			) : (
				<>
					Page <span className="text-foreground">{page}</span> of{' '}
					<span className="text-foreground">{totalPages}</span> •{' '}
					<span className="text-foreground">{totalItems}</span> total
					items
				</>
			)}
		</p>
	);
});

// Navigation Buttons component - only updates when page or disabled state changes
export const NavigationButtons = React.memo(function NavigationButtons({
	compact = false,
}: {
	compact?: boolean;
}) {
	const { page, totalPages, hasNext, hasPrev, setPage } =
		usePaginationContext();

	// Calculate disabled states
	const firstDisabled = page === 1 || !hasPrev;
	const prevDisabled = !hasPrev;
	const nextDisabled = !hasNext;
	const lastDisabled = page === totalPages || !hasNext;

	return (
		<div className={`${compact ? 'flex-initial' : 'grow'}`}>
			<div className={compact ? 'flex flex-nowrap gap-1' : undefined}>
				{/* First page button */}
				<button
					type="button"
					className={
						compact
							? 'size-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
							: 'inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
					}
					onClick={() => setPage(1)}
					disabled={firstDisabled}
					aria-label="Go to first page"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>First page</title>
						<polyline points="11 17 6 12 11 7" />
						<polyline points="18 17 13 12 18 7" />
					</svg>
				</button>

				{/* Previous page button */}
				<button
					type="button"
					className={
						compact
							? 'size-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
							: 'inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
					}
					onClick={() => setPage(page - 1)}
					disabled={prevDisabled}
					aria-label="Go to previous page"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>Previous page</title>
						<polyline points="15 18 9 12 15 6" />
					</svg>
				</button>

				{/* Next page button */}
				<button
					type="button"
					className={
						compact
							? 'size-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
							: 'inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
					}
					onClick={() => setPage(page + 1)}
					disabled={nextDisabled}
					aria-label="Go to next page"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>Next page</title>
						<polyline points="9 18 15 12 9 6" />
					</svg>
				</button>

				{/* Last page button */}
				<button
					type="button"
					className={
						compact
							? 'size-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
							: 'inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
					}
					onClick={() => setPage(totalPages)}
					disabled={lastDisabled}
					aria-label="Go to last page"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>Last page</title>
						<polyline points="13 17 18 12 13 7" />
						<polyline points="6 17 11 12 6 7" />
					</svg>
				</button>
			</div>
		</div>
	);
});

// PageSizeSelector component - only updates when perPage changes
export const PageSizeSelector = React.memo(function PageSizeSelector({
	compact = false,
}: {
	compact?: boolean;
}) {
	const { perPage, setPerPage } = usePaginationContext();

	return (
		<div className={compact ? 'flex-initial' : 'flex flex-1 justify-end'}>
			<select
				className="h-8 w-fit rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
				value={perPage}
				onChange={(e) => setPerPage(Number(e.target.value))}
				aria-label="Results per page"
			>
				{[10, 25, 50, 100].map((size) => (
					<option
						key={size}
						value={size}
					>
						{size} / page
					</option>
				))}
			</select>
		</div>
	);
});
