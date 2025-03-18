'use client';

import { useState, useEffect } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useRealTimeOccurrences } from '@/hooks/analytics/useRealTimeOccurrences';
import { AnalyticsCard } from '../core/AnalyticsCard';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface OccurrencesTableProps {
	className?: string;
}

// Min crash points (current streak) - all values
const CURRENT_STREAK_POINTS = [
	2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 30, 40, 50, 100, 150, 200, 500, 1000,
];

// Exact crash points (unique streak) - only 1-10
const UNIQUE_STREAK_POINTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// All crash points for API requests
const ALL_CRASH_POINTS = [
	...new Set([...CURRENT_STREAK_POINTS, ...UNIQUE_STREAK_POINTS]),
];

export function OccurrencesTable({ className }: OccurrencesTableProps) {
	// State variables for component
	const [selectedType, setSelectedType] = useState<'current' | 'unique'>(
		'current'
	);
	const [analyzeBy, setAnalyzeBy] = useState<'games' | 'time'>('games');
	const [limit, setLimit] = useState(2000);
	const [limitInput, setLimitInput] = useState(limit.toString());
	const [hours, setHours] = useState(24);
	const [hoursInput, setHoursInput] = useState(hours.toString());

	// Update input values when limit/hours change externally
	useEffect(() => {
		setLimitInput(limit.toString());
	}, [limit]);

	useEffect(() => {
		setHoursInput(hours.toString());
	}, [hours]);

	// Handle limit input changes
	const handleLimitInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Just update the input value, don't update limit yet
		setLimitInput(e.target.value);
	};

	// Apply limit change
	const applyLimitChange = () => {
		const newLimit = Number.parseInt(limitInput, 10);
		// Ensure limit is within valid range and is a number
		if (!Number.isNaN(newLimit) && newLimit >= 100 && newLimit <= 10000) {
			setLimit(newLimit);
		} else {
			// Reset to current limit if invalid
			setLimitInput(limit.toString());
		}
	};

	// Handle hours input changes
	const handleHoursInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Just update the input value, don't update hours yet
		setHoursInput(e.target.value);
	};

	// Apply hours change
	const applyHoursChange = () => {
		const newHours = Number.parseInt(hoursInput, 10);
		// Ensure hours is within valid range and is a number
		if (!Number.isNaN(newHours) && newHours >= 1 && newHours <= 168) {
			setHours(newHours);
		} else {
			// Reset to current hours if invalid
			setHoursInput(hours.toString());
		}
	};

	// Handle key down for both inputs
	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		applyFn: () => void
	) => {
		if (e.key === 'Enter') {
			applyFn();
		}
	};

	// Get the current points to display based on selected tab
	const pointsToShow =
		selectedType === 'current'
			? CURRENT_STREAK_POINTS
			: UNIQUE_STREAK_POINTS;

	// Fetch data with real-time updates
	const {
		data: occurrencesData,
		isLoading: occurrencesLoading,
		error: occurrencesError,
	} = useRealTimeOccurrences({
		values: ALL_CRASH_POINTS,
		analyzeBy,
		limit,
		hours,
	});

	// Skeleton component for loading state
	const TableSkeleton = () => {
		return (
			<>
				{Array.from({ length: pointsToShow.length }).map((_, index) => (
					<TableRow
						key={`skeleton-row-${index}-${selectedType}`}
						className="h-10"
					>
						<TableCell className="py-1">
							<div className="h-4 w-14 animate-pulse rounded bg-muted" />
						</TableCell>
						<TableCell className="py-1">
							<div className="h-5 w-16 animate-pulse rounded bg-muted" />
						</TableCell>
						<TableCell className="py-1">
							<div className="h-5 w-12 animate-pulse rounded bg-muted" />
						</TableCell>
					</TableRow>
				))}
			</>
		);
	};

	// Function to get badge color based on percentage
	const getPercentageBadgeColor = (
		percentage: number,
		point: number,
		type: 'current' | 'unique'
	) => {
		// For Exact Value tab, always use blue
		if (type === 'unique') {
			return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
		}

		// For Above Value tab
		const threshold = 100 / point;

		if (percentage < threshold) {
			return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'; // Below threshold
		}

		if (Math.abs(percentage - threshold) < 0.05) {
			return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'; // At threshold
		}

		return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'; // Above threshold
	};

	// Render content
	const renderContent = () => {
		if (occurrencesError) {
			return (
				<Alert
					variant="destructive"
					className="mt-2"
				>
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>
						{occurrencesError.message}
					</AlertDescription>
				</Alert>
			);
		}

		return (
			<div className="w-full">
				<div className="flex justify-between items-center mb-4">
					<Tabs
						defaultValue="current"
						value={selectedType}
						onValueChange={(value) =>
							setSelectedType(value as 'current' | 'unique')
						}
					>
						<TabsList className="grid w-[240px] grid-cols-2 bg-muted/50 p-0.5">
							<TabsTrigger
								value="current"
								className="data-[state=active]:bg-black data-[state=active]:text-white"
							>
								Above Value
							</TabsTrigger>
							<TabsTrigger
								value="unique"
								className="data-[state=active]:bg-black data-[state=active]:text-white"
							>
								Exact Value
							</TabsTrigger>
						</TabsList>
					</Tabs>

					<div className="flex items-center gap-3">
						{analyzeBy === 'games' ? (
							<Input
								id="limit"
								type="number"
								className="h-8 text-sm text-center [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								value={limitInput}
								onChange={handleLimitInputChange}
								onBlur={applyLimitChange}
								onKeyDown={(e) =>
									handleKeyDown(e, applyLimitChange)
								}
								min={100}
								max={10000}
								step={100}
							/>
						) : (
							<Input
								id="hours"
								type="number"
								className="h-8 text-sm text-center [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								value={hoursInput}
								onChange={handleHoursInputChange}
								onBlur={applyHoursChange}
								onKeyDown={(e) =>
									handleKeyDown(e, applyHoursChange)
								}
								min={1}
								max={168}
								step={1}
							/>
						)}

						<Tabs
							defaultValue="games"
							value={analyzeBy}
							onValueChange={(value) =>
								setAnalyzeBy(value as 'games' | 'time')
							}
						>
							<TabsList className="grid w-[240px] grid-cols-2 bg-muted/50 p-0.5">
								<TabsTrigger
									value="games"
									className="data-[state=active]:bg-black data-[state=active]:text-white"
								>
									Games
								</TabsTrigger>
								<TabsTrigger
									value="time"
									className="data-[state=active]:bg-black data-[state=active]:text-white"
								>
									Hours
								</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>
				</div>

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow className="h-9">
								<TableHead className="px-2 py-1.5 w-[120px]">
									Crash Point
								</TableHead>
								<TableHead className="px-2 py-1.5 w-[120px]">
									Occurrences
								</TableHead>
								<TableHead className="px-2 py-1.5 w-[100px]">
									Percentage
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{occurrencesLoading && !occurrencesData ? (
								<TableSkeleton />
							) : (
								pointsToShow.map((point) => {
									// Format the key to match exactly what the API returns (with decimal)
									const pointKey =
										point === Math.floor(point)
											? `${point}.0`
											: point.toString();

									// Get the data for the selected type (current or unique)
									const typeData =
										occurrencesData?.[pointKey]?.[
											selectedType
										];

									const count = typeData?.count ?? 0;
									const percentage =
										typeData?.percentage ?? 0;

									return (
										<TableRow
											key={pointKey}
											className="h-10"
										>
											<TableCell className="font-medium">
												{selectedType === 'current'
													? `≥ ${point}${
															point ===
															Math.floor(point)
																? '.0'
																: ''
													  }`
													: `= ${point}${
															point ===
															Math.floor(point)
																? '.0'
																: ''
													  }`}
											</TableCell>
											<TableCell>{count}</TableCell>
											<TableCell>
												<Badge
													className={cn(
														'px-2 py-0.5 text-xs font-semibold',
														getPercentageBadgeColor(
															percentage,
															point,
															selectedType
														)
													)}
												>
													{percentage.toFixed(2)}%
												</Badge>
											</TableCell>
										</TableRow>
									);
								})
							)}
						</TableBody>
					</Table>
				</div>
			</div>
		);
	};

	return (
		<AnalyticsCard
			title="Occurrences Analysis"
			description="Frequency analysis of crash points"
			className={className}
		>
			{renderContent()}
		</AnalyticsCard>
	);
}
