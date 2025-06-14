'use client';

import * as React from 'react';
import { format } from 'date-fns';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useRealTimeSeriesAnalysis } from '@/hooks/analytics';

import { pulseKeyframes } from './chart-components';
import { SeriesControls } from './control-components';
import { SeriesChart } from './series-chart';
import { SeriesTable } from './series-table';
import { SeriesQuartileTable } from './series-quartile-table';
import type { SeriesWidgetProps } from './types';
import type { ExportConfig } from '@/utils/export-utils';
import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type {
	HtmlChartConfig,
	ChartDefinition,
} from '@/utils/export-utils/chart-html';
import { getExcelConfig as getExcelConfigUtil } from './excel-export';

export function SeriesWidget({
	defaultValue = 10.0,
	className,
}: SeriesWidgetProps) {
	const [value, setValue] = React.useState<number>(defaultValue);
	const [inputValue, setInputValue] = React.useState<string>(
		defaultValue.toString()
	);
	const [sortBy, setSortBy] = React.useState<'time' | 'length'>('time');
	const [limit, setLimit] = React.useState<number>(2000);
	const [limitInput, setLimitInput] = React.useState(limit.toString());
	const [hours, setHours] = React.useState<number>(24);
	const [hoursInput, setHoursInput] = React.useState(hours.toString());
	const [analyzeBy, setAnalyzeBy] = React.useState<'games' | 'time'>('games');
	const [pulseClass, setPulseClass] = React.useState<string>('');
	const [hoveredQuartile, setHoveredQuartile] = React.useState<string | null>(
		null
	);

	// Track which data set to display (separate from the tab state)
	const [activeDataMode, setActiveDataMode] = React.useState<
		'games' | 'time'
	>('games');

	// Use separate API calls for games and hours modes
	const gamesData = useRealTimeSeriesAnalysis({
		value,
		analyzeBy: 'games',
		limit,
		sortBy,
	});

	const timeData = useRealTimeSeriesAnalysis({
		value,
		analyzeBy: 'time',
		hours,
		sortBy,
	});

	// Determine which data to use based on activeDataMode
	const { data, isLoading, error, totalOccurrences } = React.useMemo(() => {
		return activeDataMode === 'games' ? gamesData : timeData;
	}, [activeDataMode, gamesData, timeData]);

	// Update activeDataMode when analyzeBy changes, but only after loading completes
	React.useEffect(() => {
		if (!isLoading) {
			setActiveDataMode(analyzeBy);
		}
	}, [analyzeBy, isLoading]);

	// Inject pulse animation CSS
	React.useEffect(() => {
		// Create style element
		const styleElement = document.createElement('style');
		styleElement.innerHTML = pulseKeyframes;

		// Add to document head
		document.head.appendChild(styleElement);

		// Clean up on unmount
		return () => {
			document.head.removeChild(styleElement);
		};
	}, []);

	// Update input values when external changes occur
	React.useEffect(() => {
		setInputValue(value.toString());
	}, [value]);

	React.useEffect(() => {
		setLimitInput(limit.toString());
	}, [limit]);

	React.useEffect(() => {
		setHoursInput(hours.toString());
	}, [hours]);

	// Handle crash value input changes
	const handleValueInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Just update the input value, don't update value yet
		setInputValue(e.target.value);
	};

	// Apply crash value change
	const applyValueChange = () => {
		const parsedValue = Number.parseFloat(inputValue);
		if (!Number.isNaN(parsedValue) && parsedValue > 0) {
			setValue(parsedValue);
			// Refresh both data sources when value changes
			gamesData.refreshData();
			timeData.refreshData();
		} else {
			// Reset to current value if invalid
			setInputValue(value.toString());
		}
	};

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
			// Only refresh games data when limit changes
			gamesData.refreshData();
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
			// Only refresh time data when hours changes
			timeData.refreshData();
		} else {
			// Reset to current hours if invalid
			setHoursInput(hours.toString());
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

	// Toggle sort mode
	const toggleSortMode = () => {
		setSortBy(sortBy === 'time' ? 'length' : 'time');
		// Refresh both data sources when sort mode changes
		gamesData.refreshData();
		timeData.refreshData();
	};

	// Function to handle tab change properly
	const handleTabChange = (value: string) => {
		const newAnalyzeBy = value as 'games' | 'time';
		if (newAnalyzeBy !== analyzeBy) {
			// Just update the tab state, actual data switch happens after loading
			setAnalyzeBy(newAnalyzeBy);
		}
	};

	// Format data for the chart
	const chartData = React.useMemo(() => {
		if (!data || !Array.isArray(data) || data.length === 0) return [];

		// For time sorting: Latest on the right
		// For length sorting: Highest on the left
		let formattedData = data.map((series, index) => ({
			id: index + 1,
			seriesId: `${series.start_game_id}-${series.end_game_id}`,
			length: series.length,
			startTime: new Date(series.start_time),
			endTime: new Date(series.end_time),
			crashPoint: series.crash_point,
		}));

		// When sorting by time, the API already returns in chronological order
		// We need to reverse it so latest appears on the right side
		if (sortBy === 'time') {
			formattedData = formattedData.reverse();
		}
		// For length sorting, highest should be on the left
		// The API might already sort by length, but we'll ensure it here
		else if (sortBy === 'length') {
			formattedData.sort((a, b) => b.length - a.length);
		}

		// Re-assign IDs after sorting
		return formattedData.map((item, index) => ({
			...item,
			id: index + 1,
		}));
	}, [data, sortBy]);

	// Get the top series for display
	const topSeries = React.useMemo(() => {
		return Array.isArray(data) ? data.slice(0, 5) : [];
	}, [data]);

	// Calculate max length (true longest series)
	const maxLength = React.useMemo(() => {
		if (!chartData || chartData.length === 0) return 0;
		return Math.max(...chartData.map((item) => item.length));
	}, [chartData]);

	// Update pulse animation class periodically
	React.useEffect(() => {
		if (sortBy !== 'time' || !chartData.length) return;

		// Set initial pulse
		setPulseClass('pulse-animation');

		return () => {
			setPulseClass('');
		};
	}, [sortBy, chartData]);

	// Current export configuration
	const currentConfig: ExportConfig = React.useMemo(
		() => ({
			value,
			analyzeBy: activeDataMode,
			limit,
			hours,
			sortBy,
		}),
		[value, activeDataMode, limit, hours, sortBy]
	);

	// Generate Excel export configuration
	const getExcelConfig =
		React.useCallback(async (): Promise<ExcelExportConfig> => {
			// Get the data using the existing hook's data or refreshing if needed
			let seriesData =
				activeDataMode === 'games' ? gamesData.data : timeData.data;

			// If no data is available, try to refresh
			if (!seriesData || seriesData.length === 0) {
				const api = activeDataMode === 'games' ? gamesData : timeData;
				await api.refreshData();
				seriesData =
					activeDataMode === 'games' ? gamesData.data : timeData.data;
			}

			return getExcelConfigUtil({
				currentConfig,
				seriesData: seriesData || [],
			});
		}, [currentConfig, gamesData, timeData, activeDataMode]);

	// Generate HTML chart configuration
	const getChartConfig =
		React.useCallback(async (): Promise<HtmlChartConfig> => {
			// Use the same data as Excel export
			let seriesData =
				activeDataMode === 'games' ? gamesData.data : timeData.data;

			// If no data is available, try to refresh
			if (!seriesData || seriesData.length === 0) {
				const api = activeDataMode === 'games' ? gamesData : timeData;
				await api.refreshData();
				seriesData =
					activeDataMode === 'games' ? gamesData.data : timeData.data;
			}

			// Transform data for charts
			const exportData = seriesData.map((series) => ({
				length: series.length,
				seriesId: `${series.start_game_id}-${series.end_game_id}`,
				startGameId: series.start_game_id,
				endGameId: series.end_game_id,
				startTime: new Date(series.start_time),
				endTime: new Date(series.end_time),
				crashPoint: series.crash_point,
			}));

			// Extract data for charts
			const seriesLengths = exportData.map((item) => item.length);
			const seriesIds = exportData.map(
				(item) => `${item.startGameId}-${item.endGameId}`
			);
			const crashPoints = exportData.map((item) => item.crashPoint ?? 0);

			// Define series length chart
			const lengthChart: ChartDefinition = {
				id: 'lengthChart',
				title: 'Series Length Chart',
				type: 'bar',
				labels: seriesIds,
				datasets: [
					{
						label: 'Series Length (games)',
						data: seriesLengths,
						backgroundColor: 'rgba(54, 162, 235, 0.7)',
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 1,
					},
				],
				xAxisTitle: 'Series ID',
				yAxisTitle: 'Length (games)',
			};

			// Define crash point chart
			const crashPointChart: ChartDefinition = {
				id: 'crashPointChart',
				title: 'Series Ending Crash Points',
				type: 'bar',
				labels: seriesIds,
				datasets: [
					{
						label: 'Crash Point (x)',
						data: crashPoints,
						backgroundColor: 'rgba(255, 159, 64, 0.7)',
						borderColor: 'rgba(255, 159, 64, 1)',
						borderWidth: 1,
					},
				],
				xAxisTitle: 'Series ID',
				yAxisTitle: 'Crash Point (x)',
			};

			// Build HTML chart config
			const htmlConfig: HtmlChartConfig = {
				title: `Series Analysis for Crash Point ${currentConfig.value}x`,
				configTable: {
					entries: [
						{
							parameter: 'Crash Point',
							value: currentConfig.value,
						},
						{
							parameter: 'Analysis Mode',
							value:
								currentConfig.analyzeBy === 'games'
									? 'Games'
									: 'Hours',
						},
						{
							parameter:
								currentConfig.analyzeBy === 'games'
									? 'Games Limit'
									: 'Hours',
							value:
								currentConfig.analyzeBy === 'games'
									? currentConfig.limit
									: currentConfig.hours,
						},
						{
							parameter: 'Sort By',
							value:
								currentConfig.sortBy === 'time'
									? 'Time'
									: 'Length',
						},
					],
				},
				charts: [lengthChart, crashPointChart],
				dataTable: {
					columns: [
						{ header: 'Series', key: 'seriesId' },
						{ header: 'Length (games)', key: 'length' },
						{
							header: 'Start Time',
							key: 'startTime',
							formatter: (value) =>
								format(value as Date, 'MMM d, yyyy h:mm a'),
						},
						{
							header: 'End Time',
							key: 'endTime',
							formatter: (value) =>
								format(value as Date, 'MMM d, yyyy h:mm a'),
						},
						{ header: 'Crash Point', key: 'crashPoint' },
					],
					data: exportData,
				},
				fileName: `series_charts_${format(
					new Date(),
					'yyyyMMdd_HHmmss'
				)}.html`,
			};

			return htmlConfig;
		}, [currentConfig, gamesData, timeData, activeDataMode]);

	return (
		<Card className={cn('overflow-hidden', className)}>
			<CardHeader className="bg-secondary/10">
				<div className="flex flex-row items-center justify-between">
					<div>
						<CardTitle>Series Analysis</CardTitle>
						<CardDescription>
							Consecutive games without a crash point of {value}x
							or higher
						</CardDescription>
					</div>
					{!isLoading && !error && data && (
						<div className="flex items-center gap-2">
							<div className="flex items-center bg-muted px-3 py-1 rounded-md">
								<span className="text-sm font-medium mr-1">
									Total series found:
								</span>
								<span className="text-sm font-bold">
									{totalOccurrences}
								</span>
							</div>
							<div className="flex items-center bg-muted px-3 py-1 rounded-md">
								<span className="text-sm font-medium mr-1">
									Longest series:
								</span>
								<span className="text-sm font-bold">
									{maxLength}
								</span>
							</div>
						</div>
					)}
				</div>
			</CardHeader>
			<CardContent className="p-6">
				{isLoading ? (
					<div className="space-y-6">
						<Skeleton className="h-[350px] w-full" />
						<Skeleton className="h-6 w-1/3" />
						<Skeleton className="h-32 w-full" />
					</div>
				) : error ? (
					<div className="flex items-center justify-center h-[350px] text-muted-foreground">
						Failed to load series data
					</div>
				) : (
					<>
						<SeriesControls
							inputValue={inputValue}
							value={value}
							analyzeBy={analyzeBy}
							limit={limit}
							limitInput={limitInput}
							hours={hours}
							hoursInput={hoursInput}
							sortBy={sortBy}
							onValueInputChange={handleValueInputChange}
							onLimitInputChange={handleLimitInputChange}
							onHoursInputChange={handleHoursInputChange}
							applyValueChange={applyValueChange}
							applyLimitChange={applyLimitChange}
							applyHoursChange={applyHoursChange}
							handleKeyDown={handleKeyDown}
							toggleSortMode={toggleSortMode}
							handleTabChange={handleTabChange}
							getExcelConfig={getExcelConfig}
							getChartConfig={getChartConfig}
							currentConfig={{
								value,
								analyzeBy,
								limit,
								hours,
								sortBy,
							}}
						/>

						{chartData.length > 0 ? (
							<>
								<SeriesChart
									chartData={chartData}
									value={value}
									sortBy={sortBy}
									pulseClass={pulseClass}
									isProbabilityLoading={false}
									highlightedQuartileRange={hoveredQuartile}
								/>
								<SeriesQuartileTable
									seriesData={chartData}
									onHoverRange={setHoveredQuartile}
									onLeaveRange={() =>
										setHoveredQuartile(null)
									}
									value={value}
								/>
								<SeriesTable
									topSeries={topSeries}
									value={value}
									sortBy={sortBy}
								/>
							</>
						) : (
							<div className="flex items-center justify-center h-[350px] text-muted-foreground">
								No series data available
							</div>
						)}
					</>
				)}
			</CardContent>
		</Card>
	);
}
