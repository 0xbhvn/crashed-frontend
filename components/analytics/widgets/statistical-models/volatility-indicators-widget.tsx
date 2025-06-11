'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, RefreshCw, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { useVolatilityIndicators } from '@/hooks/analytics/statistical-models';
import type { BaseWidgetProps } from '@/utils/export-utils/types';

export function VolatilityIndicatorsWidget({ className }: BaseWidgetProps) {
	const [windows, setWindows] = React.useState<number[]>([10, 20, 50]);
	const [windowsInput, setWindowsInput] = React.useState<string>('10,20,50');
	const [limit, setLimit] = React.useState<number>(1000);
	const [limitInput, setLimitInput] = React.useState<string>('1000');

	const {
		data,
		isLoading,
		error,
		refreshData,
	} = useVolatilityIndicators({
		windows,
		limit,
		enabled: true,
	});

	const handleWindowsChange = () => {
		try {
			const newWindows = windowsInput
				.split(',')
				.map(w => parseInt(w.trim()))
				.filter(w => !isNaN(w) && w > 0);
			
			if (newWindows.length > 0) {
				setWindows(newWindows);
			}
		} catch (err) {
			console.error('Invalid windows format');
		}
	};

	const handleLimitChange = () => {
		const newLimit = parseInt(limitInput);
		if (!isNaN(newLimit) && newLimit > 0) {
			setLimit(newLimit);
		}
	};

	const getVolatilityColor = (cv: number | null) => {
		if (!cv) return 'text-muted-foreground';
		if (cv > 50) return 'text-red-500';
		if (cv > 30) return 'text-orange-500';
		if (cv > 20) return 'text-yellow-500';
		return 'text-green-500';
	};

	const getVolatilityLabel = (cv: number | null) => {
		if (!cv) return 'Unknown';
		if (cv > 50) return 'Very High';
		if (cv > 30) return 'High';
		if (cv > 20) return 'Moderate';
		return 'Low';
	};

	return (
		<div className={className}>
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Activity className="h-5 w-5" />
						Volatility Indicators
					</CardTitle>
					<CardDescription>
						Analyze market volatility using standard deviation, variance, and coefficient of variation
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Controls */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="space-y-2">
							<Label htmlFor="windows">Window Sizes</Label>
							<div className="flex gap-2">
								<Input
									id="windows"
									value={windowsInput}
									onChange={(e) => setWindowsInput(e.target.value)}
									placeholder="10,20,50"
									className="flex-1"
								/>
								<Button
									onClick={handleWindowsChange}
									variant="outline"
									size="sm"
								>
									Apply
								</Button>
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="limit">Games to Analyze</Label>
							<div className="flex gap-2">
								<Input
									id="limit"
									value={limitInput}
									onChange={(e) => setLimitInput(e.target.value)}
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
							{/* Overall Statistics */}
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">Overall Market Statistics</CardTitle>
									<CardDescription>
										Aggregate statistics for all {data.total_games.toLocaleString()} games analyzed
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-2 md:grid-cols-6 gap-4">
										<div>
											<Label className="text-xs text-muted-foreground">Mean</Label>
											<p className="font-semibold text-lg">
												{data.overall_statistics.mean.toFixed(2)}x
											</p>
										</div>
										<div>
											<Label className="text-xs text-muted-foreground">Std Dev</Label>
											<p className="font-semibold text-lg">
												{data.overall_statistics.std_dev?.toFixed(2) || 'N/A'}
											</p>
										</div>
										<div>
											<Label className="text-xs text-muted-foreground">Variance</Label>
											<p className="font-semibold text-lg">
												{data.overall_statistics.variance?.toFixed(2) || 'N/A'}
											</p>
										</div>
										<div>
											<Label className="text-xs text-muted-foreground">Min</Label>
											<p className="font-semibold text-lg">
												{data.overall_statistics.min.toFixed(2)}x
											</p>
										</div>
										<div>
											<Label className="text-xs text-muted-foreground">Max</Label>
											<p className="font-semibold text-lg">
												{data.overall_statistics.max.toFixed(2)}x
											</p>
										</div>
										<div>
											<Label className="text-xs text-muted-foreground">Median</Label>
											<p className="font-semibold text-lg">
												{data.overall_statistics.median.toFixed(2)}x
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Rolling Volatility Windows */}
							<div className="space-y-4">
								{Object.entries(data.rolling_volatility).map(([key, windowData]) => {
									if ('error' in windowData) {
										return (
											<Alert key={key} variant="destructive">
												<AlertCircle className="h-4 w-4" />
												<AlertDescription>
													Window {key}: {windowData.error}
												</AlertDescription>
											</Alert>
										);
									}

									return (
										<Card key={key}>
											<CardHeader>
												<CardTitle className="text-lg flex items-center justify-between">
													<span>{key.replace('window_', 'Window Size: ')} Games</span>
													<div className="flex items-center gap-2">
														<Badge 
															variant={windowData.volatility_trend === 'high' ? 'destructive' : 'secondary'}
														>
															{windowData.volatility_trend === 'high' ? (
																<TrendingUp className="h-3 w-3 mr-1" />
															) : (
																<TrendingDown className="h-3 w-3 mr-1" />
															)}
															{windowData.volatility_trend}
														</Badge>
														<Badge variant="outline">
															{getVolatilityLabel(windowData.current_cv)}
														</Badge>
													</div>
												</CardTitle>
												<CardDescription>
													Data Points: {windowData.data_points.toLocaleString()}
												</CardDescription>
											</CardHeader>
											<CardContent className="space-y-4">
												{/* Current Metrics */}
												<div>
													<Label className="text-sm font-medium">Current Window Metrics</Label>
													<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
														<div>
															<Label className="text-xs text-muted-foreground">Standard Deviation</Label>
															<p className="font-semibold">
																{windowData.current_std_dev?.toFixed(3) || 'N/A'}
															</p>
														</div>
														<div>
															<Label className="text-xs text-muted-foreground">Variance</Label>
															<p className="font-semibold">
																{windowData.current_variance?.toFixed(3) || 'N/A'}
															</p>
														</div>
														<div>
															<Label className="text-xs text-muted-foreground">Coefficient of Variation</Label>
															<p className={`font-semibold ${getVolatilityColor(windowData.current_cv)}`}>
																{windowData.current_cv?.toFixed(1) || 'N/A'}%
															</p>
														</div>
														<div>
															<Label className="text-xs text-muted-foreground">Volatility Level</Label>
															<p className={`font-semibold ${getVolatilityColor(windowData.current_cv)}`}>
																{getVolatilityLabel(windowData.current_cv)}
															</p>
														</div>
													</div>
												</div>

												{/* Average Metrics */}
												<div>
													<Label className="text-sm font-medium">Average Metrics (All Windows)</Label>
													<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
														<div>
															<Label className="text-xs text-muted-foreground">Avg Std Dev</Label>
															<p className="font-semibold">
																{windowData.avg_std_dev?.toFixed(3) || 'N/A'}
															</p>
														</div>
														<div>
															<Label className="text-xs text-muted-foreground">Avg Variance</Label>
															<p className="font-semibold">
																{windowData.avg_variance?.toFixed(3) || 'N/A'}
															</p>
														</div>
														<div>
															<Label className="text-xs text-muted-foreground">Avg CV</Label>
															<p className="font-semibold">
																{windowData.avg_cv?.toFixed(1) || 'N/A'}%
															</p>
														</div>
													</div>
												</div>

												{/* Recent Data Table */}
												{windowData.recent_data && windowData.recent_data.length > 0 && (
													<div>
														<Label className="text-sm font-medium">Recent Volatility Data</Label>
														<div className="mt-2 border rounded-md">
															<Table>
																<TableHeader>
																	<TableRow>
																		<TableHead>Game ID</TableHead>
																		<TableHead>Crash Point</TableHead>
																		<TableHead>Window Mean</TableHead>
																		<TableHead>Std Dev</TableHead>
																		<TableHead>CV (%)</TableHead>
																		<TableHead>Time</TableHead>
																	</TableRow>
																</TableHeader>
																<TableBody>
																	{windowData.recent_data.slice(-5).map((point) => (
																		<TableRow key={point.game_id}>
																			<TableCell className="font-mono">
																				{point.game_id}
																			</TableCell>
																			<TableCell>
																				{point.crash_point.toFixed(2)}x
																			</TableCell>
																			<TableCell>
																				{point.window_mean.toFixed(2)}
																			</TableCell>
																			<TableCell className="font-semibold">
																				{point.window_std_dev.toFixed(3)}
																			</TableCell>
																			<TableCell className={`font-semibold ${getVolatilityColor(point.coefficient_of_variation)}`}>
																				{point.coefficient_of_variation.toFixed(1)}%
																			</TableCell>
																			<TableCell className="text-sm text-muted-foreground">
																				{new Date(point.time).toLocaleTimeString()}
																			</TableCell>
																		</TableRow>
																	))}
																</TableBody>
															</Table>
														</div>
													</div>
												)}
											</CardContent>
										</Card>
									);
								})}
							</div>
						</div>
					)}

					{isLoading && !data && (
						<div className="flex items-center justify-center py-8">
							<RefreshCw className="h-6 w-6 animate-spin mr-2" />
							<span>Loading volatility indicators...</span>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}