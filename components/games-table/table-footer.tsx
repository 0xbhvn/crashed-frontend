'use client';

import React, { useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { ApiResponse } from '@/models/game';
import { PaginationProvider, usePaginationContext } from './pagination-context';
import { Input } from '@/components/ui/input';

interface TableFooterInfoProps {
	className?: string;
}

// Footer pagination info component - displays page and total info separately
const FooterPaginationInfo = React.memo(function FooterPaginationInfo({
	className,
}: TableFooterInfoProps) {
	const { page, totalPages, totalItems, setPage } = usePaginationContext();
	const [inputValue, setInputValue] = useState(page.toString());

	// Update input value when page changes externally
	React.useEffect(() => {
		setInputValue(page.toString());
	}, [page]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Just update the input value, don't navigate yet
		setInputValue(e.target.value);
	};

	const navigateToPage = () => {
		const newPage = Number.parseInt(inputValue, 10);
		// Ensure page is within valid range and is a number
		if (!Number.isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
			setPage(newPage);
		} else {
			// Reset to current page if invalid
			setInputValue(page.toString());
		}
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			navigateToPage();
		}
	};

	return (
		<div
			className={`flex w-full justify-between text-sm items-center ${
				className || ''
			}`}
		>
			<div className="text-muted-foreground flex items-center gap-2">
				Page{' '}
				<div className="w-16">
					<Input
						type="number"
						value={inputValue}
						onChange={handleInputChange}
						onBlur={navigateToPage}
						onKeyDown={handleKeyDown}
						min={1}
						max={totalPages}
						aria-label="Page number"
						className="text-center h-7 px-2 py-1 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
					/>
				</div>{' '}
				of{' '}
				<span className="font-medium text-foreground">
					{totalPages}
				</span>
			</div>
			<div className="text-muted-foreground">
				<span className="font-medium text-foreground">
					{totalItems}
				</span>{' '}
				items
			</div>
		</div>
	);
});

interface TableFooterProps {
	apiData: ApiResponse | null;
	page: number;
	perPage: number;
	onPageChange?: (page: number) => void;
}

export function TableFooter({
	apiData,
	page,
	perPage,
	onPageChange = () => {},
}: TableFooterProps) {
	// If no data yet, render nothing
	if (!apiData) {
		return null;
	}

	// Store the callback for provider to use
	const storeProviderUpdate = () => {
		// We don't need to update the provider since we're just displaying info
	};

	return (
		<div className="overflow-hidden rounded-lg border border-border bg-background">
			<div className="px-4 py-3 h-11 flex items-center">
				<PaginationProvider
					initialApiData={apiData}
					initialPage={page}
					initialPerPage={perPage}
					onPageChange={onPageChange}
					onPerPageChange={() => {}}
					onProviderInit={storeProviderUpdate}
				>
					<FooterPaginationInfo />
				</PaginationProvider>
			</div>
		</div>
	);
}
