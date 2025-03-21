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
import { ExportButton } from '@/components/export-button';
import type {
	ExcelExportConfig,
	ExcelColumnDefinition,
} from '@/utils/export-utils/excel';
import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';

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

	// Current export configuration
	const currentConfig = useMemo(
		() => ({
			value,
			hours,
			intervalMinutes: selectedInterval,
		}),
		[value, hours, selectedInterval]
	);

	// Generate Excel export configuration
	const getExcelConfig = async (): Promise<ExcelExportConfig> => {
		// Transform data for export
		const exportRows = [];

		// Process each hour
		for (const hourKey of hourLabels) {
			const hourData = gridData[hourKey];
			const row: Record<string, unknown> = {
				hour: formatHourLabel(hourKey),
			};

			// Add each interval to the row
			for (const minute of intervalColumns) {
				const intervalKey = minute.toString().padStart(2, '0');
				const intervalData = hourData?.[intervalKey];

				// Add count data
				row[`count_${minute}`] = intervalData?.count || 0;

				// Add percentage data
				row[`percentage_${minute}`] = intervalData?.percentage || 0;

				// Add total games data
				row[`games_${minute}`] = intervalData?.total_games || 0;
			}

			// Add hour totals
			const hourTotal = hourTotals[hourKey];
			if (hourTotal) {
				row.hour_total_count = hourTotal.count;
				row.hour_total_percentage = hourTotal.percentage;
				row.hour_total_games = hourTotal.totalGames;
			}

			exportRows.push(row);
		}

		// Define columns for Excel
		const columns: ExcelColumnDefinition[] = [
			{ header: 'Hour', key: 'hour', width: 15 },
		];

		// Add interval columns
		for (const minute of intervalColumns) {
			const endMinute = minute + selectedInterval;
			const header = `${minute}-${endMinute}`;

			columns.push({
				header: `${header} Count`,
				key: `count_${minute}`,
				width: 12,
			});
			columns.push({
				header: `${header} %`,
				key: `percentage_${minute}`,
				width: 12,
				formatter: (value) =>
					typeof value === 'number' ? `${value.toFixed(1)}%` : '0%',
			});
			columns.push({
				header: `${header} Games`,
				key: `games_${minute}`,
				width: 12,
			});
		}

		// Add hour total columns
		columns.push({
			header: 'Hour Total Count',
			key: 'hour_total_count',
			width: 15,
		});
		columns.push({
			header: 'Hour Total %',
			key: 'hour_total_percentage',
			width: 15,
			formatter: (value) =>
				typeof value === 'number' ? `${value.toFixed(1)}%` : '0%',
		});
		columns.push({
			header: 'Hour Total Games',
			key: 'hour_total_games',
			width: 15,
		});

		// Create configuration for Excel export
		const excelConfig: ExcelExportConfig = {
			fileName: `intervals_analysis_${format(
				new Date(),
				'yyyyMMdd_HHmmss'
			)}.xlsx`,
			creator: 'Crash Game Analytics',
			sheets: [
				{
					name: 'Intervals Data',
					columns,
					data: exportRows,
					autoFilter: true,
					freezeHeader: true,
				},
				// Add configuration sheet
				{
					name: 'Configuration',
					columns: [
						{ header: 'Parameter', key: 'parameter', width: 20 },
						{ header: 'Value', key: 'value', width: 15 },
					],
					data: [
						{
							parameter: 'Crash Point',
							value: currentConfig.value,
						},
						{ parameter: 'Hours', value: currentConfig.hours },
						{
							parameter: 'Interval (minutes)',
							value: currentConfig.intervalMinutes,
						},
					],
					autoFilter: false,
					freezeHeader: true,
				},
			],
		};

		return excelConfig;
	};

	// Generate HTML chart configuration
	const getChartConfig = async (): Promise<HtmlChartConfig> => {
		// We'll create a custom HTML table-based heatmap instead of charts
		// This will better match the intervals visualization in the UI

		// Build HTML chart config with custom heatmap rendering
		const htmlConfig: HtmlChartConfig = {
			title: `Intervals Analysis for Crash Point ${currentConfig.value}x`,
			subtitle: `Games with crash point below ${currentConfig.value}x by time interval`,
			configTable: {
				entries: [
					{ parameter: 'Crash Point', value: currentConfig.value },
					{ parameter: 'Hours', value: currentConfig.hours },
					{
						parameter: 'Interval (minutes)',
						value: currentConfig.intervalMinutes,
					},
				],
			},
			// We'll create a custom HTML structure for visualization
			customHtml: `
				<style>
					.intervals-heatmap {
						border-collapse: collapse;
						width: 100%;
						margin: 20px 0;
						font-size: 14px;
					}
					.intervals-heatmap th, .intervals-heatmap td {
						border: 1px solid #ddd;
						padding: 8px;
						text-align: center;
					}
					.intervals-heatmap th {
						background-color: #f2f2f2;
						font-weight: bold;
					}
					.intervals-heatmap .hour-total {
						background-color: #f8f8f8;
						font-weight: bold;
					}
					.cell-content {
						display: flex;
						flex-direction: column;
						align-items: center;
					}
					.cell-count {
						font-size: 20px;
						font-weight: 500;
					}
					.cell-percentage {
						margin: 4px 0;
					}
					.percentage-badge {
						display: inline-block;
						padding: 2px 6px;
						border-radius: 4px;
						font-weight: 600;
						font-size: 12px;
					}
					.percentage-badge.high {
						background-color: rgba(34, 197, 94, 0.2);
						color: rgb(22, 101, 52);
					}
					.percentage-badge.medium {
						background-color: rgba(234, 179, 8, 0.2);
						color: rgb(113, 63, 18);
					}
					.percentage-badge.low {
						background-color: rgba(239, 68, 68, 0.2);
						color: rgb(153, 27, 27);
					}
					.cell-total {
						font-size: 11px;
						color: #666;
					}
				</style>
				<div class="heatmap-container">
					<table class="intervals-heatmap">
						<thead>
							<tr>
								<th>Hour</th>
								${intervalColumns
									.map((startMinute) => {
										const endMinute =
											startMinute + selectedInterval;
										return `<th>${startMinute}-${endMinute}</th>`;
									})
									.join('')}
								<th class="hour-total">Hour Total</th>
							</tr>
						</thead>
						<tbody>
							${hourLabels
								.map((hourKey) => {
									const hourData = gridData[hourKey];
									const hourTotal = hourTotals[hourKey];

									return `
									<tr>
										<td>${formatHourLabel(hourKey)}</td>
										${intervalColumns
											.map((startMinute) => {
												const intervalKey = startMinute
													.toString()
													.padStart(2, '0');
												const intervalData =
													hourData?.[intervalKey];

												if (!intervalData) {
													return '<td>-</td>';
												}

												// Get badge class based on percentage
												let badgeClass = 'medium';
												const borderlinePercentage =
													100 / value;

												if (
													Math.abs(
														intervalData.percentage -
															borderlinePercentage
													) < 1
												) {
													badgeClass = 'medium';
												} else if (
													intervalData.percentage <
													borderlinePercentage
												) {
													badgeClass = 'low';
												} else {
													badgeClass = 'high';
												}

												return `
												<td>
													<div class="cell-content">
														<div class="cell-count">${intervalData.count}</div>
														<div class="cell-percentage">
															<span class="percentage-badge ${badgeClass}">${intervalData.percentage.toFixed(
													1
												)}%</span>
														</div>
														<div class="cell-total">${intervalData.total_games}</div>
													</div>
												</td>
											`;
											})
											.join('')}
										<td class="hour-total">
											${
												hourTotal
													? `
												<div class="cell-content">
													<div class="cell-count">${hourTotal.count}</div>
													<div class="cell-percentage">
														${(() => {
															// Get badge class for hour total
															let badgeClass =
																'medium';
															const borderlinePercentage =
																100 / value;

															if (
																Math.abs(
																	hourTotal.percentage -
																		borderlinePercentage
																) < 1
															) {
																badgeClass =
																	'medium';
															} else if (
																hourTotal.percentage <
																borderlinePercentage
															) {
																badgeClass =
																	'low';
															} else {
																badgeClass =
																	'high';
															}

															return `<span class="percentage-badge ${badgeClass}">${hourTotal.percentage.toFixed(
																1
															)}%</span>`;
														})()}
													</div>
													<div class="cell-total">${hourTotal.totalGames}</div>
												</div>
											`
													: '-'
											}
										</td>
									</tr>
								`;
								})
								.join('')}
						</tbody>
					</table>
				</div>
			`,
			// We still include a summary table for the data
			dataTable: {
				columns: [
					{ header: 'Hour', key: 'hour' },
					{ header: 'Count', key: 'count' },
					{
						header: 'Percentage',
						key: 'percentage',
						formatter: (value) =>
							typeof value === 'number'
								? `${value.toFixed(1)}%`
								: '0%',
					},
					{ header: 'Total Games', key: 'totalGames' },
				],
				data: hourLabels.map((hourKey) => {
					const hourTotal = hourTotals[hourKey];
					return {
						hour: formatHourLabel(hourKey),
						count: hourTotal?.count || 0,
						percentage: hourTotal?.percentage || 0,
						totalGames: hourTotal?.totalGames || 0,
					};
				}),
			},
			fileName: `intervals_analysis_${format(
				new Date(),
				'yyyyMMdd_HHmmss'
			)}.html`,
		};

		return htmlConfig;
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

						{/* Add Export Button */}
						<ExportButton
							getExcelConfig={getExcelConfig}
							getChartConfig={getChartConfig}
							className="h-8 w-8 ml-2"
						/>
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
