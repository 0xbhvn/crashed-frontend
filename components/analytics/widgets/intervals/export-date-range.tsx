'use client';

import * as React from 'react';
import {
	format,
	sub,
	startOfDay,
	endOfDay,
	addDays,
	isBefore,
	isAfter,
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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDateRangeIntervalsAnalysis } from '@/hooks/analytics/intervals';
import { exportToExcel } from '@/utils/export-utils/excel';
import { generateChartHtml } from '@/utils/export-utils/chart-html';
import { getExcelConfig } from './excel-export';
import { generateIntervalsHtmlConfig } from '@/utils/export-utils/intervals-html';
import type { IntervalDuration } from '@/utils/export-utils/types';
import type { IntervalGridData } from '@/utils/analytics-types';
import { getIntervalColumns, formatHourLabel } from './intervals-utils';
import type { HourTotalsMap } from './types';

interface DateRangeExportProps {
	value: number;
	onOpenChange?: (isOpen: boolean) => void;
}

export function DateRangeExport({ value, onOpenChange }: DateRangeExportProps) {
	// Dialog state
	const [isOpen, setIsOpen] = React.useState(false);

	// Handle dialog open change
	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
		onOpenChange?.(open);
	};

	// Export settings
	const [startDate, setStartDate] = React.useState<Date>(
		startOfDay(sub(new Date(), { days: 6 }))
	);
	const [endDate, setEndDate] = React.useState<Date>(endOfDay(new Date()));
	const [selectedInterval, setSelectedInterval] =
		React.useState<IntervalDuration>(10);

	// Popover states for datepickers to fix closing behavior
	const [startDateOpen, setStartDateOpen] = React.useState<boolean>(false);
	const [endDateOpen, setEndDateOpen] = React.useState<boolean>(false);

	// Export status
	const [isExporting, setIsExporting] = React.useState(false);

	// Validate if the date range exceeds 7 days
	const isDateRangeValid = React.useMemo(() => {
		const maxEndDate = addDays(startDate, 7);
		return !isAfter(endDate, maxEndDate);
	}, [startDate, endDate]);

	// Format dates for API
	const formattedStartDate = React.useMemo(
		() => format(startDate, 'yyyy-MM-dd'),
		[startDate]
	);
	const formattedEndDate = React.useMemo(
		() => format(endDate, 'yyyy-MM-dd'),
		[endDate]
	);

	// Use the hook for fetching data
	const { fetchData, isLoading, error } = useDateRangeIntervalsAnalysis({
		value,
		intervalMinutes: selectedInterval,
		startDate: formattedStartDate,
		endDate: formattedEndDate,
	});

	// Handle interval change
	const handleIntervalChange = (value: string) => {
		setSelectedInterval(Number(value) as IntervalDuration);
	};

	// Process export data
	const processExportData = async () => {
		// Check if date range is valid
		if (!isDateRangeValid) {
			toast.error('Date range cannot exceed maximum of 7 days');
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

			// Convert interval data into a grid format (same as in intervals-widget.tsx)
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
				startDate,
				'yyyyMMdd'
			)}_to_${format(endDate, 'yyyyMMdd')}.xlsx`;

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
					startDate,
					'MMM dd, yyyy'
				)} to ${format(endDate, 'MMM dd, yyyy')}`,
			});

			// Special filename for date range export
			htmlConfig.fileName = `intervals_${value}x_${format(
				startDate,
				'yyyyMMdd'
			)}_to_${format(endDate, 'yyyyMMdd')}.html`;

			// Generate HTML chart
			generateChartHtml(htmlConfig);

			toast.success('Export completed successfully!');
			handleOpenChange(false);
		} catch (err) {
			console.error('Export failed:', err);
			toast.error('Export failed. Please try again.');
		} finally {
			setIsExporting(false);
		}
	};

	return (
		<>
			<Button
				variant="ghost"
				size="sm"
				onClick={() => handleOpenChange(true)}
				className="justify-start rounded-none w-full h-9 px-3 text-sm font-normal hover:bg-muted/50"
			>
				<CalendarIcon className="mr-2 h-4 w-4" />
				Export by Date Range
			</Button>

			<Dialog
				open={isOpen}
				onOpenChange={handleOpenChange}
			>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>
							Export Intervals by Date Range
						</DialogTitle>
						<DialogDescription>
							Select a date range to export intervals data.
							Maximum of 7 days.
						</DialogDescription>
					</DialogHeader>

					<div className="grid gap-4 py-4">
						<div className="space-y-2">
							<span
								id="interval-label"
								className="text-sm font-medium"
							>
								Interval
							</span>
							<Tabs
								aria-labelledby="interval-label"
								value={selectedInterval.toString()}
								onValueChange={handleIntervalChange}
							>
								<TabsList className="grid w-full grid-cols-3 bg-muted/50 p-0.5">
									<TabsTrigger
										value="10"
										className="data-[state=active]:bg-black data-[state=active]:text-white"
									>
										10m
									</TabsTrigger>
									<TabsTrigger
										value="15"
										className="data-[state=active]:bg-black data-[state=active]:text-white"
									>
										15m
									</TabsTrigger>
									<TabsTrigger
										value="30"
										className="data-[state=active]:bg-black data-[state=active]:text-white"
									>
										30m
									</TabsTrigger>
								</TabsList>
							</Tabs>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<span
									id="start-date-label"
									className="text-sm font-medium"
								>
									Start Date
								</span>
								<Popover
									open={startDateOpen}
									onOpenChange={setStartDateOpen}
								>
									<PopoverTrigger asChild>
										<Button
											aria-labelledby="start-date-label"
											variant="outline"
											className={cn(
												'w-full justify-start text-left font-normal',
												!startDate &&
													'text-muted-foreground'
											)}
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{startDate ? (
												format(
													startDate,
													'MMM dd, yyyy'
												)
											) : (
												<span>Pick a date</span>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent
										className="w-auto p-0"
										align="start"
										side="bottom"
										sideOffset={4}
									>
										<Calendar
											mode="single"
											selected={startDate}
											onSelect={(date) => {
												if (date) {
													const newStartDate =
														startOfDay(date);
													setStartDate(newStartDate);

													// If end date is before new start date, adjust it
													if (
														isBefore(
															endDate,
															newStartDate
														)
													) {
														setEndDate(
															endOfDay(
																newStartDate
															)
														);
													}

													// If date range exceeds 7 days, adjust end date
													const maxEndDate = addDays(
														newStartDate,
														7
													);
													if (
														isAfter(
															endDate,
															maxEndDate
														)
													) {
														setEndDate(
															endOfDay(maxEndDate)
														);
													}

													// Close the popover
													setStartDateOpen(false);
												}
											}}
											initialFocus
											disabled={(date) =>
												date > new Date()
											}
											classNames={{
												day_selected:
													'bg-black text-white hover:bg-black hover:text-white focus:bg-black focus:text-white',
											}}
										/>
									</PopoverContent>
								</Popover>
							</div>

							<div className="space-y-2">
								<span
									id="end-date-label"
									className="text-sm font-medium"
								>
									End Date
								</span>
								<Popover
									open={endDateOpen}
									onOpenChange={setEndDateOpen}
								>
									<PopoverTrigger asChild>
										<Button
											aria-labelledby="end-date-label"
											variant="outline"
											className={cn(
												'w-full justify-start text-left font-normal',
												!endDate &&
													'text-muted-foreground'
											)}
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{endDate ? (
												format(endDate, 'MMM dd, yyyy')
											) : (
												<span>Pick a date</span>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent
										className="w-auto p-0"
										align="start"
										side="bottom"
										sideOffset={4}
									>
										<Calendar
											mode="single"
											selected={endDate}
											onSelect={(date) => {
												if (date) {
													// Ensure the date is within valid range
													if (
														isBefore(
															date,
															startDate
														)
													)
														return;

													// If date range exceeds 7 days, don't allow
													const maxEndDate = addDays(
														startDate,
														7
													);
													if (
														isAfter(
															date,
															maxEndDate
														)
													) {
														setEndDate(
															endOfDay(maxEndDate)
														);
													} else {
														setEndDate(
															endOfDay(date)
														);
													}

													// Close the popover
													setEndDateOpen(false);
												}
											}}
											initialFocus
											disabled={(date) =>
												date < startDate ||
												date > new Date() ||
												date > addDays(startDate, 7)
											}
											classNames={{
												day_selected:
													'bg-black text-white hover:bg-black hover:text-white focus:bg-black focus:text-white',
											}}
										/>
									</PopoverContent>
								</Popover>
							</div>
						</div>

						{!isDateRangeValid && (
							<div className="text-sm text-red-500">
								Date range cannot exceed maximum of 7 days
							</div>
						)}

						{error && (
							<div className="text-sm text-red-500">
								{error.message}
							</div>
						)}
					</div>

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => handleOpenChange(false)}
						>
							Cancel
						</Button>
						<Button
							type="button"
							onClick={processExportData}
							disabled={
								isLoading || isExporting || !isDateRangeValid
							}
						>
							{isExporting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Exporting...
								</>
							) : (
								'Export'
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
