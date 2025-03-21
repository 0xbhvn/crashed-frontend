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
import type { SeriesWidgetProps } from './types';
import type { ExportConfig } from '@/utils/export-utils';
import type {
	ExcelExportConfig,
	ExcelColumnDefinition,
} from '@/utils/export-utils/excel';
import type {
	HtmlChartConfig,
	ChartDefinition,
} from '@/utils/export-utils/chart-html';

export function SeriesWidget({
	defaultValue = 10.0,
	className,
}: SeriesWidgetProps) {
	const [value, setValue] = React.useState<number>(defaultValue);
	const [inputValue, setInputValue] = React.useState<string>(
		defaultValue.toString()
	);
	const [sortBy, setSortBy] = React.useState<'time' | 'length'>('time');
	const [limit, setLimit] = React.useState<number>(1000);
	const [limitInput, setLimitInput] = React.useState(limit.toString());
	const [hours, setHours] = React.useState<number>(12);
	const [hoursInput, setHoursInput] = React.useState(hours.toString());
	const [analyzeBy, setAnalyzeBy] = React.useState<'games' | 'time'>('games');
	const [pulseClass, setPulseClass] = React.useState<string>('');
	const [showCircles, setShowCircles] = React.useState<boolean>(false);

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

	// Toggle circles visibility
	const toggleCirclesVisibility = () => {
		setShowCircles(!showCircles);
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
		if (!data || data.length === 0) return [];

		// For time sorting: Latest on the right
		// For length sorting: Highest on the left
		let formattedData = data.map((series, index) => ({
			id: index + 1,
			seriesId: `${series.start_game_id}-${series.end_game_id}`,
			length: series.length,
			startTime: new Date(series.start_time),
			endTime: new Date(series.end_time),
			// Include follow streak count and games if available
			followCount: series.follow_streak?.count || 0,
			// Process the game objects to extract ID and crash point
			followGames:
				series.follow_streak?.games?.map((game) =>
					typeof game === 'object' && game !== null
						? `#${game.game_id || 'unknown'}@${
								game.crash_point?.toFixed(2) || '?.??'
						  }x`
						: String(game)
				) || [],
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
		return data?.slice(0, 5) || [];
	}, [data]);

	// Calculate median length for the reference line
	const medianLength = React.useMemo(() => {
		if (!chartData || chartData.length === 0) return 0;

		// Sort lengths and find median
		const sortedLengths = [...chartData]
			.map((item) => item.length)
			.sort((a, b) => a - b);
		const middle = Math.floor(sortedLengths.length / 2);

		// If even number of items, take average of middle two
		if (sortedLengths.length % 2 === 0) {
			return (sortedLengths[middle - 1] + sortedLengths[middle]) / 2;
		}
		// If odd number of items, take middle item
		return sortedLengths[middle];
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
			showCircles,
		}),
		[value, activeDataMode, limit, hours, sortBy, showCircles]
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

			// Transform data for export
			const exportData = seriesData.map((series) => ({
				length: series.length,
				seriesId: `${series.start_game_id}-${series.end_game_id}`,
				startGameId: series.start_game_id,
				endGameId: series.end_game_id,
				startTime: new Date(series.start_time),
				endTime: new Date(series.end_time),
				followCount: series.follow_streak?.count || 0,
				followGames:
					series.follow_streak?.games?.map((game) =>
						typeof game === 'object' && game !== null
							? `#${game.game_id || 'unknown'}@${
									game.crash_point?.toFixed(2) || '?.??'
							  }x`
							: String(game)
					) || [],
			}));

			// Define columns for the main sheet
			const mainColumns: ExcelColumnDefinition[] = [
				{ header: 'Length (games)', key: 'length', width: 15 },
				{
					header: 'Start Game',
					key: 'startGameId',
					width: 15,
					formatter: (value) => `#${value}`,
				},
				{
					header: 'End Game',
					key: 'endGameId',
					width: 15,
					formatter: (value) => `#${value}`,
				},
				{
					header: 'Start Time',
					key: 'startTime',
					width: 20,
					formatter: (value) =>
						format(value as Date, 'MMM d, yyyy h:mm a'),
				},
				{
					header: 'End Time',
					key: 'endTime',
					width: 20,
					formatter: (value) =>
						format(value as Date, 'MMM d, yyyy h:mm a'),
				},
				{
					header: 'Follow Streak Count',
					key: 'followCount',
					width: 18,
				},
			];

			// Create configuration for Excel export
			const excelConfig: ExcelExportConfig = {
				fileName: `series_analysis_${format(
					new Date(),
					'yyyyMMdd_HHmmss'
				)}.xlsx`,
				creator: 'Crash Game Analytics',
				sheets: [
					{
						name: 'Series Data',
						columns: mainColumns,
						data: exportData,
						autoFilter: true,
						freezeHeader: true,
					},
					// Add instructions sheet
					{
						name: 'Chart Instructions',
						columns: [
							{
								header: 'Instructions',
								key: 'instructions',
								width: 60,
							},
						],
						data: [
							{
								instructions:
									'Series Length Chart Instructions',
							},
							{ instructions: '' },
							{ instructions: 'To create a chart in Excel:' },
							{
								instructions:
									'1. Select all data in the Series Data sheet',
							},
							{ instructions: '2. Go to the Insert tab' },
							{
								instructions:
									'3. Click on the Column or Bar chart option',
							},
							{ instructions: '4. Select a chart style' },
							{ instructions: '' },
							{ instructions: 'For Series Length chart:' },
							{
								instructions:
									'- Use "Length (games)" column for values',
							},
							{
								instructions:
									'- Use "Start Game" column for categories',
							},
							{ instructions: '' },
							{ instructions: 'For Follow Streak chart:' },
							{
								instructions:
									'- Use "Follow Streak Count" column for values',
							},
							{
								instructions:
									'- Use "Start Game" column for categories',
							},
						],
						autoFilter: false,
						freezeHeader: false,
					},
				],
			};

			// Add follow games sheet if needed
			if (currentConfig.showCircles) {
				// Flatten follow games data
				const followGamesData = [];
				for (const series of exportData) {
					if (series.followGames && series.followGames.length > 0) {
						for (const game of series.followGames) {
							// Split game data (format is typically "#GAMEID@CRASHPOINTx")
							const parts = String(game).split('@');
							const gameId = parts[0];
							const crashPoint = parts.length > 1 ? parts[1] : '';

							followGamesData.push({
								series: `${series.startGameId}-${series.endGameId}`,
								gameId: gameId,
								crashPoint: crashPoint,
							});
						}
					}
				}

				// Add follow games sheet
				excelConfig.sheets.push({
					name: 'Follow Games',
					columns: [
						{ header: 'Series', key: 'series', width: 25 },
						{ header: 'Game ID', key: 'gameId', width: 15 },
						{ header: 'Crash Point', key: 'crashPoint', width: 15 },
					],
					data:
						followGamesData.length > 0
							? followGamesData
							: [
									{
										series: 'No follow games data available',
										gameId: '',
										crashPoint: '',
									},
							  ],
					autoFilter: true,
					freezeHeader: true,
				});
			}

			// Add configuration sheet
			excelConfig.sheets.push({
				name: 'Configuration',
				columns: [
					{ header: 'Parameter', key: 'parameter', width: 20 },
					{ header: 'Value', key: 'value', width: 15 },
				],
				data: [
					{ parameter: 'Crash Point', value: currentConfig.value },
					{
						parameter: 'Analysis Mode',
						value:
							currentConfig.analyzeBy === 'games'
								? 'Games'
								: 'Hours',
					},
					{ parameter: 'Games Limit', value: currentConfig.limit },
					{ parameter: 'Hours', value: currentConfig.hours },
					{
						parameter: 'Sort By',
						value:
							currentConfig.sortBy === 'time' ? 'Time' : 'Length',
					},
					{
						parameter: 'Show Follow Games',
						value: currentConfig.showCircles ? 'Yes' : 'No',
					},
				],
				autoFilter: false,
				freezeHeader: true,
			});

			return excelConfig;
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
				followCount: series.follow_streak?.count || 0,
			}));

			// Extract data for charts
			const seriesLengths = exportData.map((item) => item.length);
			const seriesIds = exportData.map(
				(item) => `${item.startGameId}-${item.endGameId}`
			);
			const followCounts = exportData.map((item) => item.followCount);

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

			// Define follow streak chart
			const followChart: ChartDefinition = {
				id: 'followChart',
				title: 'Follow Streak Count Chart',
				type: 'bar',
				labels: seriesIds,
				datasets: [
					{
						label: 'Follow Streak Count',
						data: followCounts,
						backgroundColor: 'rgba(255, 159, 64, 0.7)',
						borderColor: 'rgba(255, 159, 64, 1)',
						borderWidth: 1,
					},
				],
				xAxisTitle: 'Series ID',
				yAxisTitle: 'Count',
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
						{
							parameter: 'Show Follow Games',
							value: currentConfig.showCircles ? 'Yes' : 'No',
						},
					],
				},
				charts: [lengthChart, followChart],
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
						{ header: 'Follow Count', key: 'followCount' },
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
		<Card className={cn('w-full', className)}>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<div>
					<CardTitle>Non-occurrence Series Analysis</CardTitle>
					<CardDescription>
						Series of games without crash point {value}x or higher
					</CardDescription>
				</div>
				{!isLoading && !error && data && (
					<div className="flex items-center bg-muted px-3 py-1 rounded-md">
						<span className="text-sm font-medium mr-1">
							Total {value}x occurrences:
						</span>
						<span className="text-sm font-bold">
							{totalOccurrences}
						</span>
					</div>
				)}
			</CardHeader>
			<CardContent>
				<SeriesControls
					value={value}
					inputValue={inputValue}
					analyzeBy={analyzeBy}
					limit={limit}
					limitInput={limitInput}
					hours={hours}
					hoursInput={hoursInput}
					sortBy={sortBy}
					isLoading={isLoading}
					showCircles={showCircles}
					onValueInputChange={handleValueInputChange}
					onLimitInputChange={handleLimitInputChange}
					onHoursInputChange={handleHoursInputChange}
					applyValueChange={applyValueChange}
					applyLimitChange={applyLimitChange}
					applyHoursChange={applyHoursChange}
					handleKeyDown={handleKeyDown}
					toggleSortMode={toggleSortMode}
					toggleCirclesVisibility={toggleCirclesVisibility}
					handleTabChange={handleTabChange}
					getExcelConfig={getExcelConfig}
					getChartConfig={getChartConfig}
					currentConfig={currentConfig}
				/>

				{isLoading && (
					<div className="space-y-3">
						<Skeleton className="h-[250px] w-full" />
						<div className="space-y-2">
							<Skeleton className="h-5 w-full" />
							<Skeleton className="h-5 w-[90%]" />
							<Skeleton className="h-5 w-[80%]" />
						</div>
					</div>
				)}

				{error && (
					<div className="text-center py-10">
						<p className="text-destructive">
							Error: Failed to load data
						</p>
					</div>
				)}

				{!isLoading && !error && chartData.length === 0 && (
					<div className="text-center py-10">
						<p className="text-muted-foreground">
							No series data found for the current criteria
						</p>
					</div>
				)}

				{!isLoading && !error && chartData.length > 0 && (
					<>
						<SeriesChart
							chartData={chartData}
							value={value}
							sortBy={sortBy}
							pulseClass={pulseClass}
							showCircles={showCircles}
							medianLength={medianLength}
						/>

						<SeriesTable
							topSeries={topSeries}
							value={value}
							sortBy={sortBy}
							showCircles={showCircles}
						/>
					</>
				)}
			</CardContent>
		</Card>
	);
}
