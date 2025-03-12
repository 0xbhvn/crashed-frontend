'use client';

import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import type { ApiResponse } from '@/models/game';
import {
	PaginationProvider,
	PageInfo,
	NavigationButtons,
	PageSizeSelector,
} from './pagination-context';
import { CopyButton } from '@/components/copy-button';
import { Wifi, WifiOff } from 'lucide-react';

interface TableControlsHeaderProps {
	apiData: ApiResponse | null;
	page: number;
	perPage: number;
	loading: boolean;
	error: string | null;
	copySuccess?: boolean; // Make optional since we're not using it directly
	onPageChange: (page: number) => void;
	onPerPageChange: (value: string) => void;
	onCopyClick: () => void;
	disabled?: boolean;
	showWebSocketStatus?: boolean;
	connectionStatus?: string;
	hidePageInfo?: boolean; // New prop to hide page info
}

export function TableControlsHeader({
	apiData,
	page,
	perPage,
	loading,
	error,
	onPageChange,
	onPerPageChange,
	onCopyClick,
	disabled = false,
	copySuccess,
	showWebSocketStatus = false,
	connectionStatus = 'Disconnected',
	hidePageInfo = false, // Default to showing page info
}: TableControlsHeaderProps) {
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

	// Get WebSocket connection status
	const isConnected = connectionStatus === 'Connected';

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
						{/* WebSocket status indicator */}
						{showWebSocketStatus && (
							<Tooltip>
								<TooltipTrigger asChild>
									<div className="flex items-center mr-2">
										{isConnected ? (
											<Wifi className="h-5 w-5 text-green-500" />
										) : (
											<WifiOff className="h-5 w-5 text-red-500" />
										)}
									</div>
								</TooltipTrigger>
								<TooltipContent>
									<p>WebSocket: {connectionStatus}</p>
								</TooltipContent>
							</Tooltip>
						)}

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
									{!hidePageInfo && (
										<PageInfo compact={true} />
									)}

									{/* Navigation section with enhanced copy button */}
									<div className="flex items-center gap-1">
										{/* Navigation buttons that only update when page changes */}
										<NavigationButtons compact={true} />

										{/* Enhanced copy button with keyboard shortcuts */}
										<CopyButton
											onClick={onCopyClick}
											disabled={Boolean(disableCopy)}
											className="h-8 gap-1 min-w-0 ml-1"
											showTextLabel={false}
											externalCopySuccess={copySuccess}
										/>
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
