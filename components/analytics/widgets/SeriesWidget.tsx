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

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
	defaultValue = 2.0,
	className,
}: SeriesWidgetProps) {
	const [value, setValue] = React.useState<number>(defaultValue);
	const [inputValue, setInputValue] = React.useState<string>(
		defaultValue.toString()
	);
	const [sortBy, setSortBy] = React.useState<'time' | 'length'>('length');
	const [isTimeMode, setIsTimeMode] = React.useState<boolean>(false);
	const [limit, setLimit] = React.useState<number>(1000);
	const [hours, setHours] = React.useState<number>(24);

	// Use real-time hook to fetch series data
	const { data, isLoading, error, refreshData } = useRealTimeSeriesAnalysis({
		value,
		analyzeBy: isTimeMode ? 'time' : 'games',
		limit,
		hours,
		sortBy,
	});

	const handleValueChange = () => {
		const parsedValue = Number.parseFloat(inputValue);
		if (!Number.isNaN(parsedValue) && parsedValue > 0) {
			setValue(parsedValue);
			refreshData(); // Refresh data when value changes
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
				<div className="flex items-center space-x-2">
					<Input
						type="number"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						className="w-20"
						step="0.1"
						min="1"
					/>
					<Button
						variant="outline"
						onClick={handleValueChange}
					>
						Apply
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Tabs
					defaultValue="games"
					className="mt-2"
				>
					<div className="flex items-center justify-between mb-4">
						<TabsList>
							<TabsTrigger
								value="games"
								onClick={() => setIsTimeMode(false)}
							>
								Games
							</TabsTrigger>
							<TabsTrigger
								value="time"
								onClick={() => setIsTimeMode(true)}
							>
								Time
							</TabsTrigger>
						</TabsList>
						<Select
							value={sortBy}
							onValueChange={(value) =>
								setSortBy(value as 'time' | 'length')
							}
						>
							<SelectTrigger className="w-36">
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="length">
									Sort by length
								</SelectItem>
								<SelectItem value="time">
									Sort by time
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<TabsContent
						value="games"
						className="mt-0"
					>
						<div className="flex items-center mb-4">
							<span className="mr-2 text-sm">Last</span>
							<Select
								value={limit.toString()}
								onValueChange={(value) =>
									setLimit(Number.parseInt(value, 10))
								}
							>
								<SelectTrigger className="w-28">
									<SelectValue placeholder="Limit" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="100">
										100 games
									</SelectItem>
									<SelectItem value="500">
										500 games
									</SelectItem>
									<SelectItem value="1000">
										1000 games
									</SelectItem>
									<SelectItem value="5000">
										5000 games
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</TabsContent>

					<TabsContent
						value="time"
						className="mt-0"
					>
						<div className="flex items-center mb-4">
							<span className="mr-2 text-sm">Last</span>
							<Select
								value={hours.toString()}
								onValueChange={(value) =>
									setHours(Number.parseInt(value, 10))
								}
							>
								<SelectTrigger className="w-28">
									<SelectValue placeholder="Hours" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="1">1 hour</SelectItem>
									<SelectItem value="6">6 hours</SelectItem>
									<SelectItem value="12">12 hours</SelectItem>
									<SelectItem value="24">24 hours</SelectItem>
									<SelectItem value="48">48 hours</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</TabsContent>
				</Tabs>

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
						<div className="w-full min-h-[300px]">
							<ChartContainer config={chartConfig}>
								<ResponsiveContainer
									width="100%"
									height="100%"
								>
									<BarChart
										data={chartData}
										margin={{
											top: 20,
											right: 30,
											left: 20,
											bottom: 5,
										}}
									>
										<CartesianGrid
											strokeDasharray="3 3"
											vertical={false}
										/>
										<XAxis
											dataKey="id"
											tickLine={false}
											axisLine={false}
											tickMargin={8}
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
