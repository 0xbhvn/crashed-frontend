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
import { StatisticalModelsSkeleton } from '@/components/analytics/loading-skeleton';
import {
	AlertCircle,
	RefreshCw,
	TrendingUp,
	Target,
	DollarSign,
} from 'lucide-react';
import { useRealTimeRiskAdjustedMetrics } from '@/hooks/analytics/statistical-models';
import type { BaseWidgetProps } from '@/utils/export-utils/types';

export function RiskAdjustedMetricsWidget({ className }: BaseWidgetProps) {
	const [targetInput, setTargetInput] = React.useState<string>('2,3,5,10');
	const [targets, setTargets] = React.useState<number[]>([2, 3, 5, 10]);
	const [limit, setLimit] = React.useState<number>(1000);
	const [limitInput, setLimitInput] = React.useState<string>('1000');

	const { data, isLoading, error, refreshData } =
		useRealTimeRiskAdjustedMetrics({
			targets,
			limit,
			enabled: true,
		});

	const handleTargetChange = () => {
		try {
			const newTargets = targetInput.split(',').map((t) => {
				const num = parseFloat(t.trim());
				if (isNaN(num) || num <= 0) throw new Error();
				return num;
			});
			setTargets(newTargets);
		} catch {
			// Invalid input, don't update
		}
	};

	const handleLimitChange = () => {
		const newLimit = parseInt(limitInput);
		if (!isNaN(newLimit) && newLimit > 0) {
			setLimit(newLimit);
		}
	};

	const getRiskLevelColor = (value: number, metric: string) => {
		switch (metric) {
			case 'sharpe':
				if (value > 1) return 'text-green-500';
				if (value > 0.5) return 'text-yellow-500';
				return 'text-red-500';
			case 'drawdown':
				if (value < 10) return 'text-green-500';
				if (value < 20) return 'text-yellow-500';
				return 'text-red-500';
			case 'win_rate':
				if (value > 50) return 'text-green-500';
				if (value > 30) return 'text-yellow-500';
				return 'text-red-500';
			default:
				return '';
		}
	};

	const formatNumber = (value: number, decimals: number = 2): string => {
		// Handle infinite or extremely large numbers
		if (!isFinite(value)) return '∞';
		if (Math.abs(value) > 1e10) return value > 0 ? '>10B' : '<-10B';
		return value.toFixed(decimals);
	};

	const formatCurrency = (value: number): string => {
		// Handle infinite or extremely large numbers
		if (!isFinite(value)) return '$∞';
		if (Math.abs(value) > 1e10) return value > 0 ? '$>10B' : '$<-10B';
		return `$${value.toFixed(2)}`;
	};

	return (
		<div className={className}>
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Target className="h-5 w-5" />
						Risk-Adjusted Performance Metrics
					</CardTitle>
					<CardDescription>
						Analyze different betting strategies with advanced risk
						metrics including Sharpe ratio, drawdown analysis, and
						Value at Risk
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Controls */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="space-y-2">
							<Label htmlFor="targets">Target Multipliers</Label>
							<div className="flex gap-2">
								<Input
									id="targets"
									value={targetInput}
									onChange={(e) =>
										setTargetInput(e.target.value)
									}
									placeholder="2,3,5,10"
									className="flex-1"
								/>
								<Button
									onClick={handleTargetChange}
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
							{/* Analysis Summary */}
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">
										Analysis Summary
									</CardTitle>
									<CardDescription>
										Period:{' '}
										{new Date(
											data.analysis_period.start
										).toLocaleDateString()}{' '}
										-{' '}
										{new Date(
											data.analysis_period.end
										).toLocaleDateString()}{' '}
										({data.total_games} games)
									</CardDescription>
								</CardHeader>
								<CardContent>
									{data.optimal_strategy && (
										<div className="space-y-4">
											<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
												<div>
													<Label className="text-xs text-muted-foreground">
														Best Risk-Adjusted
													</Label>
													<p className="font-semibold text-lg flex items-center gap-2">
														<Target className="h-4 w-4" />
														{
															data
																.optimal_strategy
																.best_sharpe_ratio
														}
													</p>
												</div>
												<div>
													<Label className="text-xs text-muted-foreground">
														Best ROI
													</Label>
													<p className="font-semibold text-lg flex items-center gap-2">
														<DollarSign className="h-4 w-4" />
														{
															data
																.optimal_strategy
																.best_roi
														}
													</p>
												</div>
												<div>
													<Label className="text-xs text-muted-foreground">
														Best Win Rate
													</Label>
													<p className="font-semibold text-lg flex items-center gap-2">
														<TrendingUp className="h-4 w-4" />
														{
															data
																.optimal_strategy
																.best_win_rate
														}
													</p>
												</div>
											</div>
											<div className="p-4 bg-muted rounded-md">
												<p className="text-sm font-medium">
													Recommendation
												</p>
												<p className="text-sm text-muted-foreground mt-1">
													{
														data.optimal_strategy
															.recommendation
													}
												</p>
											</div>
										</div>
									)}
								</CardContent>
							</Card>

							{/* Strategy Comparison */}
							<Tabs
								defaultValue="overview"
								className="w-full"
							>
								<TabsList className="grid w-full grid-cols-4">
									<TabsTrigger value="overview">
										Overview
									</TabsTrigger>
									<TabsTrigger value="risk-metrics">
										Risk Metrics
									</TabsTrigger>
									<TabsTrigger value="drawdown">
										Drawdown
									</TabsTrigger>
									<TabsTrigger value="details">
										Details
									</TabsTrigger>
								</TabsList>

								<TabsContent
									value="overview"
									className="mt-6"
								>
									<div className="border rounded-md">
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead>
														Target
													</TableHead>
													<TableHead>
														Win Rate
													</TableHead>
													<TableHead>ROI</TableHead>
													<TableHead>
														Sharpe Ratio
													</TableHead>
													<TableHead>
														Max Drawdown
													</TableHead>
													<TableHead>
														Final Balance
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{Object.entries(
													data.strategies
												).map(([key, strategy]) => (
													<TableRow key={key}>
														<TableCell className="font-medium">
															{key}
														</TableCell>
														<TableCell>
															<span
																className={getRiskLevelColor(
																	strategy
																		.performance
																		.win_rate,
																	'win_rate'
																)}
															>
																{strategy.performance.win_rate.toFixed(
																	2
																)}
																%
															</span>
														</TableCell>
														<TableCell>
															<span
																className={
																	strategy
																		.performance
																		.roi > 0
																		? 'text-green-500'
																		: 'text-red-500'
																}
															>
																{strategy
																	.performance
																	.roi > 0
																	? '+'
																	: ''}
																{formatNumber(
																	strategy
																		.performance
																		.roi
																)}
																%
															</span>
														</TableCell>
														<TableCell>
															<span
																className={getRiskLevelColor(
																	strategy
																		.risk_metrics
																		.sharpe_ratio,
																	'sharpe'
																)}
															>
																{strategy.risk_metrics.sharpe_ratio.toFixed(
																	2
																)}
															</span>
														</TableCell>
														<TableCell>
															<span
																className={getRiskLevelColor(
																	strategy
																		.drawdown_analysis
																		.max_drawdown_percent,
																	'drawdown'
																)}
															>
																{strategy.drawdown_analysis.max_drawdown_percent.toFixed(
																	2
																)}
																%
															</span>
														</TableCell>
														<TableCell>
															{formatCurrency(
																strategy
																	.performance
																	.final_balance
															)}
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</div>
								</TabsContent>

								<TabsContent
									value="risk-metrics"
									className="mt-6"
								>
									<div className="border rounded-md">
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead>
														Target
													</TableHead>
													<TableHead>
														Sortino Ratio
													</TableHead>
													<TableHead>
														Std Dev
													</TableHead>
													<TableHead>
														VaR (95%)
													</TableHead>
													<TableHead>
														CVaR (95%)
													</TableHead>
													<TableHead>
														Profit Factor
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{Object.entries(
													data.strategies
												).map(([key, strategy]) => (
													<TableRow key={key}>
														<TableCell className="font-medium">
															{key}
														</TableCell>
														<TableCell>
															{strategy.risk_metrics.sortino_ratio.toFixed(
																2
															)}
														</TableCell>
														<TableCell>
															{strategy.risk_metrics.standard_deviation.toFixed(
																2
															)}
														</TableCell>
														<TableCell className="text-red-500">
															{strategy.risk_metrics.value_at_risk_95.toFixed(
																2
															)}
														</TableCell>
														<TableCell className="text-red-500">
															{strategy.risk_metrics.conditional_var_95.toFixed(
																2
															)}
														</TableCell>
														<TableCell>
															{strategy
																.risk_metrics
																.profit_factor ===
															Infinity
																? '∞'
																: strategy.risk_metrics.profit_factor.toFixed(
																		2
																  )}
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</div>
								</TabsContent>

								<TabsContent
									value="drawdown"
									className="mt-6"
								>
									<div className="border rounded-md">
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead>
														Target
													</TableHead>
													<TableHead>
														Max Drawdown
													</TableHead>
													<TableHead>
														Drawdown Periods
													</TableHead>
													<TableHead>
														Avg Duration
													</TableHead>
													<TableHead>
														Longest Duration
													</TableHead>
													<TableHead>
														Max Consecutive Losses
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{Object.entries(
													data.strategies
												).map(([key, strategy]) => (
													<TableRow key={key}>
														<TableCell className="font-medium">
															{key}
														</TableCell>
														<TableCell>
															<span
																className={getRiskLevelColor(
																	strategy
																		.drawdown_analysis
																		.max_drawdown_percent,
																	'drawdown'
																)}
															>
																{strategy.drawdown_analysis.max_drawdown_percent.toFixed(
																	2
																)}
																%
															</span>
														</TableCell>
														<TableCell>
															{
																strategy
																	.drawdown_analysis
																	.drawdown_periods
															}
														</TableCell>
														<TableCell>
															{strategy.drawdown_analysis.avg_drawdown_duration.toFixed(
																2
															)}{' '}
															games
														</TableCell>
														<TableCell>
															{
																strategy
																	.drawdown_analysis
																	.longest_drawdown
															}{' '}
															games
														</TableCell>
														<TableCell className="text-red-500">
															{
																strategy
																	.risk_metrics
																	.max_consecutive_losses
															}
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</div>
								</TabsContent>

								<TabsContent
									value="details"
									className="mt-6"
								>
									<div className="space-y-4">
										{Object.entries(data.strategies).map(
											([key, strategy]) => (
												<Card key={key}>
													<CardHeader>
														<CardTitle className="text-lg flex items-center justify-between">
															<span>
																Target: {key}
															</span>
															<Badge
																variant={
																	strategy
																		.performance
																		.roi > 0
																		? 'default'
																		: 'destructive'
																}
															>
																ROI:{' '}
																{strategy
																	.performance
																	.roi > 0
																	? '+'
																	: ''}
																{formatNumber(
																	strategy
																		.performance
																		.roi
																)}
																%
															</Badge>
														</CardTitle>
													</CardHeader>
													<CardContent>
														<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
															<div>
																<Label className="text-xs text-muted-foreground">
																	Total Bets
																</Label>
																<p className="font-semibold">
																	{
																		strategy
																			.performance
																			.total_bets
																	}
																</p>
															</div>
															<div>
																<Label className="text-xs text-muted-foreground">
																	Wins
																</Label>
																<p className="font-semibold">
																	{
																		strategy
																			.performance
																			.wins
																	}
																</p>
															</div>
															<div>
																<Label className="text-xs text-muted-foreground">
																	Average
																	Return
																</Label>
																<p className="font-semibold">
																	{strategy.performance.average_return.toFixed(
																		2
																	)}
																</p>
															</div>
															<div>
																<Label className="text-xs text-muted-foreground">
																	Total Return
																</Label>
																<p className="font-semibold">
																	{strategy.performance.total_return.toFixed(
																		2
																	)}
																</p>
															</div>
														</div>
													</CardContent>
												</Card>
											)
										)}
									</div>
								</TabsContent>
							</Tabs>
						</div>
					)}

					{isLoading && !data && <StatisticalModelsSkeleton />}
				</CardContent>
			</Card>
		</div>
	);
}
