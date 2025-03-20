'use client';

import { useState, useMemo, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useRealTimeIntervalsAnalysis } from '@/hooks/analytics/useRealTimeIntervalsAnalysis';
import { AnalyticsCard } from '../core/AnalyticsCard';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import type {
	IntervalData,
	IntervalGridData,
} from '@/hooks/analytics/analytics-types';

interface IntervalsWidgetProps {
	className?: string;
}

const INTERVAL_OPTIONS = [10, 15, 30] as const;
type IntervalDuration = (typeof INTERVAL_OPTIONS)[number];

export function IntervalsWidget({ className }: IntervalsWidgetProps) {
	// Value for analysis (crash point)
	const [value, setValue] = useState<number>(10);
	const [inputValue, setInputValue] = useState<string>('10');

	// Analysis parameters
	const [selectedInterval, setSelectedInterval] =
		useState<IntervalDuration>(10);
	const [hours, setHours] = useState<number>(24);
	const [hoursInputValue, setHoursInputValue] = useState<string>('24');

	// Fetch data
	const {
		data: intervalsData,
		isLoading,
		error,
	} = useRealTimeIntervalsAnalysis({
		value,
		intervalMinutes: selectedInterval,
		hours,
	});

	// Convert interval data into a grid format for easier rendering
	const gridData = useMemo<IntervalGridData>(() => {
		if (!intervalsData || intervalsData.length === 0) return {};

		const grid: IntervalGridData = {};

		// Process each interval from the API response
		for (const interval of intervalsData) {
			try {
				// Extract date parts from interval_start
				const startDate = parseISO(interval.interval_start);

				// Format the hour key as YYYY-MM-DD HH for row identification
				const hourKey = format(startDate, 'yyyy-MM-dd HH');

				// Extract minute part to determine which column this belongs to
				const startMinute = Number.parseInt(
					format(startDate, 'mm'),
					10
				);

				// Map the minute to the correct column (e.g., 00-10, 10-20, etc.)
				// Column keys are the starting minute: "00", "10", "20", etc.
				const intervalKey = startMinute.toString().padStart(2, '0');

				// Initialize hour row if it doesn't exist
				if (!grid[hourKey]) {
					grid[hourKey] = {};
				}

				// Store interval data in the grid
				grid[hourKey][intervalKey] = interval;
			} catch (err) {
				console.error('Error processing interval:', err);
			}
		}

		return grid;
	}, [intervalsData]);

	// Calculate the interval columns to display based on selected interval
	const intervalColumns = useMemo(() => {
		const columns: number[] = [];
		for (let i = 0; i < 60; i += selectedInterval) {
			columns.push(i);
		}
		return columns;
	}, [selectedInterval]);

	// Handle value input change
	const handleValueInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	// Apply value change
	const applyValueChange = () => {
		const numValue = Number.parseFloat(inputValue);
		if (!Number.isNaN(numValue) && numValue > 0) {
			setValue(numValue);
			// Update input display to show integers without decimal places if it's a whole number
			setInputValue(
				numValue % 1 === 0 ? numValue.toFixed(0) : numValue.toString()
			);
		} else {
			// Format the value display based on whether it's an integer or decimal
			setInputValue(
				value % 1 === 0 ? value.toFixed(0) : value.toString()
			);
		}
	};

	// Handle hours input change
	const handleHoursInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setHoursInputValue(e.target.value);
	};

	// Apply hours change
	const applyHoursChange = () => {
		const numValue = Number.parseInt(hoursInputValue, 10);
		if (!Number.isNaN(numValue) && numValue > 0 && numValue <= 72) {
			setHours(numValue);
		} else {
			setHoursInputValue(hours.toString());
		}
	};

	// Handle key down for inputs
	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		applyFn: () => void
	) => {
		if (e.key === 'Enter') {
			applyFn();
		}
	};

	// Get hour labels (row headers)
	const hourLabels = useMemo(() => {
		return Object.keys(gridData).sort((a, b) => b.localeCompare(a)); // Sort in descending order
	}, [gridData]);

	// Format hour label for display
	const formatHourLabel = (hourKey: string) => {
		try {
			const date = parseISO(`${hourKey}:00:00`);
			return format(date, 'MMM dd, h a');
		} catch {
			return hourKey;
		}
	};

	// State to keep track of current time
	const [currentTime, setCurrentTime] = useState(new Date());

	// Update current time every second
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	// Format interval data for display
	const formatIntervalData = (data: IntervalData | undefined) => {
		if (!data) {
			return (
				<div className="text-center text-muted-foreground text-sm">
					-
				</div>
			);
		}

		// Check if this interval is currently active
		const isCurrentInterval =
			data.interval_end && new Date(data.interval_end) > currentTime;

		// Get the badge color based on percentage
		const badgeColorClass = getPercentageBadgeColor(data.percentage, value);

		return (
			<div className="flex items-stretch w-full divide-x divide-border">
				{/* Left side - Count (larger) */}
				<div
					className={`flex-1 flex items-center justify-center text-2xl ${
						isCurrentInterval ? 'animate-pulse text-primary' : ''
					}`}
				>
					{data.count}
				</div>

				{/* Right side - Percentage and Total */}
				<div className="flex-1 flex flex-col items-center divide-y divide-border">
					{/* Top - Percentage */}
					<div className="py-1 w-full flex justify-center">
						<Badge
							className={`px-2 py-0.5 text-xs font-semibold ${badgeColorClass}`}
						>
							{data.percentage.toFixed(1)}%
						</Badge>
					</div>

					{/* Bottom - Total games */}
					<div className="py-1 w-full flex justify-center">
						<span className="text-xs text-muted-foreground">
							{data.total_games}
						</span>
					</div>
				</div>
			</div>
		);
	};

	// Get percentage badge color based on value and crash point
	const getPercentageBadgeColor = (
		percentage: number,
		crashValue: number
	) => {
		// Calculate the borderline percentage (yellow) based on crash value
		const borderlinePercentage = 100 / crashValue;

		// If we're very close to the borderline (within 1%), use yellow
		if (Math.abs(percentage - borderlinePercentage) < 1) {
			return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
		}

		// If below the borderline, use red (worse than expected)
		if (percentage < borderlinePercentage) {
			return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
		}

		// If above the borderline, use green (better than expected)
		return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
	};

	// Calculate totals for each hour
	const hourTotals = useMemo(() => {
		type HourTotalType = {
			count: number;
			totalGames: number;
			percentage: number;
		};

		const totals: Record<string, HourTotalType> = {};

		// Calculate totals for each hour
		for (const hourKey of Object.keys(gridData)) {
			const hourData = gridData[hourKey];
			let hourCount = 0;
			let hourTotalGames = 0;

			// Sum up all intervals in this hour
			for (const interval of Object.values(hourData)) {
				if (interval) {
					hourCount += interval.count;
					hourTotalGames += interval.total_games;
				}
			}

			totals[hourKey] = {
				count: hourCount,
				totalGames: hourTotalGames,
				percentage:
					hourTotalGames > 0 ? (hourCount / hourTotalGames) * 100 : 0,
			};
		}

		return totals;
	}, [gridData]);

	// Format hour total
	const formatHourTotal = (hourKey: string) => {
		const hourTotal = hourTotals[hourKey];
		if (!hourTotal) return null;

		// Get the badge color based on percentage
		const badgeColorClass = getPercentageBadgeColor(
			hourTotal.percentage,
			value
		);

		return (
			<div className="flex items-stretch w-full divide-x divide-border">
				{/* Left side - Count (larger) */}
				<div className="flex-1 flex items-center justify-center text-2xl font-medium">
					{hourTotal.count}
				</div>

				{/* Right side - Percentage and Total */}
				<div className="flex-1 flex flex-col items-center divide-y divide-border">
					{/* Top - Percentage */}
					<div className="py-1 w-full flex justify-center">
						<Badge
							className={`px-2 py-0.5 text-xs font-semibold ${badgeColorClass}`}
						>
							{hourTotal.percentage.toFixed(1)}%
						</Badge>
					</div>

					{/* Bottom - Total games */}
					<div className="py-1 w-full flex justify-center">
						<span className="text-xs text-muted-foreground">
							{hourTotal.totalGames}
						</span>
					</div>
				</div>
			</div>
		);
	};

	// Render content
	const renderContent = () => {
		if (error) {
			return (
				<Alert
					variant="destructive"
					className="mt-2"
				>
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>{error.message}</AlertDescription>
				</Alert>
			);
		}

		return (
			<div className="w-full">
				<div className="flex flex-col sm:flex-row mb-4 gap-4 justify-between">
					<div className="flex items-center gap-2">
						<span className="text-sm font-medium">Crash Point</span>
						<div className="flex items-center">
							<Input
								id="value-input"
								type="number"
								value={inputValue}
								onChange={handleValueInputChange}
								onBlur={applyValueChange}
								onKeyDown={(e) =>
									handleKeyDown(e, applyValueChange)
								}
								className="w-20 h-8 text-center [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								min="1"
								step="0.1"
							/>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<div className="flex items-center gap-2">
							<span className="text-sm font-medium whitespace-nowrap">
								Hours
							</span>
							<div className="flex items-center">
								<Input
									id="hours-input"
									type="number"
									value={hoursInputValue}
									onChange={handleHoursInputChange}
									onBlur={applyHoursChange}
									onKeyDown={(e) =>
										handleKeyDown(e, applyHoursChange)
									}
									className="w-16 h-8 text-center [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
									min="1"
									max="72"
								/>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<span className="text-sm font-medium whitespace-nowrap">
								Interval
							</span>
							<Tabs
								value={selectedInterval.toString()}
								onValueChange={(value) =>
									setSelectedInterval(
										Number(value) as IntervalDuration
									)
								}
							>
								<TabsList className="grid w-[180px] grid-cols-3 bg-muted/50 p-0.5">
									{INTERVAL_OPTIONS.map((duration) => (
										<TabsTrigger
											key={duration}
											value={duration.toString()}
											className="data-[state=active]:bg-black data-[state=active]:text-white"
										>
											{duration}m
										</TabsTrigger>
									))}
								</TabsList>
							</Tabs>
						</div>
					</div>
				</div>

				<div className="rounded-md border overflow-x-auto">
					<Table className="border-collapse [&_td]:border [&_th]:border [&_td]:border-border [&_th]:border-border">
						<TableHeader>
							<TableRow>
								<TableHead className="w-20 text-center border-r">
									Hour
								</TableHead>
								{intervalColumns.map((startMinute) => {
									const endMinute =
										startMinute + selectedInterval;
									return (
										<TableHead
											key={startMinute}
											className="text-center whitespace-nowrap"
										>
											{startMinute}-{endMinute}
										</TableHead>
									);
								})}
								<TableHead className="text-center whitespace-nowrap bg-muted/30 font-bold border-l-2 border-l-muted-foreground/20 pl-4">
									Hour Total
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{isLoading && hourLabels.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={intervalColumns.length + 2}
										className="h-24 text-center"
									>
										<div className="flex flex-col items-center justify-center gap-2">
											<div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
											<span className="text-sm text-muted-foreground">
												Loading data...
											</span>
										</div>
									</TableCell>
								</TableRow>
							) : hourLabels.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={intervalColumns.length + 2}
										className="h-24 text-center"
									>
										<div className="text-muted-foreground">
											No data available
										</div>
									</TableCell>
								</TableRow>
							) : (
								hourLabels.map((hourKey) => (
									<TableRow key={hourKey}>
										<TableCell className="font-medium text-center border-r">
											{formatHourLabel(hourKey)}
										</TableCell>
										{intervalColumns.map((startMinute) => {
											// Format the minute as a padded string to use as key in grid data
											const intervalKey = startMinute
												.toString()
												.padStart(2, '0');

											return (
												<TableCell
													key={`${hourKey}-${startMinute}`}
													className="text-center"
												>
													{formatIntervalData(
														gridData[hourKey]?.[
															intervalKey
														]
													)}
												</TableCell>
											);
										})}
										<TableCell className="text-center bg-muted/30 border-l-2 border-l-muted-foreground/20 pl-4">
											{formatHourTotal(hourKey)}
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			</div>
		);
	};

	return (
		<AnalyticsCard
			title="Intervals Analysis"
			description={`Games with crash point below ${value}x by time interval`}
			className={className}
		>
			{renderContent()}
		</AnalyticsCard>
	);
}
