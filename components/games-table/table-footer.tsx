'use client';

import React from 'react';
import type { ApiResponse } from '@/models/game';
import { PaginationProvider, usePaginationContext } from './pagination-context';

interface TableFooterInfoProps {
	className?: string;
}

// Footer pagination info component - displays page and total info separately
const FooterPaginationInfo = React.memo(function FooterPaginationInfo({
	className,
}: TableFooterInfoProps) {
	const { page, totalPages, totalItems } = usePaginationContext();

	return (
		<div
			className={`flex w-full justify-between text-sm ${className || ''}`}
		>
			<div className="text-muted-foreground">
				Page <span className="font-medium text-foreground">{page}</span>{' '}
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
}

export function TableFooter({ apiData, page, perPage }: TableFooterProps) {
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
					onPageChange={() => {}}
					onPerPageChange={() => {}}
					onProviderInit={storeProviderUpdate}
				>
					<FooterPaginationInfo />
				</PaginationProvider>
			</div>
		</div>
	);
}
