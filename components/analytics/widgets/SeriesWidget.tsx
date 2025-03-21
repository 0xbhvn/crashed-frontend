'use client';

import * as React from 'react';
import { format } from 'date-fns';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	ResponsiveContainer,
	XAxis,
	YAxis,
	ReferenceLine,
	LabelList,
} from 'recharts';
import { ArrowDownWideNarrow, Clock, Eye, EyeOff } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useRealTimeSeriesAnalysis } from '@/hooks/analytics/useRealTimeSeriesAnalysis';
import { ExportButton } from '@/components/export-button';
import type { ExportConfig } from '@/utils/export-utils';
import type {
	ExcelExportConfig,
	ExcelColumnDefinition,
} from '@/utils/export-utils/excel';
import type {
	HtmlChartConfig,
	ChartDefinition,
} from '@/utils/export-utils/chart-html';

// CSS for pulsing effect
const pulseKeyframes = `
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.pulse-animation {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
`;

// This is our chart configuration
const chartConfig = {
	length: {
		label: 'Series Length',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

interface SeriesWidgetProps {
	defaultValue?: number;
	className?: string;
}

// Define proper payload interface
interface FollowStreakPayload {
	seriesId?: string;
	id?: number;
	[key: string]: unknown;
}

// Memoized circle component to prevent unnecessary re-renders
const FollowCircle = React.memo(
	({
		cx,
		cy,
		r,
		fill,
		keyValue,
	}: {
		cx: number;
		cy: number;
		r: number;
		fill: string;
		keyValue: string;
	}) => (
		<circle
			key={keyValue}
			cx={cx}
			cy={cy}
			r={r}
			fill={fill}
		/>
	),
	// Custom comparison function to only re-render when props actually change
	(prevProps, nextProps) => {
		return (
			prevProps.cx === nextProps.cx &&
			prevProps.cy === nextProps.cy &&
			prevProps.r === nextProps.r &&
			prevProps.fill === nextProps.fill &&
			prevProps.keyValue === nextProps.keyValue
		);
	}
);
FollowCircle.displayName = 'FollowCircle';

// Memoized follow streak label component with optimized circle generation
const FollowStreakLabel = React.memo(
	(props: Record<string, unknown>) => {
		const { x, y, value, width, index, payload, showCircles } = props as {
			x?: number | string;
			y?: number | string;
			value?: number | string;
			width?: number | string;
			index?: number;
			payload?: FollowStreakPayload;
			showCircles?: boolean;
		};

		// Create a stable reference for the component instance - MUST be before any conditional returns
		// This is the key optimization: only recreate circles if the data ID changes
		const stableRef = React.useRef<{
			lastDataId: string;
			circleElements: React.ReactNode[];
		}>({ lastDataId: '', circleElements: [] });

		// Return null if values aren't valid or circles should be hidden
		if (
			x === undefined ||
			y === undefined ||
			value === undefined ||
			value === null ||
			!showCircles
		) {
			return null;
		}

		// Convert to number and validate
		const numValue = Number(value);
		if (Number.isNaN(numValue) || numValue <= 0) {
			return null;
		}

		// Get bar width - ensure we have a stable width
		const barWidth = Number(width || 20);

		// Calculate circle properties
		// Make circles 40% of bar width
		const circleSize = barWidth * 0.4;

		// Center the circle horizontally
		const xCenter = barWidth / 2;

		// Display all circles - no limit
		const displayCount = Math.floor(numValue);

		// Get stable data identifier from payload
		const dataId = payload?.seriesId || `data-${index || 0}`;

		// Only regenerate circles if the dataId has changed or first render
		if (stableRef.current.lastDataId !== dataId) {
			stableRef.current.lastDataId = dataId;
			stableRef.current.circleElements = Array.from({
				length: displayCount,
			}).map((_, i) => {
				const yPos = -(i * (circleSize * 2 + 2)) - 5;
				const circleKey = `follow-circle-${dataId}-${i}`;

				return (
					<FollowCircle
						key={circleKey}
						keyValue={circleKey}
						cx={xCenter}
						cy={yPos}
						r={circleSize}
						fill="currentColor"
					/>
				);
			});
		}

		return (
			<g
				transform={`translate(${x}, ${Number(y) - circleSize})`}
				className="text-foreground"
			>
				{stableRef.current.circleElements}
			</g>
		);
	},
	// Very strict comparison function
	(prevProps, nextProps) => {
		const prev = prevProps as {
			x?: number | string;
			y?: number | string;
			value?: number | string;
			width?: number | string;
			payload?: FollowStreakPayload;
			showCircles?: boolean;
		};
		const next = nextProps as {
			x?: number | string;
			y?: number | string;
			value?: number | string;
			width?: number | string;
			payload?: FollowStreakPayload;
			showCircles?: boolean;
		};

		// If showCircles changed, we need to re-render
		if (prev.showCircles !== next.showCircles) {
			return false;
		}

		// Skip updates entirely for the same data point
		if (prev.payload?.seriesId === next.payload?.seriesId) {
			return true; // Prevent update
		}

		// If the position changed but not the content, allow the update
		return prev.value === next.value && prev.width === next.width;
	}
);
FollowStreakLabel.displayName = 'FollowStreakLabel';

// Define a proper interface for the game objects
interface GameObject {
	game_id: string;
	crash_point?: number;
	time?: string;
}

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

	// Update pulse animation class periodically
	React.useEffect(() => {
		if (sortBy !== 'time' || !chartData.length) return;

		// Set initial pulse
		setPulseClass('pulse-animation');

		return () => {
			setPulseClass('');
		};
	}, [sortBy, chartData]);

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

	// Function to handle tab change properly
	const handleTabChange = (value: string) => {
		const newAnalyzeBy = value as 'games' | 'time';
		if (newAnalyzeBy !== analyzeBy) {
			// Just update the tab state, actual data switch happens after loading
			setAnalyzeBy(newAnalyzeBy);
		}
	};

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
				<div className="flex justify-between items-center mb-4">
					<div className="flex items-center gap-3">
						<div className="flex items-center text-sm text-muted-foreground">
							<span className="mr-2">Crash Point</span>
							<div className="w-16">
								<Input
									type="number"
									value={inputValue}
									onChange={handleValueInputChange}
									onBlur={applyValueChange}
									onKeyDown={(e) =>
										handleKeyDown(e, applyValueChange)
									}
									min="1"
									step="0.1"
									aria-label="Crash point value"
									className="text-center h-7 px-2 py-1 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								/>
							</div>
						</div>

						{/* Combined controls box for sort by and follow circles */}
						<TooltipProvider>
							<div className="flex items-center border border-border rounded-md h-8 px-2 gap-2">
								{/* Sort by toggle */}
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											variant="ghost"
											size="icon"
											onClick={toggleSortMode}
											className="h-6 w-6 p-0"
										>
											{sortBy === 'time' ? (
												<Clock className="h-4 w-4 text-muted-foreground" />
											) : (
												<ArrowDownWideNarrow className="h-4 w-4 text-muted-foreground" />
											)}
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>
											Sort By:{' '}
											{sortBy === 'time'
												? 'Time'
												: 'Length'}
										</p>
									</TooltipContent>
								</Tooltip>

								{/* Follow circles toggle */}
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											variant="ghost"
											size="icon"
											onClick={toggleCirclesVisibility}
											className="h-6 w-6 p-0"
										>
											{showCircles ? (
												<Eye className="h-4 w-4 text-muted-foreground" />
											) : (
												<EyeOff className="h-4 w-4 text-muted-foreground" />
											)}
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>
											Follow Circles:{' '}
											{showCircles ? 'ON' : 'OFF'}
										</p>
									</TooltipContent>
								</Tooltip>
							</div>
						</TooltipProvider>

						{/* Excel Export Button using the new generic component */}
						<ExportButton
							getExcelConfig={getExcelConfig}
							getChartConfig={getChartConfig}
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
							onValueChange={handleTabChange}
						>
							<TabsList className="grid w-[240px] grid-cols-2 bg-muted/50 p-0.5">
								<TabsTrigger
									value="games"
									className="data-[state=active]:bg-black data-[state=active]:text-white"
									disabled={isLoading && analyzeBy === 'time'}
								>
									Games
								</TabsTrigger>
								<TabsTrigger
									value="time"
									className="data-[state=active]:bg-black data-[state=active]:text-white"
									disabled={
										isLoading && analyzeBy === 'games'
									}
								>
									Hours
								</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>
				</div>

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
						<div
							className="w-full"
							style={{ minHeight: '350px' }}
						>
							<ChartContainer config={chartConfig}>
								<ResponsiveContainer
									width="100%"
									height={350}
								>
									<BarChart
										data={chartData}
										margin={{
											top: 20,
											right: 30,
											left: 20,
											bottom: 20,
										}}
									>
										<CartesianGrid
											strokeDasharray="3 3"
											vertical={false}
										/>
										<XAxis
											dataKey={
												sortBy === 'time'
													? 'startTime'
													: 'id'
											}
											tickLine={false}
											axisLine={false}
											tickMargin={8}
											tickFormatter={(value) => {
												if (
													sortBy === 'time' &&
													value instanceof Date
												) {
													return format(
														value,
														'h:mm a'
													);
												}
												return sortBy === 'length'
													? ''
													: value;
											}}
											label={
												sortBy === 'time'
													? {
															value: 'Time',
															position:
																'insideBottom',
															offset: -10,
													  }
													: undefined
											}
										/>
										<YAxis
											tickLine={false}
											axisLine={false}
											tickMargin={8}
											domain={[0, 'auto']}
											label={{
												value: 'Length',
												angle: -90,
												position: 'insideLeft',
											}}
										/>
										<ReferenceLine
											y={medianLength}
											stroke="#888"
											strokeDasharray="3 3"
											label={{
												value: `Median: ${Math.round(
													medianLength
												)}`,
												position: 'insideTopRight',
												fill: '#888',
												fontSize: 12,
											}}
										/>
										<ChartTooltip
											content={(props) => {
												if (
													!props.active ||
													!props.payload?.length
												)
													return null;
												const item =
													props.payload[0].payload;
												return (
													<div className="border-border/50 bg-background rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
														<div className="p-2 space-y-1">
															<p className="text-sm font-medium">
																{item.length}{' '}
																games
															</p>
															<div className="rounded overflow-hidden border border-border/30 mt-2">
																<table className="w-full">
																	<tbody>
																		<tr className="bg-muted/30">
																			<td className="px-2 py-1 font-medium">
																				Start
																				Game
																			</td>
																			<td className="px-2 py-1 text-right">
																				#
																				{
																					item.seriesId.split(
																						'-'
																					)[0]
																				}
																			</td>
																		</tr>
																		<tr>
																			<td className="px-2 py-1 font-medium">
																				End
																				Game
																			</td>
																			<td className="px-2 py-1 text-right">
																				#
																				{
																					item.seriesId.split(
																						'-'
																					)[1]
																				}
																			</td>
																		</tr>
																		<tr className="bg-muted/30">
																			<td className="px-2 py-1 font-medium">
																				Start
																				Time
																			</td>
																			<td className="px-2 py-1 text-right">
																				{format(
																					item.startTime,
																					'MMM d, yyyy h:mm a'
																				)}
																			</td>
																		</tr>
																		<tr>
																			<td className="px-2 py-1 font-medium">
																				End
																				Time
																			</td>
																			<td className="px-2 py-1 text-right">
																				{format(
																					item.endTime,
																					'MMM d, yyyy h:mm a'
																				)}
																			</td>
																		</tr>
																	</tbody>
																</table>
															</div>
															{item.followCount >
																0 && (
																<>
																	<p className="text-xs mt-1">
																		Followed
																		by:{' '}
																		<span className="font-medium">
																			{
																				item.followCount
																			}
																		</span>{' '}
																		{item.followCount ===
																		1
																			? 'game'
																			: 'games'}{' '}
																		above{' '}
																		{value}x
																	</p>
																	{/* Show the actual games that followed only if circles are visible */}
																	{showCircles &&
																		item.followGames &&
																		item
																			.followGames
																			.length >
																			0 && (
																			<div className="text-xs mt-2 border-t border-border/30 pt-1.5">
																				<div className="font-medium mb-1">
																					Games
																					that
																					followed{' '}
																					{
																						value
																					}
																					x:
																				</div>
																				<div className="rounded overflow-hidden border border-border/30">
																					<table className="w-full">
																						<tbody>
																							{item.followGames.map(
																								(
																									game: string,
																									i: number
																								) => {
																									// Extract game ID and crash point from the string format "#GAMEID@CRASHPOINTx"
																									const parts =
																										game.split(
																											'@'
																										);
																									const gameId =
																										parts[0];
																									const crashPoint =
																										parts.length >
																										1
																											? parts[1]
																											: '';

																									return (
																										<tr
																											key={`tooltip-game-${item.seriesId}-${i}`}
																											className={
																												i %
																													2 ===
																												0
																													? 'bg-muted/30'
																													: ''
																											}
																										>
																											<td className="px-2 py-1">
																												{
																													gameId
																												}
																											</td>
																											<td className="px-2 py-1 text-right font-medium">
																												{
																													crashPoint
																												}
																											</td>
																										</tr>
																									);
																								}
																							)}
																						</tbody>
																					</table>
																				</div>
																			</div>
																		)}
																</>
															)}
														</div>
													</div>
												);
											}}
										/>
										<Bar dataKey="length">
											{chartData.map((entry, index) => {
												// Calculate ratio relative to the value
												const ratio =
													entry.length / value;

												// Map to different color spectrums based on ratio
												let hue: number;

												if (ratio < 1) {
													// Below crash value: Blue to Green (240-120)
													// At ratio=0: Blue (240)
													// At ratio=1: Green (120)
													hue = 240 - ratio * 120;
												} else {
													// At or above crash value: Yellow to Red (60-0)
													// At ratio=1: Yellow (60)
													// At ratio=3 or higher: Red (0)
													hue = Math.max(
														60 - (ratio - 1) * 30,
														0
													);
												}

												// Check if this is the latest bar when sorted by time (last item)
												const isLatestBar =
													sortBy === 'time' &&
													index ===
														chartData.length - 1;

												// Apply class for the latest bar if sorting by time
												const className = isLatestBar
													? pulseClass
													: '';

												return (
													<Cell
														key={`cell-${entry.seriesId}`}
														fill={`hsl(${hue}, 90%, 50%)`}
														className={className}
													/>
												);
											})}
											{/* Conditionally render label list based on showCircles state */}
											{showCircles && (
												<LabelList
													dataKey="followCount"
													position="top"
													offset={10}
													content={(props) => (
														<FollowStreakLabel
															{...props}
															showCircles={
																showCircles
															}
														/>
													)}
												/>
											)}
										</Bar>
									</BarChart>
								</ResponsiveContainer>
							</ChartContainer>
						</div>

						<div className="mt-6">
							<h4 className="text-sm font-medium mb-2">
								{sortBy === 'length'
									? `Longest series without ${value}x or higher:`
									: `Most recent series without ${value}x or higher:`}
							</h4>
							<div className="overflow-x-auto">
								<table className="w-full text-sm">
									<thead>
										<tr className="border-b">
											<th className="text-left font-medium pb-2">
												Length
											</th>
											<th className="text-left font-medium pb-2">
												Start Game
											</th>
											<th className="text-left font-medium pb-2">
												End Game
											</th>
											<th className="text-left font-medium pb-2">
												Start Time
											</th>
											<th className="text-left font-medium pb-2">
												End Time
											</th>
											<th className="text-left font-medium pb-2">
												Follow Streak
											</th>
										</tr>
									</thead>
									<tbody>
										{topSeries.map((series) => (
											<tr
												key={`series-${series.start_game_id}-${series.end_game_id}`}
												className="border-b border-border/30 hover:bg-muted/30"
											>
												<td className="py-2">
													{series.length} games
												</td>
												<td className="py-2">
													#{series.start_game_id}
												</td>
												<td className="py-2">
													#{series.end_game_id}
												</td>
												<td className="py-2">
													{format(
														new Date(
															series.start_time
														),
														'MMM d, yyyy h:mm a'
													)}
												</td>
												<td className="py-2">
													{format(
														new Date(
															series.end_time
														),
														'MMM d, yyyy h:mm a'
													)}
												</td>
												<td className="py-2">
													{series.follow_streak
														?.count ? (
														<TooltipProvider>
															<Tooltip>
																<TooltipTrigger
																	asChild
																>
																	<div className="font-medium">
																		{
																			series
																				.follow_streak
																				.count
																		}
																	</div>
																</TooltipTrigger>
																<TooltipContent>
																	<p className="text-xs">
																		<span className="font-medium">
																			{
																				series
																					.follow_streak
																					.count
																			}
																		</span>{' '}
																		{series
																			.follow_streak
																			.count ===
																		1
																			? 'game'
																			: 'games'}{' '}
																		followed
																	</p>
																	{/* Only show games list if circles are visible */}
																	{showCircles &&
																		series
																			.follow_streak
																			.games &&
																		series
																			.follow_streak
																			.games
																			.length >
																			0 && (
																			<div className="text-xs mt-2 border-t border-border/30 pt-1.5">
																				<div className="font-medium mb-1">
																					Games
																					that
																					followed{' '}
																					{
																						value
																					}
																					x:
																				</div>
																				<div className="rounded overflow-hidden border border-border/30">
																					<table className="w-full">
																						<tbody>
																							{series.follow_streak.games.map(
																								(
																									game:
																										| string
																										| GameObject,
																									i: number
																								) => {
																									// Format the game information
																									let gameId: string;
																									let crashPoint: string;

																									if (
																										typeof game ===
																											'object' &&
																										game !==
																											null
																									) {
																										gameId = `#${
																											game.game_id ||
																											'unknown'
																										}`;
																										crashPoint = `${
																											game.crash_point?.toFixed(
																												2
																											) ||
																											'?.??'
																										}x`;
																									} else {
																										// Handle string format which should be "#GAMEID@CRASHPOINTx"
																										const parts =
																											String(
																												game
																											).split(
																												'@'
																											);
																										gameId =
																											parts[0];
																										crashPoint =
																											parts.length >
																											1
																												? parts[1]
																												: '';
																									}

																									return (
																										<tr
																											key={
																												typeof game ===
																													'object' &&
																												game?.game_id
																													? `table-game-${game.game_id}`
																													: `table-game-${series.end_game_id}-${i}`
																											}
																											className={
																												i %
																													2 ===
																												0
																													? 'bg-muted/30'
																													: ''
																											}
																										>
																											<td className="px-2 py-1">
																												{
																													gameId
																												}
																											</td>
																											<td className="px-2 py-1 text-right font-medium">
																												{
																													crashPoint
																												}
																											</td>
																										</tr>
																									);
																								}
																							)}
																						</tbody>
																					</table>
																				</div>
																			</div>
																		)}
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													) : (
														<span className="text-muted-foreground">
															None
														</span>
													)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</>
				)}
			</CardContent>
		</Card>
	);
}
