'use client';

import * as React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	AlertCircle,
	RefreshCw,
	Activity,
	TrendingUp,
	TrendingDown,
	Brain,
} from 'lucide-react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Cell,
	PieChart,
	Pie,
} from 'recharts';
import { useRealTimePatternAnalysis } from '@/hooks/analytics/statistical-models';
import type { BaseWidgetProps } from '@/utils/export-utils/types';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export function PatternAnalysisWidget({ className }: BaseWidgetProps) {
	const [limit, setLimit] = React.useState<number>(1000);
	const [limitInput, setLimitInput] = React.useState<string>('1000');
	const [anomalyThreshold, setAnomalyThreshold] = React.useState<number>(3.0);
	const [thresholdInput, setThresholdInput] = React.useState<string>('3.0');

	const { data, isLoading, error, refreshData } = useRealTimePatternAnalysis({
		limit,
		anomalyThreshold,
		enabled: true,
	});

	const handleLimitChange = () => {
		const newLimit = parseInt(limitInput);
		if (!isNaN(newLimit) && newLimit > 0) {
			setLimit(newLimit);
		}
	};

	const handleThresholdChange = () => {
		const newThreshold = parseFloat(thresholdInput);
		if (!isNaN(newThreshold) && newThreshold > 0) {
			setAnomalyThreshold(newThreshold);
		}
	};

	const getRandomnessColor = (score: number) => {
		if (score > 80) return 'text-green-500';
		if (score > 60) return 'text-yellow-500';
		if (score > 40) return 'text-orange-500';
		return 'text-red-500';
	};

	const getAnomalyColor = (zScore: number) => {
		const absScore = Math.abs(zScore);
		if (absScore > 4) return 'text-red-500';
		if (absScore > 3) return 'text-orange-500';
		return 'text-yellow-500';
	};

	const formatClusterData = () => {
		if (!data?.clustering) return [];
		return Object.entries(data.clustering).map(([name, info]) => ({
			name: name.charAt(0).toUpperCase() + name.slice(1),
			value: info.percentage,
			count: info.count,
			range: info.range,
		}));
	};

	const formatAutocorrelationData = () => {
		if (!data?.autocorrelation?.correlations) return [];
		return Object.entries(data.autocorrelation.correlations).map(
			([lag, corr]) => ({
				lag: parseInt(lag),
				correlation: corr,
				significant: data.autocorrelation.significant_lags.includes(
					parseInt(lag)
				),
			})
		);
	};

	return (
		<div className={className}>
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Brain className="h-5 w-5" />
						Pattern Recognition & Anomaly Detection
					</CardTitle>
					<CardDescription>
						Advanced pattern analysis using entropy,
						autocorrelation, anomaly detection, and clustering
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Controls */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="space-y-2">
							<Label htmlFor="limit">Games to Analyze</Label>
							<div className="flex gap-2">
								<Input
									id="limit"
									value={limitInput}
									onChange={(e) =>
										setLimitInput(e.target.value)
									}
									placeholder="1000"
									className="flex-1"
								/>
								<Button
									onClick={handleLimitChange}
									variant="outline"
									size="sm"
								>
									Apply
								</Button>
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="threshold">
								Anomaly Threshold (Z-score)
							</Label>
							<div className="flex gap-2">
								<Input
									id="threshold"
									value={thresholdInput}
									onChange={(e) =>
										setThresholdInput(e.target.value)
									}
									placeholder="3.0"
									className="flex-1"
								/>
								<Button
									onClick={handleThresholdChange}
									variant="outline"
									size="sm"
								>
									Apply
								</Button>
							</div>
						</div>
						<div className="flex items-end">
							<Button
								onClick={refreshData}
								disabled={isLoading}
								className="w-full"
							>
								{isLoading ? (
									<RefreshCw className="h-4 w-4 animate-spin mr-2" />
								) : (
									<RefreshCw className="h-4 w-4 mr-2" />
								)}
								Refresh
							</Button>
						</div>
					</div>

					{error && (
						<Alert variant="destructive">
							<AlertCircle className="h-4 w-4" />
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					{data && (
						<div className="space-y-6">
							{/* Summary Cards */}
							<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
								<Card>
									<CardHeader className="pb-3">
										<CardTitle className="text-sm font-medium">
											Randomness Score
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">
											<span
												className={getRandomnessColor(
													data.summary
														.randomness_score
												)}
											>
												{data.summary.randomness_score.toFixed(
													2
												)}
												%
											</span>
										</div>
										<p className="text-xs text-muted-foreground mt-1">
											{
												data.randomness_metrics
													.interpretation
											}
										</p>
									</CardContent>
								</Card>

								<Card>
									<CardHeader className="pb-3">
										<CardTitle className="text-sm font-medium">
											Anomalies Detected
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">
											{data.summary.total_anomalies}
										</div>
										<p className="text-xs text-muted-foreground mt-1">
											{data.summary.anomaly_rate.toFixed(
												2
											)}
											% of games
										</p>
									</CardContent>
								</Card>

								<Card>
									<CardHeader className="pb-3">
										<CardTitle className="text-sm font-medium">
											Dominant Pattern
										</CardTitle>
									</CardHeader>
									<CardContent>
										<Badge
											variant="outline"
											className="text-xs"
										>
											{data.summary.dominant_pattern}
										</Badge>
										<p className="text-xs text-muted-foreground mt-1">
											{data.patterns.trend.direction}{' '}
											trend
										</p>
									</CardContent>
								</Card>

								<Card>
									<CardHeader className="pb-3">
										<CardTitle className="text-sm font-medium">
											Entropy
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">
											{data.randomness_metrics.entropy.toFixed(
												2
											)}
										</div>
										<p className="text-xs text-muted-foreground mt-1">
											Ratio:{' '}
											{(
												data.randomness_metrics
													.entropy_ratio * 100
											).toFixed(2)}
											%
										</p>
									</CardContent>
								</Card>
							</div>

							{/* Detailed Analysis Tabs */}
							<Tabs
								defaultValue="clustering"
								className="w-full"
							>
								<TabsList className="grid w-full grid-cols-4">
									<TabsTrigger value="clustering">
										Clustering
									</TabsTrigger>
									<TabsTrigger value="anomalies">
										Anomalies
									</TabsTrigger>
									<TabsTrigger value="autocorrelation">
										Autocorrelation
									</TabsTrigger>
									<TabsTrigger value="patterns">
										Patterns
									</TabsTrigger>
								</TabsList>

								<TabsContent
									value="clustering"
									className="mt-6"
								>
									<Card>
										<CardHeader>
											<CardTitle className="text-lg">
												Crash Point Distribution
											</CardTitle>
											<CardDescription>
												Distribution of crash points
												across different categories
											</CardDescription>
										</CardHeader>
										<CardContent>
											<div className="h-64 w-full">
												<ResponsiveContainer
													width="100%"
													height="100%"
												>
													<PieChart>
														<Pie
															data={formatClusterData()}
															cx="50%"
															cy="50%"
															labelLine={false}
															label={({
																name,
																value,
															}) =>
																`${name}: ${value.toFixed(
																	1
																)}%`
															}
															outerRadius={80}
															fill="#8884d8"
															dataKey="value"
														>
															{formatClusterData().map(
																(
																	entry,
																	index
																) => (
																	<Cell
																		key={`cell-${index}`}
																		fill={
																			COLORS[
																				index %
																					COLORS.length
																			]
																		}
																	/>
																)
															)}
														</Pie>
														<Tooltip />
													</PieChart>
												</ResponsiveContainer>
											</div>
											<div className="mt-4 space-y-2">
												{Object.entries(
													data.clustering
												).map(([name, info]) => (
													<div
														key={name}
														className="flex items-center justify-between p-2 bg-muted rounded"
													>
														<div className="flex items-center gap-2">
															<div
																className="w-3 h-3 rounded"
																style={{
																	backgroundColor:
																		COLORS[
																			Object.keys(
																				data.clustering
																			).indexOf(
																				name
																			) %
																				COLORS.length
																		],
																}}
															/>
															<span className="font-medium capitalize">
																{name}
															</span>
															<Badge
																variant="outline"
																className="text-xs"
															>
																{info.range}
															</Badge>
														</div>
														<div className="text-right">
															<p className="font-semibold">
																{info.count}{' '}
																games
															</p>
															<p className="text-xs text-muted-foreground">
																{info.percentage.toFixed(
																	2
																)}
																%
															</p>
														</div>
													</div>
												))}
											</div>
										</CardContent>
									</Card>
								</TabsContent>

								<TabsContent
									value="anomalies"
									className="mt-6"
								>
									<Card>
										<CardHeader>
											<CardTitle className="text-lg">
												Anomalous Games
											</CardTitle>
											<CardDescription>
												Games with crash points that
												deviate significantly from the
												norm (Z-score &gt;{' '}
												{anomalyThreshold})
											</CardDescription>
										</CardHeader>
										<CardContent>
											<div className="space-y-4">
												<div className="grid grid-cols-2 gap-4">
													<div>
														<Label className="text-xs text-muted-foreground">
															IQR Bounds
														</Label>
														<p className="font-semibold">
															{data.anomalies.iqr_bounds.lower.toFixed(
																2
															)}
															x -{' '}
															{data.anomalies.iqr_bounds.upper.toFixed(
																2
															)}
															x
														</p>
													</div>
													<div>
														<Label className="text-xs text-muted-foreground">
															IQR Anomalies
														</Label>
														<p className="font-semibold">
															{
																data.anomalies
																	.iqr_anomaly_count
															}{' '}
															games
														</p>
													</div>
												</div>

												{data.anomalies.anomalous_games
													.length > 0 ? (
													<div className="border rounded-md max-h-96 overflow-y-auto">
														<Table>
															<TableHeader>
																<TableRow>
																	<TableHead>
																		Game ID
																	</TableHead>
																	<TableHead>
																		Crash
																		Point
																	</TableHead>
																	<TableHead>
																		Z-Score
																	</TableHead>
																	<TableHead>
																		Time
																	</TableHead>
																</TableRow>
															</TableHeader>
															<TableBody>
																{data.anomalies.anomalous_games.map(
																	(game) => (
																		<TableRow
																			key={
																				game.game_id
																			}
																		>
																			<TableCell className="font-mono text-sm">
																				{
																					game.game_id
																				}
																			</TableCell>
																			<TableCell>
																				<Badge
																					variant={
																						game.crash_point >
																						10
																							? 'default'
																							: 'destructive'
																					}
																				>
																					{game.crash_point.toFixed(
																						2
																					)}

																					x
																				</Badge>
																			</TableCell>
																			<TableCell>
																				<span
																					className={getAnomalyColor(
																						game.z_score
																					)}
																				>
																					{game.z_score >
																					0
																						? '+'
																						: ''}
																					{game.z_score.toFixed(
																						2
																					)}
																				</span>
																			</TableCell>
																			<TableCell className="text-xs">
																				{new Date(
																					game.time
																				).toLocaleString()}
																			</TableCell>
																		</TableRow>
																	)
																)}
															</TableBody>
														</Table>
													</div>
												) : (
													<div className="text-center py-8 text-muted-foreground">
														No anomalous games
														detected with current
														threshold
													</div>
												)}
											</div>
										</CardContent>
									</Card>
								</TabsContent>

								<TabsContent
									value="autocorrelation"
									className="mt-6"
								>
									<Card>
										<CardHeader>
											<CardTitle className="text-lg">
												Autocorrelation Analysis
											</CardTitle>
											<CardDescription>
												Correlation of crash points with
												previous games at different lags
											</CardDescription>
										</CardHeader>
										<CardContent>
											<div className="space-y-4">
												<div className="p-4 bg-muted rounded-md">
													<p className="text-sm font-medium">
														{
															data.autocorrelation
																.interpretation
														}
													</p>
													{data.autocorrelation
														.significant_lags
														.length > 0 && (
														<p className="text-xs text-muted-foreground mt-1">
															Significant at lags:{' '}
															{data.autocorrelation.significant_lags.join(
																', '
															)}
														</p>
													)}
												</div>

												<div className="h-64 w-full">
													<ResponsiveContainer
														width="100%"
														height="100%"
													>
														<BarChart
															data={formatAutocorrelationData()}
														>
															<CartesianGrid strokeDasharray="3 3" />
															<XAxis
																dataKey="lag"
																label={{
																	value: 'Lag',
																	position:
																		'insideBottom',
																	offset: -5,
																}}
															/>
															<YAxis
																label={{
																	value: 'Correlation',
																	angle: -90,
																	position:
																		'insideLeft',
																}}
															/>
															<Tooltip />
															<Bar dataKey="correlation">
																{formatAutocorrelationData().map(
																	(
																		entry,
																		index
																	) => (
																		<Cell
																			key={`cell-${index}`}
																			fill={
																				entry.significant
																					? '#ef4444'
																					: '#3b82f6'
																			}
																		/>
																	)
																)}
															</Bar>
														</BarChart>
													</ResponsiveContainer>
												</div>
											</div>
										</CardContent>
									</Card>
								</TabsContent>

								<TabsContent
									value="patterns"
									className="mt-6"
								>
									<Card>
										<CardHeader>
											<CardTitle className="text-lg">
												Pattern Detection
											</CardTitle>
											<CardDescription>
												Identified patterns in crash
												point sequences
											</CardDescription>
										</CardHeader>
										<CardContent>
											<div className="space-y-4">
												<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
													<Card>
														<CardHeader className="pb-3">
															<CardTitle className="text-sm font-medium flex items-center gap-2">
																{data.patterns
																	.trend
																	.direction ===
																'increasing' ? (
																	<TrendingUp className="h-4 w-4 text-green-500" />
																) : data
																		.patterns
																		.trend
																		.direction ===
																  'decreasing' ? (
																	<TrendingDown className="h-4 w-4 text-red-500" />
																) : (
																	<Activity className="h-4 w-4 text-yellow-500" />
																)}
																Trend Analysis
															</CardTitle>
														</CardHeader>
														<CardContent>
															<p className="font-semibold">
																{
																	data
																		.patterns
																		.trend
																		.direction
																}
															</p>
															<p className="text-xs text-muted-foreground">
																Slope:{' '}
																{data.patterns.trend.slope.toFixed(
																	2
																)}
															</p>
														</CardContent>
													</Card>

													<Card>
														<CardHeader className="pb-3">
															<CardTitle className="text-sm font-medium">
																Peak Detection
															</CardTitle>
														</CardHeader>
														<CardContent>
															<p className="font-semibold">
																{
																	data
																		.patterns
																		.peaks
																		.count
																}{' '}
																peaks
															</p>
															<p className="text-xs text-muted-foreground">
																Avg height:{' '}
																{data.patterns.peaks.average_height.toFixed(
																	2
																)}
																x
															</p>
														</CardContent>
													</Card>

													<Card>
														<CardHeader className="pb-3">
															<CardTitle className="text-sm font-medium">
																Periodicity
															</CardTitle>
														</CardHeader>
														<CardContent>
															<p className="font-semibold">
																{data.patterns
																	.periodicity
																	.has_cycle
																	? 'Cyclical'
																	: 'No cycle'}
															</p>
															{data.patterns
																.periodicity
																.has_cycle && (
																<p className="text-xs text-muted-foreground">
																	Period: ~
																	{Math.round(
																		data
																			.patterns
																			.periodicity
																			.dominant_period
																	)}{' '}
																	games
																</p>
															)}
														</CardContent>
													</Card>
												</div>

												{data.patterns.peaks.positions
													.length > 0 && (
													<div className="mt-4">
														<Label className="text-sm font-medium">
															Peak Positions
														</Label>
														<div className="flex flex-wrap gap-2 mt-2">
															{data.patterns.peaks.positions
																.slice(0, 20)
																.map((pos) => (
																	<Badge
																		key={
																			pos
																		}
																		variant="outline"
																		className="text-xs"
																	>
																		Game #
																		{pos}
																	</Badge>
																))}
															{data.patterns.peaks
																.positions
																.length >
																20 && (
																<Badge
																	variant="outline"
																	className="text-xs"
																>
																	+
																	{data
																		.patterns
																		.peaks
																		.positions
																		.length -
																		20}{' '}
																	more
																</Badge>
															)}
														</div>
													</div>
												)}
											</div>
										</CardContent>
									</Card>
								</TabsContent>
							</Tabs>
						</div>
					)}

					{isLoading && !data && (
						<div className="flex items-center justify-center py-8">
							<RefreshCw className="h-6 w-6 animate-spin mr-2" />
							<span>Analyzing patterns...</span>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
