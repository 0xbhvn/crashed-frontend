'use client';

import * as React from 'react';
import {
	format,
	sub,
	startOfDay,
	endOfDay,
	addDays,
	isAfter,
	differenceInDays,
} from 'date-fns';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useDateRangeIntervalsAnalysis } from '@/hooks/analytics/intervals';
import { exportToExcel } from '@/utils/export-utils/excel';
import { generateChartHtml } from '@/utils/export-utils/chart-html';
import { getExcelConfig } from './excel-export';
import { generateIntervalsHtmlConfig } from '@/utils/export-utils/intervals-html';
import type {
	TimeIntervalDuration,
	GameIntervalSize,
} from '@/utils/export-utils/types';
import type {
	IntervalGridData,
	IntervalData,
	GameSetIntervalData,
} from '@/utils/analytics-types';
import { formatHourLabel } from './intervals-utils';
import type { HourTotalsMap } from './types';
import type { DateRange } from 'react-day-picker';

interface DateRangeExportProps {
	value: number;
	selectedInterval: TimeIntervalDuration | GameIntervalSize;
	hours?: number;
	analyzeBy?: 'time' | 'games';
}

export function DateRangeExport({
	value,
	selectedInterval,
	hours = 24,
	analyzeBy = 'time',
}: DateRangeExportProps) {
	// Calculate default start date based on hours
	const defaultStartDate = React.useMemo(
		() => startOfDay(sub(new Date(), { hours: hours })),
		[hours]
	);

	// Date range state
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: defaultStartDate,
		to: endOfDay(new Date()),
	});

	// Export status
	const [isExporting, setIsExporting] = React.useState(false);

	// Validate if the date range exceeds 7 days (inclusive of start and end dates)
	const isDateRangeValid = React.useMemo(() => {
		if (!date?.from || !date?.to) return false;
		// Calculate inclusive day difference
		const diffDays = differenceInDays(date.to, date.from) + 1;
		return diffDays <= 7;
	}, [date]);

	// Format dates for API
	const formattedStartDate = React.useMemo(() => {
		if (!date?.from) return format(defaultStartDate, 'yyyy-MM-dd');
		return format(date.from, 'yyyy-MM-dd');
	}, [date, defaultStartDate]);

	const formattedEndDate = React.useMemo(() => {
		if (!date?.to) return format(new Date(), 'yyyy-MM-dd');
		return format(date.to, 'yyyy-MM-dd');
	}, [date]);

	// Use the hook for fetching data
	const { fetchData, isLoading, error } = useDateRangeIntervalsAnalysis({
		value,
		intervalMinutes: selectedInterval as TimeIntervalDuration,
		startDate: formattedStartDate,
		endDate: formattedEndDate,
		analyzeBy,
	});

	// Handle date selection with proper constraints
	const handleDateChange = (newDate: DateRange | undefined) => {
		if (!newDate?.from) {
			setDate(undefined);
			return;
		}

		// Ensure we have a start date
		const startDate = startOfDay(newDate.from);
		let endDate = newDate.to ? endOfDay(newDate.to) : undefined;

		// If we have both dates, check max range
		if (endDate) {
			// Calculate max date (6 days after start date to make 7 days total inclusive)
			const maxDate = endOfDay(addDays(startDate, 6));

			// If end date exceeds max range, cap it
			if (isAfter(endDate, maxDate)) {
				endDate = maxDate;
			}
		}

		// Use a properly typed DateRange object
		if (endDate) {
			setDate({ from: startDate, to: endDate });
		} else {
			// If endDate is undefined, just set the from date
			setDate({ from: startDate, to: undefined });
		}
	};

	// Process export data
	const handleExport = async () => {
		// Check if date range is valid and complete
		if (!isDateRangeValid || !date?.from || !date?.to) {
			toast.error('Please select a valid date range (maximum of 7 days)');
			return;
		}

		try {
			setIsExporting(true);

			// Fetch data
			const intervalsData = await fetchData();

			if (!intervalsData || intervalsData.length === 0) {
				toast.error('No data available for the selected date range');
				return;
			}

			// Convert interval data into a grid format
			const gridData: IntervalGridData = {};

			if (analyzeBy === 'time') {
				// Process for time-based intervals
				for (const interval of intervalsData) {
					try {
						// Type assertion to IntervalData for time-based intervals
						const timeInterval = interval as IntervalData;
						// Extract date parts from interval_start
						const startDateTime = new Date(
							timeInterval.interval_start
						);

						// Format the hour key as YYYY-MM-DD HH for row identification
						const hourKey = format(startDateTime, 'yyyy-MM-dd HH');

						// Extract minute part to determine which column this belongs to
						const startMinute = Number.parseInt(
							format(startDateTime, 'mm'),
							10
						);

						// Map the minute to the correct column
						const intervalKey = startMinute
							.toString()
							.padStart(2, '0');

						// Initialize hour row if it doesn't exist
						if (!gridData[hourKey]) {
							gridData[hourKey] = {};
						}

						// Store interval data in the grid
						gridData[hourKey][intervalKey] = timeInterval;
					} catch {
						// Skip problematic intervals
					}
				}
			} else {
				// Process for game-based intervals
				const rangeSize = 100; // Group by 100 games

				for (const interval of intervalsData) {
					try {
						// Cast interval to GameSetIntervalData to access start_game
						const gameInterval = interval as GameSetIntervalData;
						// Find which "hundred" this game belongs to
						const startGameId = gameInterval.start_game;
						const gameHundred =
							Math.floor(startGameId / rangeSize) * rangeSize;

						// Create a key for this batch
						const significantDigits = Math.floor(
							gameHundred / 100
						).toString();
						const rowKey = `${significantDigits}xx`;

						// Initialize batch row if it doesn't exist
						if (!gridData[rowKey]) {
							gridData[rowKey] = {};
						}

						// Calculate position based on game ID
						const positionWithinRange =
							gameInterval.start_game % rangeSize;
						const gameIntervalSize = Number(selectedInterval);
						const baseIndex = Math.floor(
							positionWithinRange / gameIntervalSize
						);
						const columnKey = baseIndex.toString().padStart(2, '0');

						// Create an IntervalData-compatible object from GameSetIntervalData
						const adaptedInterval: IntervalData = {
							interval_start: gameInterval.start_time,
							interval_end: gameInterval.end_time,
							count: gameInterval.count,
							total_games: gameInterval.total_games,
							percentage: gameInterval.percentage,
						};

						// Store interval data in the grid
						gridData[rowKey][columnKey] = adaptedInterval;
					} catch {
						// Skip problematic intervals
					}
				}
			}

			// Get row labels (row headers) - for both time and game modes
			const rowLabels = Object.keys(gridData).sort((a, b) =>
				b.localeCompare(a)
			);

			// Calculate totals for each row
			const rowTotals: HourTotalsMap = {};
			for (const rowKey of Object.keys(gridData)) {
				const rowData = gridData[rowKey];
				let rowCount = 0;
				let rowTotalGames = 0;

				for (const interval of Object.values(rowData)) {
					if (interval) {
						rowCount += interval.count;
						rowTotalGames += interval.total_games;
					}
				}

				rowTotals[rowKey] = {
					count: rowCount,
					totalGames: rowTotalGames,
					percentage:
						rowTotalGames > 0
							? (rowCount / rowTotalGames) * 100
							: 0,
				};
			}

			// Create export configuration
			const exportConfig = {
				value,
				hours: 0, // Not applicable for date range - using 0 as a placeholder
				intervalMinutes: selectedInterval,
				analyzeBy,
			};

			// Generate Excel configuration
			const excelConfig = getExcelConfig(
				exportConfig,
				gridData,
				rowLabels,
				rowTotals
			);

			// Export to Excel
			await exportToExcel(excelConfig);

			// Generate HTML chart configuration
			const intervalColumns: number[] = [];

			if (analyzeBy === 'time') {
				for (let i = 0; i < 60; i += Number(selectedInterval)) {
					intervalColumns.push(i);
				}
			} else {
				const gameInterval = Number(selectedInterval);
				const columnsPerRow = Math.floor(100 / gameInterval);

				for (let i = 0; i < columnsPerRow; i++) {
					intervalColumns.push(i);
				}
			}

			// Filter out undefined values from gridData
			const definedGridData: Record<
				string,
				Record<string, IntervalData>
			> = {};
			for (const [rowKey, rowData] of Object.entries(gridData)) {
				definedGridData[rowKey] = {};
				for (const [intervalKey, interval] of Object.entries(rowData)) {
					if (interval) {
						definedGridData[rowKey][intervalKey] = interval;
					}
				}
			}

			// Generate HTML chart configuration
			const htmlConfig = generateIntervalsHtmlConfig({
				value,
				hours: 0, // Not applicable for date range
				intervalMinutes: selectedInterval,
				intervalColumns,
				hourLabels: rowLabels,
				gridData: definedGridData,
				hourTotals: rowTotals,
				formatHourLabel,
			});

			// Generate and export chart HTML
			await generateChartHtml(htmlConfig);
		} catch (error) {
			console.error('Export failed:', error);
			toast.error(
				'Failed to export data. Please try again or contact support.'
			);
		} finally {
			setIsExporting(false);
		}
	};

	return (
		<div className="p-3">
			<h2 className="text-base font-semibold mb-3">
				Export {analyzeBy === 'time' ? 'Date' : 'Game'} Range
			</h2>
			<p className="text-sm text-muted-foreground mb-4">
				Select a date range to export detailed intervals data.
				<br />
				Maximum range: 7 days
			</p>

			<div className="mb-6">
				<div className="grid gap-2">
					<div className="grid grid-cols-2 gap-2">
						<Popover>
							<PopoverTrigger asChild>
								<Button
									id="from"
									variant="outline"
									className={cn(
										'justify-start text-left font-normal',
										!date?.from && 'text-muted-foreground'
									)}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{date?.from ? (
										format(date.from, 'PP')
									) : (
										<span>Start date</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent
								className="w-auto p-0"
								align="start"
							>
								<Calendar
									initialFocus
									mode="single"
									selected={date?.from}
									onSelect={(day) => {
										if (day) {
											const newDate: DateRange = {
												from: day,
												to: date?.to,
											};
											handleDateChange(newDate);
										}
									}}
									disabled={(dateObj) =>
										dateObj > new Date() ||
										dateObj < new Date('2023-01-01')
									}
								/>
							</PopoverContent>
						</Popover>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									id="to"
									variant="outline"
									className={cn(
										'justify-start text-left font-normal',
										!date?.to && 'text-muted-foreground'
									)}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{date?.to ? (
										format(date.to, 'PP')
									) : (
										<span>End date</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent
								className="w-auto p-0"
								align="start"
							>
								<Calendar
									initialFocus
									mode="single"
									selected={date?.to}
									onSelect={(day) => {
										if (day && date?.from) {
											const newDate: DateRange = {
												from: date.from,
												to: day,
											};
											handleDateChange(newDate);
										}
									}}
									disabled={(dateObj) =>
										dateObj > new Date() ||
										dateObj <
											(date?.from ||
												new Date('2023-01-01'))
									}
								/>
							</PopoverContent>
						</Popover>
					</div>
					{!isDateRangeValid && date?.from && date?.to && (
						<p className="text-sm text-destructive">
							Date range exceeds 7 days maximum
						</p>
					)}
				</div>
			</div>

			<div className="flex justify-end">
				<Button
					disabled={
						isExporting ||
						isLoading ||
						!isDateRangeValid ||
						!date?.from ||
						!date?.to
					}
					onClick={handleExport}
				>
					{isExporting ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Exporting...
						</>
					) : (
						<>Export Data</>
					)}
				</Button>
			</div>

			{error && (
				<p className="text-sm text-destructive mt-2">
					{error.message || 'Failed to load data'}
				</p>
			)}
		</div>
	);
}
