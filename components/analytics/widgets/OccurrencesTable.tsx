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
import {
	AlertCircle,
	ArrowDownIcon,
	ArrowUpIcon,
	ArrowDownUpIcon,
	GitCompareIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import type { OccurrenceComparisonData } from '@/utils/analytics-types';
import { Button } from '@/components/ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { ExportButton } from '@/components/export-button';
import type {
	ExcelExportConfig,
	ExcelColumnDefinition,
} from '@/utils/export-utils/excel';
import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';
import { generateOccurrencesHtmlConfig } from '@/utils/export-utils/occurrences-html';
import { format } from 'date-fns';
import type { BaseWidgetProps } from '@/utils/export-utils/types';
import {
	CURRENT_STREAK_POINTS,
	UNIQUE_STREAK_POINTS,
} from '@/utils/export-utils/types';

// All crash points for API requests
const ALL_CRASH_POINTS = [
	...new Set([...CURRENT_STREAK_POINTS, ...UNIQUE_STREAK_POINTS]),
];

export function OccurrencesTable({ className }: BaseWidgetProps) {
	// State variables for component
	const [selectedType, setSelectedType] = useState<'current' | 'unique'>(
		'current'
	);
	const [analyzeBy, setAnalyzeBy] = useState<'games' | 'time'>('games');
	const [limit, setLimit] = useState(2000);
	const [limitInput, setLimitInput] = useState(limit.toString());
	const [hours, setHours] = useState(24);
	const [hoursInput, setHoursInput] = useState(hours.toString());
	const [showComparison, setShowComparison] = useState(false);

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
		comparison: showComparison,
	});

	// Function to check if the data is comparison data
	const isComparisonData = (
		data: unknown
	): data is OccurrenceComparisonData => {
		return (
			data !== null &&
			typeof data === 'object' &&
			'current_period' in data &&
			'previous_period' in data &&
			'comparison' in data
		);
	};

	// Generate Excel export configuration
	const getExcelConfig = async (): Promise<ExcelExportConfig> => {
		// Transform data for export
		const exportRows = pointsToShow.map((point) => {
			// Format the key to match exactly what the API returns (with decimal)
			const pointKey =
				point === Math.floor(point) ? `${point}.0` : point.toString();

			// Get the data for the selected type (current or unique)
			const dataItem = occurrencesData?.[pointKey]?.[selectedType];

			if (!dataItem) {
				return {
					crashPoint:
						selectedType === 'current'
							? `≥ ${point}${
									point === Math.floor(point) ? '.0' : ''
							  }`
							: `= ${point}${
									point === Math.floor(point) ? '.0' : ''
							  }`,
					occurrences: 0,
					...(showComparison ? { change: '-' } : {}),
					percentage: '0.00%',
					...(showComparison ? { percentChange: '-' } : {}),
				};
			}

			if (isComparisonData(dataItem)) {
				const currentData = dataItem.current_period;
				const comparison = dataItem.comparison;

				return {
					crashPoint:
						selectedType === 'current'
							? `≥ ${point}${
									point === Math.floor(point) ? '.0' : ''
							  }`
							: `= ${point}${
									point === Math.floor(point) ? '.0' : ''
							  }`,
					occurrences: currentData.count,
					...(showComparison
						? {
								change: `${getChangeSymbol(
									comparison.count_diff
								)}${comparison.count_diff}`,
						  }
						: {}),
					percentage: `${currentData.percentage.toFixed(2)}%`,
					...(showComparison
						? {
								percentChange: `${getChangeSymbol(
									analyzeBy === 'games'
										? comparison.count_percent_change
										: comparison.percentage_diff
								)}${Math.abs(
									analyzeBy === 'games'
										? comparison.count_percent_change
										: comparison.percentage_diff
								).toFixed(2)}%`,
						  }
						: {}),
				};
			}

			// Regular data handling (non-comparison)
			const count = dataItem?.count ?? 0;
			const percentage = dataItem?.percentage ?? 0;

			return {
				crashPoint:
					selectedType === 'current'
						? `≥ ${point}${point === Math.floor(point) ? '.0' : ''}`
						: `= ${point}${
								point === Math.floor(point) ? '.0' : ''
						  }`,
				occurrences: count,
				...(showComparison ? { change: '-' } : {}),
				percentage: `${percentage.toFixed(2)}%`,
				...(showComparison ? { percentChange: '-' } : {}),
			};
		});

		// Define columns for Excel
		const columns: ExcelColumnDefinition[] = [
			{ header: 'Crash Point', key: 'crashPoint', width: 15 },
			{ header: 'Occurrences', key: 'occurrences', width: 15 },
			...(showComparison
				? [{ header: 'Change', key: 'change', width: 15 }]
				: []),
			{ header: 'Percentage', key: 'percentage', width: 15 },
			...(showComparison
				? [
						{
							header:
								analyzeBy === 'games' ? '% Change' : '% Diff',
							key: 'percentChange',
							width: 15,
						},
				  ]
				: []),
		];

		// Create configuration for Excel export
		const excelConfig: ExcelExportConfig = {
			fileName: `occurrences_analysis_${format(
				new Date(),
				'yyyyMMdd_HHmmss'
			)}.xlsx`,
			creator: 'Crash Game Analytics',
			sheets: [
				{
					name: 'Occurrences Data',
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
						{ header: 'Value', key: 'value', width: 20 },
					],
					data: [
						{
							parameter: 'Analysis Type',
							value:
								selectedType === 'current'
									? 'Above Value'
									: 'Exact Value',
						},
						{
							parameter: 'Analyze By',
							value:
								analyzeBy === 'games'
									? `Games (${limit})`
									: `Hours (${hours})`,
						},
						{
							parameter: 'Comparison Mode',
							value: showComparison ? 'Enabled' : 'Disabled',
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
		// Use the dedicated utility to generate the HTML config
		return generateOccurrencesHtmlConfig({
			selectedType,
			analyzeBy,
			limit,
			hours,
			showComparison,
			occurrencesData: occurrencesData || {},
			pointsToShow,
		});
	};

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
							<div className="h-5 w-12 animate-pulse rounded bg-muted" />
						</TableCell>
						{showComparison && (
							<TableCell className="py-1">
								<div className="h-5 w-12 animate-pulse rounded bg-muted" />
							</TableCell>
						)}
						<TableCell className="py-1">
							<div className="h-5 w-16 animate-pulse rounded bg-muted" />
						</TableCell>
						{showComparison && (
							<TableCell className="py-1">
								<div className="h-5 w-16 animate-pulse rounded bg-muted" />
							</TableCell>
						)}
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

	// Function to get comparison badge color based on change percentage
	const getComparisonBadgeColor = (changePercent: number) => {
		if (changePercent > 0) {
			return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'; // Positive change
		}
		if (changePercent < 0) {
			return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'; // Negative change
		}
		return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'; // No change
	};

	// Get change indicator symbol
	const getChangeSymbol = (change: number) => {
		if (change > 0) return '+';
		if (change < 0) return ''; // minus sign is already included in negative number
		return '±'; // for zero change
	};

	// Get percentage change icon
	const getPercentChangeIcon = (changePercent: number) => {
		if (changePercent > 0) return <ArrowUpIcon className="mr-1 h-3 w-3" />;
		if (changePercent < 0)
			return <ArrowDownIcon className="mr-1 h-3 w-3" />;
		return <ArrowDownUpIcon className="mr-1 h-3 w-3" />; // for zero change
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
					<div className="flex items-center gap-3">
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

						{/* Comparison Toggle */}
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<div className="flex items-center border border-border rounded-md h-8 px-2">
										<Button
											variant="ghost"
											size="icon"
											onClick={() =>
												setShowComparison(
													!showComparison
												)
											}
											className="h-6 w-6 p-0"
										>
											<GitCompareIcon
												className={cn(
													'h-4 w-4',
													showComparison
														? 'text-green-500'
														: 'text-muted-foreground'
												)}
											/>
										</Button>
									</div>
								</TooltipTrigger>
								<TooltipContent>
									<p>
										Comparison Mode:{' '}
										{showComparison ? 'ON' : 'OFF'}
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						{/* Add Export Button */}
						<ExportButton
							getExcelConfig={getExcelConfig}
							getChartConfig={getChartConfig}
							className="h-8 w-8"
						/>
					</div>

					<div className="flex items-center gap-3">
						{analyzeBy === 'games' ? (
							<Input
								id="limit"
								type="number"
								className="w-24 h-8 text-sm [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								value={limitInput}
								onChange={handleLimitInputChange}
								onBlur={applyLimitChange}
								onKeyDown={(e) =>
									handleKeyDown(e, applyLimitChange)
								}
							/>
						) : (
							<Input
								id="hours"
								type="number"
								className="w-24 h-8 text-sm [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								value={hoursInput}
								onChange={handleHoursInputChange}
								onBlur={applyHoursChange}
								onKeyDown={(e) =>
									handleKeyDown(e, applyHoursChange)
								}
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
								<TableHead className="px-2 py-1.5 w-[80px]">
									Occurrences
								</TableHead>
								{showComparison && (
									<TableHead className="px-2 py-1.5 w-[80px]">
										Change
									</TableHead>
								)}
								<TableHead className="px-2 py-1.5 w-[100px]">
									Percentage
								</TableHead>
								{showComparison && (
									<TableHead className="px-2 py-1.5 w-[120px]">
										{analyzeBy === 'games'
											? '% Change'
											: '% Diff'}
									</TableHead>
								)}
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
									const dataItem =
										occurrencesData?.[pointKey]?.[
											selectedType
										];

									if (!dataItem) {
										return (
											<TableRow
												key={pointKey}
												className="h-10"
											>
												<TableCell className="font-medium">
													{selectedType === 'current'
														? `≥ ${point}${
																point ===
																Math.floor(
																	point
																)
																	? '.0'
																	: ''
														  }`
														: `= ${point}${
																point ===
																Math.floor(
																	point
																)
																	? '.0'
																	: ''
														  }`}
												</TableCell>
												<TableCell>0</TableCell>
												{showComparison && (
													<TableCell>-</TableCell>
												)}
												<TableCell>
													<Badge
														className={cn(
															'px-2 py-0.5 text-xs font-semibold',
															getPercentageBadgeColor(
																0,
																point,
																selectedType
															)
														)}
													>
														0.00%
													</Badge>
												</TableCell>
												{showComparison && (
													<TableCell>-</TableCell>
												)}
											</TableRow>
										);
									}

									// Comparison data handling
									if (isComparisonData(dataItem)) {
										const currentData =
											dataItem.current_period;
										const comparison = dataItem.comparison;

										return (
											<TableRow
												key={pointKey}
												className="h-10"
											>
												<TableCell className="font-medium">
													{selectedType === 'current'
														? `≥ ${point}${
																point ===
																Math.floor(
																	point
																)
																	? '.0'
																	: ''
														  }`
														: `= ${point}${
																point ===
																Math.floor(
																	point
																)
																	? '.0'
																	: ''
														  }`}
												</TableCell>
												<TableCell>
													{currentData.count}
												</TableCell>
												{showComparison && (
													<TableCell>
														<Badge
															className={cn(
																'px-2 py-0.5 text-xs font-semibold',
																comparison.count_diff >
																	0
																	? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
																	: comparison.count_diff <
																	  0
																	? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
																	: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
															)}
														>
															{getChangeSymbol(
																comparison.count_diff
															)}
															{
																comparison.count_diff
															}
														</Badge>
													</TableCell>
												)}
												<TableCell>
													<Badge
														className={cn(
															'px-2 py-0.5 text-xs font-semibold',
															getPercentageBadgeColor(
																currentData.percentage,
																point,
																selectedType
															)
														)}
													>
														{currentData.percentage.toFixed(
															2
														)}
														%
													</Badge>
												</TableCell>
												{showComparison && (
													<TableCell>
														<Badge
															className={cn(
																'px-2 py-0.5 text-xs font-semibold',
																getComparisonBadgeColor(
																	analyzeBy ===
																		'games'
																		? comparison.count_percent_change
																		: comparison.percentage_diff
																)
															)}
														>
															<span className="flex items-center">
																{getPercentChangeIcon(
																	analyzeBy ===
																		'games'
																		? comparison.count_percent_change
																		: comparison.percentage_diff
																)}
																{Math.abs(
																	analyzeBy ===
																		'games'
																		? comparison.count_percent_change
																		: comparison.percentage_diff
																).toFixed(2)}
																%
															</span>
														</Badge>
													</TableCell>
												)}
											</TableRow>
										);
									}

									// Regular data handling (non-comparison)
									if (!isComparisonData(dataItem)) {
										const count = dataItem?.count ?? 0;
										const percentage =
											dataItem?.percentage ?? 0;

										return (
											<TableRow
												key={pointKey}
												className="h-10"
											>
												<TableCell className="font-medium">
													{selectedType === 'current'
														? `≥ ${point}${
																point ===
																Math.floor(
																	point
																)
																	? '.0'
																	: ''
														  }`
														: `= ${point}${
																point ===
																Math.floor(
																	point
																)
																	? '.0'
																	: ''
														  }`}
												</TableCell>
												<TableCell>{count}</TableCell>
												{showComparison && (
													<TableCell>-</TableCell>
												)}
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
												{showComparison && (
													<TableCell>-</TableCell>
												)}
											</TableRow>
										);
									}
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
