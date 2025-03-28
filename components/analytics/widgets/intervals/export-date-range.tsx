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
import type { IntervalDuration } from '@/utils/export-utils/types';
import type { IntervalGridData } from '@/utils/analytics-types';
import { getIntervalColumns, formatHourLabel } from './intervals-utils';
import type { HourTotalsMap } from './types';
import type { DateRange } from 'react-day-picker';

interface DateRangeExportProps {
	value: number;
	selectedInterval: IntervalDuration;
	hours?: number;
}

export function DateRangeExport({
	value,
	selectedInterval,
	hours = 24,
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
		intervalMinutes: selectedInterval,
		startDate: formattedStartDate,
		endDate: formattedEndDate,
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

		setDate({ from: startDate, to: endDate });
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
			for (const interval of intervalsData) {
				try {
					// Extract date parts from interval_start
					const startDateTime = new Date(interval.interval_start);

					// Format the hour key as YYYY-MM-DD HH for row identification
					const hourKey = format(startDateTime, 'yyyy-MM-dd HH');

					// Extract minute part to determine which column this belongs to
					const startMinute = Number.parseInt(
						format(startDateTime, 'mm'),
						10
					);

					// Map the minute to the correct column
					const intervalKey = startMinute.toString().padStart(2, '0');

					// Initialize hour row if it doesn't exist
					if (!gridData[hourKey]) {
						gridData[hourKey] = {};
					}

					// Store interval data in the grid
					gridData[hourKey][intervalKey] = interval;
				} catch {
					// Skip problematic intervals
				}
			}

			// Get hour labels (row headers)
			const hourLabels = Object.keys(gridData).sort((a, b) =>
				b.localeCompare(a)
			);

			// Calculate totals for each hour
			const hourTotals: HourTotalsMap = {};
			for (const hourKey of Object.keys(gridData)) {
				const hourData = gridData[hourKey];
				let hourCount = 0;
				let hourTotalGames = 0;

				for (const interval of Object.values(hourData)) {
					if (interval) {
						hourCount += interval.count;
						hourTotalGames += interval.total_games;
					}
				}

				hourTotals[hourKey] = {
					count: hourCount,
					totalGames: hourTotalGames,
					percentage:
						hourTotalGames > 0
							? (hourCount / hourTotalGames) * 100
							: 0,
				};
			}

			// Create export configuration
			const exportConfig = {
				value,
				hours: 0, // Not applicable for date range
				intervalMinutes: selectedInterval,
			};

			// Generate Excel configuration
			const excelConfig = getExcelConfig(
				exportConfig,
				gridData,
				hourLabels,
				hourTotals
			);

			// Special filename for date range export
			excelConfig.fileName = `intervals_${value}x_${format(
				date.from,
				'yyyyMMdd'
			)}_to_${format(date.to, 'yyyyMMdd')}.xlsx`;

			// Export Excel file
			await exportToExcel(excelConfig);

			// Generate HTML chart
			const intervalColumns = getIntervalColumns(selectedInterval);

			const htmlConfig = generateIntervalsHtmlConfig({
				value,
				hours: 0, // Not applicable for date range
				intervalMinutes: selectedInterval,
				intervalColumns,
				hourLabels,
				gridData,
				hourTotals,
				formatHourLabel,
				subtitle: `Date range: ${format(
					date.from,
					'MMM dd, yyyy'
				)} to ${format(date.to, 'MMM dd, yyyy')}`,
			});

			// Special filename for date range export
			htmlConfig.fileName = `intervals_${value}x_${format(
				date.from,
				'yyyyMMdd'
			)}_to_${format(date.to, 'yyyyMMdd')}.html`;

			// Generate HTML chart
			generateChartHtml(htmlConfig);

			toast.success('Export completed successfully!');
		} catch (err) {
			console.error('Export failed:', err);
			toast.error('Export failed. Please try again.');
		} finally {
			setIsExporting(false);
		}
	};

	return (
		<div className="p-2">
			<div className="flex items-center justify-between border-b pb-2 mb-3">
				<div className="text-sm font-medium">Export Date Range</div>
			</div>

			<div className="mb-4">
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className={cn(
								'w-full justify-start text-left font-normal',
								!date && 'text-muted-foreground'
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{date?.from ? (
								date.to ? (
									<>
										{format(date.from, 'MMM dd, yyyy')} -{' '}
										{format(date.to, 'MMM dd, yyyy')}
									</>
								) : (
									format(date.from, 'MMM dd, yyyy')
								)
							) : (
								<span>Pick a date range</span>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className="w-auto p-0"
						align="start"
					>
						<Calendar
							initialFocus
							mode="range"
							defaultMonth={date?.from}
							selected={date}
							onSelect={handleDateChange}
							numberOfMonths={2}
							disabled={(day) => isAfter(day, new Date())}
							classNames={{
								day_selected:
									'bg-black text-white hover:bg-black hover:text-white focus:bg-black focus:text-white',
								day_range_middle:
									'bg-muted aria-selected:bg-muted/80 aria-selected:text-muted-foreground hover:bg-muted hover:text-muted-foreground focus:bg-muted focus:text-muted-foreground',
							}}
						/>
					</PopoverContent>
				</Popover>
			</div>

			{!isDateRangeValid && date?.from && date?.to && (
				<div className="text-xs text-red-500 mb-2">
					Date range cannot exceed maximum of 7 days
				</div>
			)}

			{error && (
				<div className="text-xs text-red-500 mb-2">{error.message}</div>
			)}

			<Button
				size="sm"
				className="w-full h-8"
				onClick={handleExport}
				disabled={
					isLoading ||
					isExporting ||
					!isDateRangeValid ||
					!date?.from ||
					!date?.to
				}
			>
				{isExporting ? (
					<>
						<Loader2 className="mr-2 h-3 w-3 animate-spin" />
						Exporting...
					</>
				) : (
					'Export'
				)}
			</Button>
		</div>
	);
}
