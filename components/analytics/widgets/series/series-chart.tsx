'use client';

import * as React from 'react';
import { format } from 'date-fns';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	XAxis,
	YAxis,
	ReferenceLine,
} from 'recharts';

import {
	ChartContainer,
	ChartTooltip,
	type ChartConfig,
} from '@/components/ui/chart';

// This is our chart configuration
export const chartConfig = {
	length: {
		label: 'Series Length',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

export interface SeriesChartData {
	id: number;
	seriesId: string;
	length: number;
	startTime: Date;
	endTime: Date;
	followCount: number;
	followGames?: string[];
}

export interface SeriesChartProps {
	chartData: SeriesChartData[];
	value: number;
	sortBy: 'time' | 'length';
	pulseClass: string;
	percentiles: {
		p25: number;
		p50: number;
		p75: number;
		p90: number;
		p95: number;
		p99: number;
	};
}

export function SeriesChart({
	chartData,
	value,
	sortBy,
	pulseClass,
	percentiles,
}: SeriesChartProps) {
	// State to track which percentile is being hovered
	const [hoveredPercentile, setHoveredPercentile] = React.useState<
		number | null
	>(null);

	// Get faded versions of colors for reference lines and text
	const getFadedColor = (ratio: number): string => {
		let hue: number;
		if (ratio < 1) {
			// Below crash value: Blue to Green (240-120)
			hue = 240 - ratio * 120;
		} else {
			// At or above crash value: Yellow to Red (60-0)
			hue = Math.max(60 - (ratio - 1) * 30, 0);
		}
		// Lower saturation and higher lightness for a faded look
		return `hsla(${hue}, 70%, 60%, 0.7)`;
	};

	// Faded colors for reference lines and text
	const p25FadedColor = getFadedColor(percentiles.p25 / value);
	const p50FadedColor = getFadedColor(percentiles.p50 / value);
	const p75FadedColor = getFadedColor(percentiles.p75 / value);
	const p90FadedColor = getFadedColor(percentiles.p90 / value);
	const p95FadedColor = getFadedColor(percentiles.p95 / value);
	const p99FadedColor = getFadedColor(percentiles.p99 / value);

	return (
		<div
			className="w-full"
			style={{ minHeight: '350px' }}
		>
			<ChartContainer config={chartConfig}>
				<BarChart
					width={974}
					height={350}
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
						dataKey={sortBy === 'time' ? 'startTime' : 'id'}
						tickLine={false}
						axisLine={false}
						tickMargin={8}
						tickFormatter={(value) => {
							if (sortBy === 'time' && value instanceof Date) {
								return format(value, 'h:mm a');
							}
							return sortBy === 'length' ? '' : value;
						}}
						label={
							sortBy === 'time'
								? {
										value: 'Time',
										position: 'insideBottom',
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

					{/* P25 Reference Line */}
					<ReferenceLine
						y={percentiles.p25}
						stroke={p25FadedColor}
						strokeDasharray="3 3"
					/>

					{/* P50 (Median) Reference Line */}
					<ReferenceLine
						y={percentiles.p50}
						stroke={p50FadedColor}
						strokeDasharray="3 3"
					/>

					{/* P75 Reference Line */}
					<ReferenceLine
						y={percentiles.p75}
						stroke={p75FadedColor}
						strokeDasharray="3 3"
					/>

					{/* P90 Reference Line */}
					<ReferenceLine
						y={percentiles.p90}
						stroke={p90FadedColor}
						strokeDasharray="3 3"
					/>

					{/* P95 Reference Line */}
					<ReferenceLine
						y={percentiles.p95}
						stroke={p95FadedColor}
						strokeDasharray="3 3"
					/>

					{/* P99 Reference Line */}
					<ReferenceLine
						y={percentiles.p99}
						stroke={p99FadedColor}
						strokeDasharray="3 3"
					/>

					<ChartTooltip
						content={(props) => {
							if (!props.active || !props.payload?.length)
								return null;
							const item = props.payload[0].payload;
							return (
								<div className="border-border/50 bg-background rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
									<div className="p-2 space-y-1">
										<p className="text-sm font-medium">
											{item.length === 1
												? '1 game'
												: `${item.length} games`}
										</p>
										<div className="rounded overflow-hidden border border-border/30 mt-2">
											<table className="w-full">
												<tbody>
													<tr className="bg-muted/30">
														<td className="px-2 py-1 font-medium">
															{item.length === 1
																? 'Game'
																: 'Start Game'}
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
													{item.length > 1 && (
														<tr>
															<td className="px-2 py-1 font-medium">
																End Game
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
													)}
													<tr className="bg-muted/30">
														<td className="px-2 py-1 font-medium">
															{item.length === 1
																? 'Time'
																: 'Start Time'}
														</td>
														<td className="px-2 py-1 text-right">
															{format(
																item.startTime,
																'MMM d, yyyy h:mm a'
															)}
														</td>
													</tr>
													{item.length > 1 && (
														<tr>
															<td className="px-2 py-1 font-medium">
																End Time
															</td>
															<td className="px-2 py-1 text-right">
																{format(
																	item.endTime,
																	'MMM d, yyyy h:mm a'
																)}
															</td>
														</tr>
													)}
												</tbody>
											</table>
										</div>
										{item.followCount > 0 && (
											<>
												{/* Show the actual games that followed */}
												{item.followGames &&
													item.followGames.length >
														0 && (
														<div className="text-xs mt-2 border-t border-border/30 pt-1.5">
															<div className="font-medium mb-1">
																Immediate{' '}
																{value}x crash:
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
							// Get color based on percentile thresholds
							let colorClass = '';

							// Below P25 - Blue
							if (entry.length < percentiles.p25) {
								colorClass = 'hsl(210, 90%, 50%)'; // Blue - matching blue-400/blue-800
							}
							// P25 to P50 - Green
							else if (entry.length < percentiles.p50) {
								colorClass = 'hsl(142, 90%, 40%)'; // Green - matching green-400/green-800
							}
							// P50 to P75 - Yellow
							else if (entry.length < percentiles.p75) {
								colorClass = 'hsl(48, 95%, 50%)'; // Yellow - matching yellow-400/yellow-800
							}
							// Above P75 - Red
							else {
								colorClass = 'hsl(0, 90%, 45%)'; // Red - matching red-400/red-800
							}

							// Check if this is the latest bar when sorted by time (last item)
							const isLatestBar =
								sortBy === 'time' &&
								index === chartData.length - 1;

							// Check if this bar should be highlighted based on percentile hovering
							// Highlight bars that are greater than or equal to the hovered percentile
							const isHighlighted =
								hoveredPercentile !== null &&
								entry.length >= hoveredPercentile;

							// Apply classes based on conditions
							let className = '';
							if (isLatestBar) className += pulseClass;
							if (isHighlighted)
								className += ' opacity-100 brightness-110';

							// Apply opacity to non-highlighted bars when a percentile is hovered
							const opacity =
								hoveredPercentile !== null
									? isHighlighted
										? 1
										: 0.3
									: 1;

							return (
								<Cell
									key={`cell-${entry.seriesId}`}
									fill={colorClass}
									className={className}
									style={{ opacity }}
								/>
							);
						})}
					</Bar>
				</BarChart>
			</ChartContainer>

			{/* Percentile legend */}
			<div className="flex flex-wrap justify-center gap-4 mt-4 px-2 text-sm">
				<div
					className="flex items-center cursor-pointer hover:bg-muted/30 px-2 py-1 rounded-md transition-colors"
					onMouseEnter={() => setHoveredPercentile(percentiles.p25)}
					onMouseLeave={() => setHoveredPercentile(null)}
				>
					<span
						className="inline-block w-4 h-0.5"
						style={{ backgroundColor: p25FadedColor }}
					/>
					<span className="ml-1.5">
						P25: {Math.round(percentiles.p25)}
					</span>
				</div>
				<div
					className="flex items-center cursor-pointer hover:bg-muted/30 px-2 py-1 rounded-md transition-colors"
					onMouseEnter={() => setHoveredPercentile(percentiles.p50)}
					onMouseLeave={() => setHoveredPercentile(null)}
				>
					<span
						className="inline-block w-4 h-0.5"
						style={{ backgroundColor: p50FadedColor }}
					/>
					<span className="ml-1.5">
						P50: {Math.round(percentiles.p50)}
					</span>
				</div>
				<div
					className="flex items-center cursor-pointer hover:bg-muted/30 px-2 py-1 rounded-md transition-colors"
					onMouseEnter={() => setHoveredPercentile(percentiles.p75)}
					onMouseLeave={() => setHoveredPercentile(null)}
				>
					<span
						className="inline-block w-4 h-0.5"
						style={{ backgroundColor: p75FadedColor }}
					/>
					<span className="ml-1.5">
						P75: {Math.round(percentiles.p75)}
					</span>
				</div>
				<div
					className="flex items-center cursor-pointer hover:bg-muted/30 px-2 py-1 rounded-md transition-colors"
					onMouseEnter={() => setHoveredPercentile(percentiles.p90)}
					onMouseLeave={() => setHoveredPercentile(null)}
				>
					<span
						className="inline-block w-4 h-0.5"
						style={{ backgroundColor: p90FadedColor }}
					/>
					<span className="ml-1.5">
						P90: {Math.round(percentiles.p90)}
					</span>
				</div>
				<div
					className="flex items-center cursor-pointer hover:bg-muted/30 px-2 py-1 rounded-md transition-colors"
					onMouseEnter={() => setHoveredPercentile(percentiles.p95)}
					onMouseLeave={() => setHoveredPercentile(null)}
				>
					<span
						className="inline-block w-4 h-0.5"
						style={{ backgroundColor: p95FadedColor }}
					/>
					<span className="ml-1.5">
						P95: {Math.round(percentiles.p95)}
					</span>
				</div>
				<div
					className="flex items-center cursor-pointer hover:bg-muted/30 px-2 py-1 rounded-md transition-colors"
					onMouseEnter={() => setHoveredPercentile(percentiles.p99)}
					onMouseLeave={() => setHoveredPercentile(null)}
				>
					<span
						className="inline-block w-4 h-0.5"
						style={{ backgroundColor: p99FadedColor }}
					/>
					<span className="ml-1.5">
						P99: {Math.round(percentiles.p99)}
					</span>
				</div>
			</div>
		</div>
	);
}
