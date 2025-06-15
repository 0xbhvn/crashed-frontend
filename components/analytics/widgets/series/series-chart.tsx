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
	crashPoint: number | null;
}

export interface SeriesChartProps {
	chartData: SeriesChartData[];
	value: number;
	sortBy: 'time' | 'length';
	pulseClass: string;
	categoryProbabilities?: Record<string, number>;
	isProbabilityLoading?: boolean;
	highlightedQuartileRange?: string | null;
}

export function SeriesChart({
	chartData,
	value,
	sortBy,
	pulseClass,
	categoryProbabilities = {},
	isProbabilityLoading = false,
	highlightedQuartileRange = null,
}: SeriesChartProps) {
	// State to track which category class is being hovered
	const [hoveredClass, setHoveredClass] = React.useState<string | null>(null);

	// Effect to sync highlightedQuartileRange prop with internal hoveredClass state
	React.useEffect(() => {
		setHoveredClass(highlightedQuartileRange);
	}, [highlightedQuartileRange]);

	// Debug logging
	console.log(
		'[SeriesChart] Props - isProbabilityLoading:',
		isProbabilityLoading,
		'categoryProbabilities:',
		categoryProbabilities
	);

	// Calculate probabilities - always calculate for theoretical probabilities
	const probabilities = React.useMemo(() => {
		const theoreticalProbabilities = calculateCategoryProbabilities(value);

		console.log(
			'[SeriesChart] Theoretical probabilities for crash point',
			value,
			':',
			theoreticalProbabilities
		);

		// If we have category probabilities passed as props, prefer those
		if (
			categoryProbabilities &&
			Object.keys(categoryProbabilities).length > 0
		) {
			console.log(
				'[SeriesChart] Using passed category probabilities:',
				categoryProbabilities
			);
			return categoryProbabilities;
		}

		// Otherwise use theoretical probabilities
		console.log('[SeriesChart] Using theoretical probabilities');
		return theoreticalProbabilities;
	}, [value, categoryProbabilities]);

	// Debug final state
	console.log(
		'[SeriesChart] Final state - probabilities:',
		probabilities,
		'isProbabilityLoading:',
		isProbabilityLoading,
		'categoryProbabilities keys:',
		Object.keys(categoryProbabilities).length
	);

	// Dynamic category thresholds for streak lengths
	const categoryThresholds = React.useMemo(() => {
		return calculatePercentileThresholds(value);
	}, [value]);

	// Class colors
	const c0Color = 'hsl(210, 90%, 50%)'; // Blue for <p25
	const c1Color = 'hsl(142, 90%, 40%)'; // Green for p25-p50
	const c2Color = 'hsl(48, 95%, 50%)'; // Yellow for p50-p75
	const c3Color = 'hsl(0, 90%, 45%)'; // Red for p75-p90
	const c4Color = 'hsl(270, 90%, 50%)'; // Purple for >p90

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
					{/* New Reference Lines for upper bounds */}
					<ReferenceLine
						y={categoryThresholds.p25}
						stroke={c0Color}
						strokeDasharray="3 3"
					/>
					<ReferenceLine
						y={categoryThresholds.p50}
						stroke={c1Color}
						strokeDasharray="3 3"
					/>
					<ReferenceLine
						y={categoryThresholds.p75}
						stroke={c2Color}
						strokeDasharray="3 3"
					/>
					<ReferenceLine
						y={categoryThresholds.p90}
						stroke={c3Color}
						strokeDasharray="3 3"
					/>{' '}
					{/* Upper bound for p75-p90 segment */}
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
										{item.crashPoint !== null && item.crashPoint !== undefined && (
											<div className="text-xs mt-2 border-t border-border/30 pt-1.5">
												<div className="rounded overflow-hidden border border-border/30">
													<table className="w-full">
														<tbody>
															<tr className="bg-muted/30">
																<td className="px-2 py-1 font-medium">
																	Crash Point
																</td>
																<td className="px-2 py-1 text-right font-medium">
																	{item.crashPoint.toFixed(2)}x
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										)}
									</div>
								</div>
							);
						}}
					/>
					<Bar dataKey="length">
						{chartData.map((entry, index) => {
							let colorClass = '';
							let entryQuartileGroup = '';

							if (entry.length <= categoryThresholds.p25) {
								// Handles entry.length >= 1 implicitly if min is 1
								colorClass = c0Color;
								entryQuartileGroup = '<p25';
							} else if (entry.length <= categoryThresholds.p50) {
								colorClass = c1Color;
								entryQuartileGroup = 'p25-p50';
							} else if (entry.length <= categoryThresholds.p75) {
								colorClass = c2Color;
								entryQuartileGroup = 'p50-p75';
							} else if (entry.length <= categoryThresholds.p90) {
								colorClass = c3Color;
								entryQuartileGroup = 'p75-p90'; // Group for bars between p75 and p90
							} else {
								// > p90
								colorClass = c4Color;
								entryQuartileGroup = '>p90';
							}

							const isLatestBar =
								sortBy === 'time' &&
								index === chartData.length - 1;
							let isHighlighted = false;

							if (hoveredClass) {
								if (hoveredClass === '>p75') {
									// When table row '>p75' is hovered, highlight chart segments 'p75-p90' and '>p90'
									isHighlighted =
										entryQuartileGroup === 'p75-p90' ||
										entryQuartileGroup === '>p90';
								} else if (hoveredClass === '>p90') {
									isHighlighted =
										entryQuartileGroup === '>p90';
								} else {
									isHighlighted =
										entryQuartileGroup === hoveredClass;
								}
							}

							let className = '';
							if (isLatestBar) className += pulseClass;
							if (isHighlighted)
								className += ' opacity-100 brightness-110';

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
		</div>
	);
}
