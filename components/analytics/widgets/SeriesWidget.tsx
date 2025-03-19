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
} from 'recharts';
import { ArrowDownWideNarrow, Clock } from 'lucide-react';

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
			refreshData(); // Refresh data when value changes
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
	};

	// Use real-time hook to fetch series data
	const { data, isLoading, error, refreshData } = useRealTimeSeriesAnalysis({
		value,
		analyzeBy,
		limit,
		hours,
		sortBy,
	});

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
		return data?.slice(0, 3) || [];
	}, [data]);

	return (
		<Card className={cn('w-full', className)}>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<div>
					<CardTitle>Non-occurrence Series Analysis</CardTitle>
					<CardDescription>
						Series of games without crash point {value}x or higher
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex justify-between items-center mb-4">
					<div className="flex items-center gap-3">
						<div className="flex items-center text-sm text-muted-foreground">
							<span className="mr-2">Value</span>
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
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<div className="flex items-center border border-border rounded-md h-8 px-2">
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
									</div>
								</TooltipTrigger>
								<TooltipContent>
									<p>
										Sort by:{' '}
										{sortBy === 'time' ? 'Time' : 'Length'}
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
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
														'HH:mm'
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
																Series #
																{item.id}
															</p>
															<p className="text-xs">
																Length:{' '}
																{item.length}{' '}
																games
															</p>
															<p className="text-xs">
																Games:{' '}
																{item.seriesId}
															</p>
															<p className="text-xs">
																Start:{' '}
																{format(
																	item.startTime,
																	'MMM d, yyyy HH:mm'
																)}
															</p>
															<p className="text-xs">
																End:{' '}
																{format(
																	item.endTime,
																	'MMM d, yyyy HH:mm'
																)}
															</p>
														</div>
													</div>
												);
											}}
										/>
										<Bar dataKey="length">
											{chartData.map((entry) => (
												<Cell
													key={`cell-${entry.seriesId}`}
													fill={`hsl(${
														220 -
														Math.min(
															entry.length * 2,
															160
														)
													}, 100%, 50%)`}
												/>
											))}
										</Bar>
									</BarChart>
								</ResponsiveContainer>
							</ChartContainer>
						</div>

						<div className="mt-6">
							<h4 className="text-sm font-medium mb-2">
								Longest series without {value}x or higher:
							</h4>
							<ul className="space-y-2">
								{topSeries.map((series) => (
									<li
										key={`series-${series.start_game_id}-${series.end_game_id}`}
										className="text-sm"
									>
										- {series.length} games (Game #
										{series.start_game_id} to #
										{series.end_game_id})
									</li>
								))}
							</ul>
						</div>
					</>
				)}
			</CardContent>
		</Card>
	);
}
