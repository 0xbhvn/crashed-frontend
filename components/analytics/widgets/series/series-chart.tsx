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

interface SeriesChartProps {
	chartData: SeriesChartData[];
	value: number;
	sortBy: 'time' | 'length';
	pulseClass: string;
	medianLength: number;
}

export function SeriesChart({
	chartData,
	value,
	sortBy,
	pulseClass,
	medianLength,
}: SeriesChartProps) {
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
					<ReferenceLine
						y={medianLength}
						stroke="#888"
						strokeDasharray="3 3"
						label={{
							value: `Median: ${Math.round(medianLength)}`,
							position: 'insideTopRight',
							fill: '#888',
							fontSize: 12,
						}}
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
											{item.length} games
										</p>
										<div className="rounded overflow-hidden border border-border/30 mt-2">
											<table className="w-full">
												<tbody>
													<tr className="bg-muted/30">
														<td className="px-2 py-1 font-medium">
															Start Game
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
													<tr className="bg-muted/30">
														<td className="px-2 py-1 font-medium">
															Start Time
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
															End Time
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
							// Calculate ratio relative to the value
							const ratio = entry.length / value;

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
								hue = Math.max(60 - (ratio - 1) * 30, 0);
							}

							// Check if this is the latest bar when sorted by time (last item)
							const isLatestBar =
								sortBy === 'time' &&
								index === chartData.length - 1;

							// Apply class for the latest bar if sorting by time
							const className = isLatestBar ? pulseClass : '';

							return (
								<Cell
									key={`cell-${entry.seriesId}`}
									fill={`hsl(${hue}, 90%, 50%)`}
									className={className}
								/>
							);
						})}
					</Bar>
				</BarChart>
			</ChartContainer>
		</div>
	);
}
