'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from '@/components/ui/tooltip';
import type { ApiResponse } from '@/models/game';
import {
	PaginationProvider,
	PageInfo,
	NavigationButtons,
	PageSizeSelector,
} from './pagination-context';

// Memoized copy button to prevent unnecessary re-renders
const CopyButton = React.memo(
	({
		onClick,
		disabled,
		copySuccess,
	}: {
		onClick: () => void;
		disabled: boolean;
		copySuccess: boolean;
	}) => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					onClick={onClick}
					className="h-8 gap-1 min-w-0 ml-1"
					title="Copy data to clipboard for spreadsheet"
					disabled={disabled}
				>
					{copySuccess ? (
						<>
							<Check className="h-3.5 w-3.5" />
							<span className="hidden sm:inline">Copied!</span>
						</>
					) : (
						<>
							<Copy className="h-3.5 w-3.5" />
							<span className="hidden sm:inline">Copy Data</span>
						</>
					)}
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>Copy table data to clipboard (Ctrl+C)</p>
			</TooltipContent>
		</Tooltip>
	)
);
CopyButton.displayName = 'CopyButton';

interface TableControlsHeaderProps {
	apiData: ApiResponse | null;
	page: number;
	perPage: number;
	loading: boolean;
	error: string | null;
	copySuccess: boolean;
	onPageChange: (page: number) => void;
	onPerPageChange: (value: string) => void;
	onCopyClick: () => void;
	disabled?: boolean;
}

export function TableControlsHeader({
	apiData,
	page,
	perPage,
	loading,
	error,
	copySuccess,
	onPageChange,
	onPerPageChange,
	onCopyClick,
	disabled = false,
}: TableControlsHeaderProps) {
	// Local reference to copy button state to prevent re-renders
	const [localCopyButton, setLocalCopyButton] =
		useState<React.ReactNode | null>(null);

	// Keep a ref to the provider update function
	const providerUpdateRef = useRef<((data: ApiResponse) => void) | null>(
		null
	);

	// Store the callback for provider to use
	const storeProviderUpdate = (updateFn: (data: ApiResponse) => void) => {
		providerUpdateRef.current = updateFn;
	};

	// Determine states for copy button
	const disableCopy =
		loading ||
		!!error ||
		disabled ||
		(apiData && apiData.data.length === 0);

	// Initialize copy button only once (or when its dependencies change)
	useEffect(() => {
		setLocalCopyButton(
			<CopyButton
				onClick={onCopyClick}
				disabled={Boolean(disableCopy)}
				copySuccess={copySuccess}
			/>
		);
	}, [onCopyClick, disableCopy, copySuccess]);

	// Update pagination info when apiData changes
	useEffect(() => {
		if (apiData && providerUpdateRef.current) {
			providerUpdateRef.current(apiData);
		}
	}, [apiData]);

	// If no data yet, render nothing
	if (!apiData) {
		return null;
	}

	return (
		<TooltipProvider>
			<Card className="sticky top-0 z-10 mb-4 p-0 shadow-md">
				<CardContent className="p-3">
					<div className="flex items-center gap-3">
						{/* Wrap in PaginationProvider to isolate state updates */}
						<PaginationProvider
							initialApiData={apiData}
							initialPage={page}
							initialPerPage={perPage}
							onPageChange={onPageChange}
							onPerPageChange={onPerPageChange}
							onProviderInit={storeProviderUpdate}
						>
							<div className="flex-1">
								<div className="flex items-center justify-between gap-2">
									{/* Static page size selector component */}
									<PageSizeSelector compact={true} />

									{/* Static page info component that only updates when page info changes */}
									<PageInfo compact={true} />

									{/* Navigation section with locally managed copy button */}
									<div className="flex items-center gap-1">
										{/* Navigation buttons that only update when page changes */}
										<NavigationButtons compact={true} />

										{/* Copy button that doesn't re-render with pagination changes */}
										{localCopyButton}
									</div>
								</div>
							</div>
						</PaginationProvider>
					</div>
				</CardContent>
			</Card>
		</TooltipProvider>
	);
}
