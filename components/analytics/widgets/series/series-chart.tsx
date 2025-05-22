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
import {
	getDynamicCrashCategories,
	calculateCategoryProbabilities,
	calculatePercentileThresholds,
} from '@/utils/crash-probability';

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
	gamesSince?: number;
	categoryProbabilities?: Record<string, number>;
	isProbabilityLoading?: boolean;
}

export function SeriesChart({
	chartData,
	value,
	sortBy,
	pulseClass,
	gamesSince = 0,
	categoryProbabilities = {},
	isProbabilityLoading = false,
}: SeriesChartProps) {
	// State to track which category class is being hovered
	const [hoveredClass, setHoveredClass] = React.useState<string | null>(null);

	// Calculate probabilities if gamesSince is available
	const probabilities = React.useMemo(() => {
		if (gamesSince > 0) {
			return calculateCategoryProbabilities(value, gamesSince);
		}
		return categoryProbabilities;
	}, [value, gamesSince, categoryProbabilities]);

	// Dynamic category ranges based on crash point
	const dynamicCategories = React.useMemo(() => {
		return getDynamicCrashCategories(value);
	}, [value]);

	// Dynamic category thresholds for streak lengths
	const categoryThresholds = React.useMemo(() => {
		return calculatePercentileThresholds(value);
	}, [value]);

	// Get faded versions of colors for reference lines
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

	// Faded colors for reference lines
	const p25FadedColor = getFadedColor(categoryThresholds.p25 / value);
	const p50FadedColor = getFadedColor(categoryThresholds.p50 / value);
	const p75FadedColor = getFadedColor(categoryThresholds.p75 / value);

	// Class colors
	const c0Color = 'hsl(210, 90%, 50%)'; // Blue - matching blue-400/blue-800
	const c1Color = 'hsl(142, 90%, 40%)'; // Green - matching green-400/green-800
	const c2Color = 'hsl(48, 95%, 50%)'; // Yellow - matching yellow-400/yellow-800
	const c3Color = 'hsl(0, 90%, 45%)'; // Red - matching red-400/red-800

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

					{/* Dynamic Reference Lines for streak length boundaries */}
					<ReferenceLine
						y={categoryThresholds.p25 + 0.5}
						stroke={p25FadedColor}
						strokeDasharray="3 3"
					/>
					<ReferenceLine
						y={categoryThresholds.p50 + 0.5}
						stroke={p50FadedColor}
						strokeDasharray="3 3"
					/>
					<ReferenceLine
						y={categoryThresholds.p75 + 0.5}
						stroke={p75FadedColor}
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
							// Determine which streak length category this entry belongs to
							let colorClass = '';
							let entryClass = '';

							// p25: streaks 1 to p25 threshold - Blue
							if (
								entry.length >= 1 &&
								entry.length <= categoryThresholds.p25
							) {
								colorClass = c0Color;
								entryClass = 'p25';
							}
							// p25-p50: streaks p25+1 to p50 threshold - Green
							else if (
								entry.length >= categoryThresholds.p25 + 1 &&
								entry.length <= categoryThresholds.p50
							) {
								colorClass = c1Color;
								entryClass = 'p25-p50';
							}
							// p50-p75: streaks p50+1 to p75 threshold - Yellow
							else if (
								entry.length >= categoryThresholds.p50 + 1 &&
								entry.length <= categoryThresholds.p75
							) {
								colorClass = c2Color;
								entryClass = 'p50-p75';
							}
							// >p75: streaks > p75 threshold - Red
							else {
								colorClass = c3Color;
								entryClass = '>p75';
							}

							// Check if this is the latest bar when sorted by time (last item)
							const isLatestBar =
								sortBy === 'time' &&
								index === chartData.length - 1;

							// Check if this bar should be highlighted based on class hovering
							// Only highlight bars in the exact class that is being hovered
							const isHighlighted =
								hoveredClass !== null &&
								entryClass === hoveredClass;

							// Apply classes based on conditions
							let className = '';
							if (isLatestBar) className += pulseClass;
							if (isHighlighted)
								className += ' opacity-100 brightness-110';

							// Apply opacity to non-highlighted bars when a class is hovered
							const opacity =
								hoveredClass !== null
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

			{/* Static category legend with probabilities */}
			<div className="flex flex-wrap justify-center gap-4 mt-4 px-2 text-sm">
				<div
					className="flex items-center cursor-pointer hover:bg-muted/30 px-2 py-1 rounded-md transition-colors"
					onMouseEnter={() => setHoveredClass('p25')}
					onMouseLeave={() => setHoveredClass(null)}
				>
					<span
						className="inline-block w-4 h-4 rounded-sm"
						style={{ backgroundColor: c0Color }}
					/>
					<span className="ml-1.5">
						p25: {dynamicCategories.p25.display}
						{isProbabilityLoading ? (
							<span className="ml-1 text-xs font-medium text-muted-foreground">
								(loading...)
							</span>
						) : probabilities.p25 ? (
							<span className="ml-1 text-xs font-medium text-muted-foreground">
								({probabilities.p25.toFixed(2)}%)
							</span>
						) : null}
					</span>
				</div>
				<div
					className="flex items-center cursor-pointer hover:bg-muted/30 px-2 py-1 rounded-md transition-colors"
					onMouseEnter={() => setHoveredClass('p25-p50')}
					onMouseLeave={() => setHoveredClass(null)}
				>
					<span
						className="inline-block w-4 h-4 rounded-sm"
						style={{ backgroundColor: c1Color }}
					/>
					<span className="ml-1.5">
						p25-p50: {dynamicCategories['p25-p50'].display}
						{isProbabilityLoading ? (
							<span className="ml-1 text-xs font-medium text-muted-foreground">
								(loading...)
							</span>
						) : probabilities['p25-p50'] ? (
							<span className="ml-1 text-xs font-medium text-muted-foreground">
								({probabilities['p25-p50'].toFixed(2)}%)
							</span>
						) : null}
					</span>
				</div>
				<div
					className="flex items-center cursor-pointer hover:bg-muted/30 px-2 py-1 rounded-md transition-colors"
					onMouseEnter={() => setHoveredClass('p50-p75')}
					onMouseLeave={() => setHoveredClass(null)}
				>
					<span
						className="inline-block w-4 h-4 rounded-sm"
						style={{ backgroundColor: c2Color }}
					/>
					<span className="ml-1.5">
						p50-p75: {dynamicCategories['p50-p75'].display}
						{isProbabilityLoading ? (
							<span className="ml-1 text-xs font-medium text-muted-foreground">
								(loading...)
							</span>
						) : probabilities['p50-p75'] ? (
							<span className="ml-1 text-xs font-medium text-muted-foreground">
								({probabilities['p50-p75'].toFixed(2)}%)
							</span>
						) : null}
					</span>
				</div>
				<div
					className="flex items-center cursor-pointer hover:bg-muted/30 px-2 py-1 rounded-md transition-colors"
					onMouseEnter={() => setHoveredClass('>p75')}
					onMouseLeave={() => setHoveredClass(null)}
				>
					<span
						className="inline-block w-4 h-4 rounded-sm"
						style={{ backgroundColor: c3Color }}
					/>
					<span className="ml-1.5">
						&gt;p75: {dynamicCategories['>p75'].display}
						{isProbabilityLoading ? (
							<span className="ml-1 text-xs font-medium text-muted-foreground">
								(loading...)
							</span>
						) : probabilities['>p75'] ? (
							<span className="ml-1 text-xs font-medium text-muted-foreground">
								({probabilities['>p75'].toFixed(2)}%)
							</span>
						) : null}
					</span>
				</div>
			</div>
		</div>
	);
}
