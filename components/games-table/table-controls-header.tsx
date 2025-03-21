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
import { ExportButton } from '@/components/export-button';
import { Wifi, WifiOff, RefreshCw, RefreshCwOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ExcelExportConfig } from '@/utils/export-utils/excel';

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
	// New props for auto-refresh feature
	autoRefreshEnabled?: boolean;
	onAutoRefreshToggle?: () => void;
	newGamesCount?: number;
	onRefreshClick?: () => void;
	// New props for crash point threshold
	crashPointThreshold?: number;
	onCrashPointThresholdChange?: (threshold: number) => void;
	// Export data function
	getExcelConfig?: () => Promise<ExcelExportConfig>;
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
	// New props with defaults
	autoRefreshEnabled = true,
	onAutoRefreshToggle = () => {},
	newGamesCount = 0,
	onRefreshClick = () => {},
	// New crash point threshold props
	crashPointThreshold = 10.0,
	onCrashPointThresholdChange = () => {},
	// Export function
	getExcelConfig,
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

	// Add a component for the crash point threshold selector
	const CrashPointThresholdSelector = () => {
		// Add state for the input value
		const [thresholdInput, setThresholdInput] = React.useState(
			crashPointThreshold.toString()
		);

		// Handle input changes
		const handleThresholdInputChange = (
			e: React.ChangeEvent<HTMLInputElement>
		) => {
			setThresholdInput(e.target.value);
		};

		// Apply threshold change
		const applyThresholdChange = () => {
			const newThreshold = Number.parseFloat(thresholdInput);
			if (!Number.isNaN(newThreshold) && newThreshold > 0) {
				onCrashPointThresholdChange(newThreshold);
			} else {
				// Reset to current value if invalid
				setThresholdInput(crashPointThreshold.toString());
			}
		};

		// Handle key down for input
		const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				applyThresholdChange();
			}
		};

		// Update input when threshold changes
		React.useEffect(() => {
			setThresholdInput(crashPointThreshold.toString());
		}, [crashPointThreshold]);

		return (
			<div className="flex-initial ml-2 flex items-center text-sm text-foreground">
				<span className="mr-2">Crash point</span>
				<div className="w-16">
					<input
						type="number"
						value={thresholdInput}
						onChange={handleThresholdInputChange}
						onBlur={applyThresholdChange}
						onKeyDown={handleKeyDown}
						min="1"
						step="0.1"
						aria-label="Crash point threshold"
						className="w-full h-8 rounded-md border border-input bg-background px-3 py-1 text-sm text-center text-foreground [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
					/>
				</div>
			</div>
		);
	};

	return (
		<TooltipProvider>
			<Card className="sticky top-0 z-10 mb-4 p-0 shadow-md">
				<CardContent className="p-3">
					<div className="flex items-center gap-3">
						{/* Connection Status & Auto-refresh section - grouped in a bordered container */}
						{showWebSocketStatus && (
							<div className="flex items-center border border-border rounded-md h-8 px-2 gap-2">
								{/* WebSocket status indicator */}
								<Tooltip>
									<TooltipTrigger asChild>
										<div className="flex items-center">
											{isConnected ? (
												<Wifi className="h-5 w-5 text-foreground" />
											) : (
												<WifiOff className="h-5 w-5 text-muted-foreground" />
											)}
										</div>
									</TooltipTrigger>
									<TooltipContent>
										<p>WebSocket: {connectionStatus}</p>
									</TooltipContent>
								</Tooltip>

								{/* Auto-refresh toggle */}
								{isConnected && (
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												onClick={onAutoRefreshToggle}
												className="h-6 w-6 p-0"
											>
												{autoRefreshEnabled ? (
													<RefreshCw className="h-4 w-4 text-foreground" />
												) : (
													<RefreshCwOff className="h-4 w-4 text-muted-foreground" />
												)}
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>
												Auto-refresh:{' '}
												{autoRefreshEnabled
													? 'ON'
													: 'OFF'}
											</p>
										</TooltipContent>
									</Tooltip>
								)}

								{/* New Games Counter - Moved from right side to left group box */}
								{isConnected &&
									!autoRefreshEnabled &&
									newGamesCount > 0 && (
										<Tooltip>
											<TooltipTrigger asChild>
												<Button
													variant="ghost"
													size="icon"
													onClick={onRefreshClick}
													className="h-6 w-6 p-0"
												>
													<Badge
														variant="destructive"
														className="flex items-center justify-center h-5 min-w-5 px-1.5 text-xs font-medium rounded-md"
													>
														{newGamesCount > 99
															? '99+'
															: newGamesCount}
													</Badge>
												</Button>
											</TooltipTrigger>
											<TooltipContent>
												<p>
													{newGamesCount} new game
													{newGamesCount === 1
														? ''
														: 's'}{' '}
													- Click to refresh
												</p>
											</TooltipContent>
										</Tooltip>
									)}
							</div>
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
									<div className="flex items-center">
										<PageSizeSelector compact={true} />
										{/* Add the crash point threshold selector next to page size */}
										<CrashPointThresholdSelector />
									</div>

									{/* Static page info component that only updates when page info changes */}
									{!hidePageInfo && (
										<PageInfo compact={true} />
									)}

									{/* Navigation section with enhanced copy button */}
									<div className="flex items-center gap-2">
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

										{/* Export button */}
										{getExcelConfig && (
											<ExportButton
												getExcelConfig={getExcelConfig}
												className="h-8 w-8 ml-1"
											/>
										)}
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
