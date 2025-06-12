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
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { StatisticalModelsSkeleton } from '@/components/analytics/loading-skeleton';
import { AlertCircle, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';
import { useRealTimeRiskRewardProfiles } from '@/hooks/analytics/statistical-models';
import type { BaseWidgetProps } from '@/utils/export-utils/types';
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	ReferenceLine,
	ReferenceArea,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Radar,
	ComposedChart,
	Line,
	Bar,
} from 'recharts';

interface RiskRewardData {
	strategy: string;
	risk: number;
	reward: number;
	sharpeRatio: number;
	winRate: number;
	maxDrawdown: number;
	profitFactor: number;
}

interface StrategyProfile {
	metric: string;
	value: number;
	benchmark: number;
}

export function RiskRewardProfilesWidget({ className }: BaseWidgetProps) {
	// Memoize targets array to prevent unnecessary re-renders
	const targets = React.useMemo(() => [1.5, 2, 3, 5, 10, 20], []);

	const { data, isLoading, error, refreshData } =
		useRealTimeRiskRewardProfiles({
			targets,
			limit: 1000,
			enabled: true,
		});

	const formatNumber = (value: number, decimals: number = 2): string => {
		// Handle infinite or extremely large numbers
		if (!isFinite(value)) return '∞';
		if (Math.abs(value) > 1e10) return value > 0 ? '>10B' : '<-10B';
		return value.toFixed(decimals);
	};

	// Transform data for risk/reward scatter plot
	const getRiskRewardData = (): RiskRewardData[] => {
		if (!data?.strategies) return [];

		return Object.entries(data.strategies).map(([key, strategy]) => ({
			strategy: key,
			risk: strategy.risk_metrics.standard_deviation * 100, // Convert to percentage
			reward: strategy.performance.roi,
			sharpeRatio: strategy.risk_metrics.sharpe_ratio,
			winRate: strategy.performance.win_rate,
			maxDrawdown: strategy.drawdown_analysis.max_drawdown_percent,
			profitFactor:
				strategy.risk_metrics.profit_factor === Infinity
					? 10
					: strategy.risk_metrics.profit_factor,
		}));
	};

	// Transform data for strategy profile radar chart
	const getStrategyProfiles = (strategyKey: string): StrategyProfile[] => {
		if (!data?.strategies || !data.strategies[strategyKey]) return [];

		const strategy = data.strategies[strategyKey];
		const allStrategies = Object.values(data.strategies);

		// Calculate benchmarks (averages across all strategies)
		const avgSharpe =
			allStrategies.reduce(
				(sum, s) => sum + s.risk_metrics.sharpe_ratio,
				0
			) / allStrategies.length;
		const avgWinRate =
			allStrategies.reduce((sum, s) => sum + s.performance.win_rate, 0) /
			allStrategies.length;
		const avgROI =
			allStrategies.reduce((sum, s) => sum + s.performance.roi, 0) /
			allStrategies.length;
		const avgDrawdown =
			allStrategies.reduce(
				(sum, s) => sum + s.drawdown_analysis.max_drawdown_percent,
				0
			) / allStrategies.length;
		const avgProfitFactor =
			allStrategies.reduce(
				(sum, s) =>
					sum +
					(s.risk_metrics.profit_factor === Infinity
						? 10
						: s.risk_metrics.profit_factor),
				0
			) / allStrategies.length;

		return [
			{
				metric: 'Sharpe Ratio',
				value: Math.max(
					0,
					Math.min(100, strategy.risk_metrics.sharpe_ratio * 25)
				), // Normalize to 0-100
				benchmark: Math.max(0, Math.min(100, avgSharpe * 25)),
			},
			{
				metric: 'Win Rate',
				value: strategy.performance.win_rate,
				benchmark: avgWinRate,
			},
			{
				metric: 'ROI',
				value: Math.max(
					0,
					Math.min(100, strategy.performance.roi + 50)
				), // Normalize negative ROI
				benchmark: Math.max(0, Math.min(100, avgROI + 50)),
			},
			{
				metric: 'Risk Control',
				value: Math.max(
					0,
					100 - strategy.drawdown_analysis.max_drawdown_percent
				), // Inverse of drawdown
				benchmark: Math.max(0, 100 - avgDrawdown),
			},
			{
				metric: 'Profit Factor',
				value: Math.min(
					100,
					strategy.risk_metrics.profit_factor === Infinity
						? 100
						: strategy.risk_metrics.profit_factor * 20
				),
				benchmark: Math.min(100, avgProfitFactor * 20),
			},
		];
	};

	// Custom tooltip for scatter plot
	const CustomTooltip = ({
		active,
		payload,
	}: {
		active?: boolean;
		payload?: Array<{ payload: RiskRewardData }>;
	}) => {
		if (active && payload && payload.length) {
			const data = payload[0].payload;
			return (
				<div className="bg-background border rounded-lg shadow-lg p-3">
					<p className="font-semibold">{data.strategy}</p>
					<div className="space-y-1 text-sm">
						<p>Risk (Std Dev): {formatNumber(data.risk)}%</p>
						<p>Reward (ROI): {formatNumber(data.reward)}%</p>
						<p>Sharpe Ratio: {formatNumber(data.sharpeRatio)}</p>
						<p>Win Rate: {formatNumber(data.winRate)}%</p>
						<p>Max Drawdown: {formatNumber(data.maxDrawdown)}%</p>
					</div>
				</div>
			);
		}
		return null;
	};

	const riskRewardData = getRiskRewardData();

	return (
		<div className={className}>
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<TrendingUp className="h-5 w-5" />
						Risk/Reward Profiles
					</CardTitle>
					<CardDescription>
						Visualize the risk-reward tradeoffs and performance
						profiles of different betting strategies
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="flex justify-between items-center">
						<Label className="text-sm text-muted-foreground">
							Real-time analysis of recent 1000 games
						</Label>
						<Button
							onClick={refreshData}
							disabled={isLoading}
							size="sm"
							variant="outline"
						>
							{isLoading ? (
								<RefreshCw className="h-4 w-4 animate-spin mr-2" />
							) : (
								<RefreshCw className="h-4 w-4 mr-2" />
							)}
							Refresh
						</Button>
					</div>

					{error && (
						<Alert variant="destructive">
							<AlertCircle className="h-4 w-4" />
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					{data && (
						<div className="space-y-6">
							{/* Risk/Reward Scatter Plot */}
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">
										Risk vs Reward Analysis
									</CardTitle>
									<CardDescription>
										Each point represents a strategy. Better
										strategies are in the top-left (high
										reward, low risk).
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ResponsiveContainer
										width="100%"
										height={400}
									>
										<ScatterChart
											margin={{
												top: 20,
												right: 20,
												bottom: 20,
												left: 20,
											}}
										>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis
												dataKey="risk"
												name="Risk"
												unit="%"
												label={{
													value: 'Risk (Standard Deviation %)',
													position: 'insideBottom',
													offset: -10,
												}}
												tickFormatter={(value) =>
													formatNumber(value)
												}
											/>
											<YAxis
												dataKey="reward"
												name="Reward"
												unit="%"
												label={{
													value: 'Reward (ROI %)',
													angle: -90,
													position: 'insideLeft',
												}}
												tickFormatter={(value) =>
													formatNumber(value)
												}
											/>
											<Tooltip
												content={<CustomTooltip />}
											/>
											<ReferenceLine
												y={0}
												stroke="#666"
												strokeDasharray="3 3"
											/>
											<ReferenceArea
												x1={0}
												y1={0}
												x2={100}
												y2={100}
												fill="#10b981"
												fillOpacity={0.1}
											/>
											<Scatter
												name="Strategies"
												data={riskRewardData}
												fill="#8884d8"
											>
												{riskRewardData.map(
													(entry, index) => (
														<text
															key={`label-${index}`}
															x={entry.risk}
															y={entry.reward}
															dy={-10}
															textAnchor="middle"
															fill="#666"
															fontSize={12}
														>
															{entry.strategy}
														</text>
													)
												)}
											</Scatter>
										</ScatterChart>
									</ResponsiveContainer>
								</CardContent>
							</Card>

							{/* Efficient Frontier */}
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">
										Efficient Frontier
									</CardTitle>
									<CardDescription>
										Risk-adjusted returns showing Sharpe
										ratio efficiency across strategies
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ResponsiveContainer
										width="100%"
										height={300}
									>
										<ComposedChart
											data={riskRewardData}
											margin={{
												top: 20,
												right: 20,
												bottom: 20,
												left: 20,
											}}
										>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="strategy" />
											<YAxis
												yAxisId="left"
												label={{
													value: 'Sharpe Ratio',
													angle: -90,
													position: 'insideLeft',
												}}
												tickFormatter={(value) =>
													formatNumber(value)
												}
											/>
											<YAxis
												yAxisId="right"
												orientation="right"
												label={{
													value: 'Win Rate %',
													angle: 90,
													position: 'insideRight',
												}}
												tickFormatter={(value) =>
													formatNumber(value)
												}
											/>
											<Tooltip />
											<Legend />
											<Bar
												yAxisId="left"
												dataKey="sharpeRatio"
												fill="#8884d8"
												name="Sharpe Ratio"
											/>
											<Line
												yAxisId="right"
												type="monotone"
												dataKey="winRate"
												stroke="#82ca9d"
												name="Win Rate %"
											/>
										</ComposedChart>
									</ResponsiveContainer>
								</CardContent>
							</Card>

							{/* Strategy Performance Radar */}
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">
										Strategy Performance Profile
									</CardTitle>
									<CardDescription>
										Multi-dimensional comparison of
										strategies across key performance
										metrics
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{riskRewardData
											.slice(0, 4)
											.map((strategy) => (
												<div key={strategy.strategy}>
													<h4 className="text-center font-semibold mb-2">
														{strategy.strategy}
													</h4>
													<ResponsiveContainer
														width="100%"
														height={250}
													>
														<RadarChart
															data={getStrategyProfiles(
																strategy.strategy
															)}
														>
															<PolarGrid />
															<PolarAngleAxis dataKey="metric" />
															<PolarRadiusAxis
																angle={90}
																domain={[
																	0, 100,
																]}
															/>
															<Radar
																name="Strategy"
																dataKey="value"
																stroke="#8884d8"
																fill="#8884d8"
																fillOpacity={
																	0.6
																}
															/>
															<Radar
																name="Average"
																dataKey="benchmark"
																stroke="#82ca9d"
																fill="#82ca9d"
																fillOpacity={
																	0.2
																}
															/>
															<Legend />
														</RadarChart>
													</ResponsiveContainer>
												</div>
											))}
									</div>
								</CardContent>
							</Card>

							{/* Risk Categories */}
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">
										Risk Categories
									</CardTitle>
									<CardDescription>
										Strategies categorized by risk level
										based on volatility and drawdown
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{[
											'Low Risk',
											'Medium Risk',
											'High Risk',
										].map((category) => {
											const strategies =
												riskRewardData.filter((s) => {
													if (category === 'Low Risk')
														return (
															s.risk < 50 &&
															s.maxDrawdown < 15
														);
													if (
														category ===
														'Medium Risk'
													)
														return (
															s.risk >= 50 &&
															s.risk < 100 &&
															s.maxDrawdown < 30
														);
													return (
														s.risk >= 100 ||
														s.maxDrawdown >= 30
													);
												});

											return (
												<div
													key={category}
													className="border rounded-lg p-4"
												>
													<h4 className="font-semibold mb-2 flex items-center gap-2">
														{category ===
															'Low Risk' && (
															<TrendingUp className="h-4 w-4 text-green-500" />
														)}
														{category ===
															'High Risk' && (
															<TrendingDown className="h-4 w-4 text-red-500" />
														)}
														{category}
													</h4>
													<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
														{strategies.map((s) => (
															<div
																key={s.strategy}
																className="text-sm"
															>
																<p className="font-medium">
																	{s.strategy}
																</p>
																<p className="text-muted-foreground">
																	ROI:{' '}
																	{s.reward >
																	0
																		? '+'
																		: ''}
																	{formatNumber(
																		s.reward
																	)}
																	%
																</p>
															</div>
														))}
														{strategies.length ===
															0 && (
															<p className="text-sm text-muted-foreground col-span-4">
																No strategies in
																this category
															</p>
														)}
													</div>
												</div>
											);
										})}
									</div>
								</CardContent>
							</Card>
						</div>
					)}

					{isLoading && !data && <StatisticalModelsSkeleton />}
				</CardContent>
			</Card>
		</div>
	);
}
