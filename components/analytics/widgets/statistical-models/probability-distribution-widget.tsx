'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, RefreshCw, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { useProbabilityDistribution } from '@/hooks/analytics/statistical-models';
import type { BaseWidgetProps } from '@/utils/export-utils/types';

export function ProbabilityDistributionWidget({ className }: BaseWidgetProps) {
	const [limit, setLimit] = React.useState<number>(10000);
	const [limitInput, setLimitInput] = React.useState<string>('10000');

	const {
		data,
		isLoading,
		error,
		refreshData,
	} = useProbabilityDistribution({
		limit,
		enabled: true,
	});

	const handleLimitChange = () => {
		const newLimit = parseInt(limitInput);
		if (!isNaN(newLimit) && newLimit > 0) {
			setLimit(newLimit);
		}
	};

	const getDeviationColor = (deviation: number) => {
		const absDeviation = Math.abs(deviation);
		if (absDeviation > 100) return 'text-red-500';
		if (absDeviation > 50) return 'text-orange-500';
		if (absDeviation > 20) return 'text-yellow-500';
		return 'text-green-500';
	};

	const getSkewnessLabel = (skewness: number | null) => {
		if (!skewness) return 'Normal';
		if (skewness > 1) return 'Highly Right-Skewed';
		if (skewness > 0.5) return 'Right-Skewed';
		if (skewness < -1) return 'Highly Left-Skewed';
		if (skewness < -0.5) return 'Left-Skewed';
		return 'Approximately Normal';
	};

	return (
		<div className={className}>
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<BarChart3 className="h-5 w-5" />
						Probability Distribution Analysis
					</CardTitle>
					<CardDescription>
						Analyze crash point distribution across different ranges with statistical measures
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Controls */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="limit">Games to Analyze</Label>
							<div className="flex gap-2">
								<Input
									id="limit"
									value={limitInput}
									onChange={(e) => setLimitInput(e.target.value)}
									placeholder="10000"
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
									<CardTitle className="text-lg">Statistical Summary</CardTitle>
									<CardDescription>
										Analysis period: {new Date(data.analysis_period.start_time).toLocaleDateString()} - {new Date(data.analysis_period.end_time).toLocaleDateString()}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
										<div>
											<Label className="text-xs text-muted-foreground">Total Games</Label>
											<p className="font-semibold text-lg">
												{data.total_games.toLocaleString()}
											</p>
										</div>
										<div>
											<Label className="text-xs text-muted-foreground">Mean</Label>
											<p className="font-semibold text-lg">
												{data.overall_statistics.mean.toFixed(2)}x
											</p>
										</div>
										<div>
											<Label className="text-xs text-muted-foreground">Median</Label>
											<p className="font-semibold text-lg">
												{data.overall_statistics.median.toFixed(2)}x
											</p>
										</div>
										<div>
											<Label className="text-xs text-muted-foreground">Mode</Label>
											<p className="font-semibold text-lg">
												{data.overall_statistics.mode?.toFixed(2) || 'N/A'}x
											</p>
										</div>
									</div>

									<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
										<div>
											<Label className="text-xs text-muted-foreground">Std Dev</Label>
											<p className="font-semibold">
												{data.overall_statistics.std_dev?.toFixed(3) || 'N/A'}
											</p>
										</div>
										<div>
											<Label className="text-xs text-muted-foreground">Variance</Label>
											<p className="font-semibold">
												{data.overall_statistics.variance?.toFixed(3) || 'N/A'}
											</p>
										</div>
										<div>
											<Label className="text-xs text-muted-foreground">Skewness</Label>
											<div className="flex flex-col">
												<p className="font-semibold">
													{data.overall_statistics.skewness?.toFixed(3) || 'N/A'}
												</p>
												<Badge variant="outline" className="text-xs">
													{getSkewnessLabel(data.overall_statistics.skewness)}
												</Badge>
											</div>
										</div>
										<div>
											<Label className="text-xs text-muted-foreground">Kurtosis</Label>
											<p className="font-semibold">
												{data.overall_statistics.kurtosis?.toFixed(3) || 'N/A'}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Percentiles */}
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">Percentiles</CardTitle>
									<CardDescription>
										Distribution percentiles showing crash point values at different probability levels
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-3 md:grid-cols-7 gap-4">
										{Object.entries(data.percentiles).map(([percentile, value]) => (
											<div key={percentile} className="text-center">
												<Label className="text-xs text-muted-foreground">
													{percentile.replace('p', 'P')}
												</Label>
												<p className="font-semibold text-lg">
													{value.toFixed(2)}x
												</p>
											</div>
										))}
									</div>
								</CardContent>
							</Card>

							{/* Range Distribution */}
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">Range Distribution</CardTitle>
									<CardDescription>
										Probability distribution across crash point ranges with theoretical comparison
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{Object.entries(data.range_distribution)
											.sort(([, a], [, b]) => a.min_value - b.min_value)
											.map(([rangeName, rangeData]) => (
											<div key={rangeName} className="space-y-2">
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-2">
														<Label className="font-medium">
															{rangeData.min_value}x - {rangeData.max_value === 'inf' ? '∞' : `${rangeData.max_value}x`}
														</Label>
														<Badge variant="secondary">
															{rangeData.count.toLocaleString()} games
														</Badge>
													</div>
													<div className="text-right space-y-1">
														<p className="font-semibold">
															{rangeData.probability_percent.toFixed(1)}%
														</p>
														<p className="text-xs text-muted-foreground">
															Expected: {rangeData.theoretical_probability_percent.toFixed(1)}%
														</p>
													</div>
												</div>
												
												<div className="space-y-1">
													<Progress 
														value={rangeData.probability_percent} 
														className="h-2"
													/>
													<div className="flex justify-between text-xs text-muted-foreground">
														<span>
															Deviation: 
															<span className={getDeviationColor(rangeData.deviation_from_expected)}>
																{rangeData.deviation_from_expected > 0 ? '+' : ''}{rangeData.deviation_from_expected.toFixed(0)}
															</span>
														</span>
														<span>
															χ² component: {rangeData.chi_square_component.toFixed(2)}
														</span>
													</div>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>

							{/* Detailed Table */}
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">Detailed Distribution Table</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="border rounded-md">
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead>Range</TableHead>
													<TableHead>Count</TableHead>
													<TableHead>Actual %</TableHead>
													<TableHead>Expected %</TableHead>
													<TableHead>Deviation</TableHead>
													<TableHead>χ² Component</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{Object.entries(data.range_distribution)
													.sort(([, a], [, b]) => a.min_value - b.min_value)
													.map(([rangeName, rangeData]) => (
													<TableRow key={rangeName}>
														<TableCell className="font-medium">
															{rangeData.min_value}x - {rangeData.max_value === 'inf' ? '∞' : `${rangeData.max_value}x`}
														</TableCell>
														<TableCell>
															{rangeData.count.toLocaleString()}
														</TableCell>
														<TableCell className="font-semibold">
															{rangeData.probability_percent.toFixed(1)}%
														</TableCell>
														<TableCell className="text-muted-foreground">
															{rangeData.theoretical_probability_percent.toFixed(1)}%
														</TableCell>
														<TableCell className={getDeviationColor(rangeData.deviation_from_expected)}>
															{rangeData.deviation_from_expected > 0 ? (
																<div className="flex items-center">
																	<TrendingUp className="h-3 w-3 mr-1" />
																	+{rangeData.deviation_from_expected.toFixed(0)}
																</div>
															) : rangeData.deviation_from_expected < 0 ? (
																<div className="flex items-center">
																	<TrendingDown className="h-3 w-3 mr-1" />
																	{rangeData.deviation_from_expected.toFixed(0)}
																</div>
															) : (
																'0'
															)}
														</TableCell>
														<TableCell>
															{rangeData.chi_square_component.toFixed(2)}
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</div>
								</CardContent>
							</Card>
						</div>
					)}

					{isLoading && !data && (
						<div className="flex items-center justify-center py-8">
							<RefreshCw className="h-6 w-6 animate-spin mr-2" />
							<span>Loading probability distribution data...</span>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}