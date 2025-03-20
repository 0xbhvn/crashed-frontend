'use client';

import { useState, useMemo } from 'react';
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
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type {
	IntervalData,
	IntervalGridData,
} from '@/hooks/analytics/analytics-types';

interface IntervalsWidgetProps {
	className?: string;
}

const INTERVAL_DURATIONS = [10, 20, 30, 60] as const;
type IntervalDuration = (typeof INTERVAL_DURATIONS)[number];

export function IntervalsWidget({ className }: IntervalsWidgetProps) {
	// Value for analysis (crash point)
	const [value, setValue] = useState<number>(2.0);
	const [inputValue, setInputValue] = useState<string>('2.0');

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
		} else {
			setInputValue(value.toString());
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

	// Get percentage badge color based on value
	const getPercentageBadgeColor = (percentage: number) => {
		if (percentage >= 60) {
			return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
		}
		if (percentage >= 30) {
			return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
		}
		return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
	};

	// Format hour label for display
	const formatHourLabel = (hourKey: string) => {
		try {
			const date = parseISO(`${hourKey}:00:00`);
			return format(date, 'MMM dd, HH:00');
		} catch {
			return hourKey;
		}
	};

	// Format interval data for display
	const formatIntervalData = (data: IntervalData | undefined) => {
		if (!data) {
			return (
				<div className="text-center text-muted-foreground text-sm">
					-
				</div>
			);
		}

		return (
			<div className="flex flex-col items-center gap-1">
				<Badge
					className={cn(
						'px-2.5 py-0.5 font-semibold',
						getPercentageBadgeColor(data.percentage)
					)}
				>
					{data.percentage.toFixed(1)}%
				</Badge>
				<span className="text-xs text-muted-foreground">
					{data.count}/{data.total_games}
				</span>
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
							<div className="flex gap-1">
								{INTERVAL_DURATIONS.map((duration) => (
									<Button
										key={duration}
										variant={
											selectedInterval === duration
												? 'default'
												: 'outline'
										}
										size="sm"
										onClick={() =>
											setSelectedInterval(duration)
										}
										className="h-8 px-2"
									>
										{duration}m
									</Button>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className="rounded-md border overflow-x-auto">
					<Table>
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
											className={cn(
												'text-center whitespace-nowrap',
												startMinute === 0
													? 'bg-muted'
													: ''
											)}
										>
											{startMinute}:00 to {endMinute}:00
										</TableHead>
									);
								})}
							</TableRow>
						</TableHeader>
						<TableBody>
							{isLoading && hourLabels.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={intervalColumns.length + 1}
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
										colSpan={intervalColumns.length + 1}
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
													className={cn(
														'text-center',
														startMinute === 0
															? 'bg-muted/50'
															: ''
													)}
												>
													{formatIntervalData(
														gridData[hourKey]?.[
															intervalKey
														]
													)}
												</TableCell>
											);
										})}
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
			description={`Crash points occurrence patterns in time intervals (≥ ${value}x)`}
			className={className}
		>
			{renderContent()}
		</AnalyticsCard>
	);
}
