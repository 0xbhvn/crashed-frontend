'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, RefreshCw, Activity, TrendingUp, TrendingDown, Brain, Gauge, AlertTriangle, DollarSign } from 'lucide-react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useMarketPsychology } from '@/hooks/analytics/statistical-models';
import type { BaseWidgetProps } from '@/utils/export-utils/types';

const getFearGreedColor = (index: number) => {
	if (index >= 75) return '#ef4444'; // Extreme Greed - Red
	if (index >= 60) return '#f59e0b'; // Greed - Orange
	if (index >= 40) return '#facc15'; // Neutral - Yellow
	if (index >= 25) return '#84cc16'; // Fear - Light Green
	return '#10b981'; // Extreme Fear - Green
};

const getSentimentEmoji = (sentiment: string) => {
	switch (sentiment) {
		case 'Extreme Greed': return '🤑';
		case 'Greed': return '😊';
		case 'Neutral': return '😐';
		case 'Fear': return '😟';
		case 'Extreme Fear': return '😱';
		default: return '🤔';
	}
};

const getRiskLevelColor = (level: string) => {
	switch (level) {
		case 'Very High': return 'text-red-600';
		case 'High': return 'text-red-500';
		case 'Medium': return 'text-yellow-500';
		case 'Low': return 'text-green-500';
		default: return '';
	}
};

export function MarketPsychologyWidget({ className }: BaseWidgetProps) {
	const [limit, setLimit] = React.useState<number>(1000);
	const [limitInput, setLimitInput] = React.useState<string>('1000');
	const [shortWindow, setShortWindow] = React.useState<number>(50);
	const [shortWindowInput, setShortWindowInput] = React.useState<string>('50');
	const [longWindow, setLongWindow] = React.useState<number>(200);
	const [longWindowInput, setLongWindowInput] = React.useState<string>('200');

	const {
		data,
		isLoading,
		error,
		refreshData,
	} = useMarketPsychology({
		limit,
		shortWindow,
		longWindow,
		enabled: true,
	});

	const handleLimitChange = () => {
		const newLimit = parseInt(limitInput);
		if (!isNaN(newLimit) && newLimit > 0) {
			setLimit(newLimit);
		}
	};

	const handleWindowChange = () => {
		const newShort = parseInt(shortWindowInput);
		const newLong = parseInt(longWindowInput);
		if (!isNaN(newShort) && newShort > 0 && !isNaN(newLong) && newLong > newShort) {
			setShortWindow(newShort);
			setLongWindow(newLong);
		}
	};

	const formatFearGreedData = () => {
		if (!data?.fear_greed_index) return [];
		return [{
			name: 'Fear & Greed',
			value: data.fear_greed_index.index,
			fill: getFearGreedColor(data.fear_greed_index.index),
		}];
	};

	return (
		<div className={className}>
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Brain className="h-5 w-5" />
						Market Psychology Indicators
					</CardTitle>
					<CardDescription>
						Advanced market sentiment analysis including Fear & Greed index, volatility regimes, and momentum indicators
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
						<div className="space-y-2">
							<Label>Window Sizes</Label>
							<div className="flex gap-2">
								<Input
									value={shortWindowInput}
									onChange={(e) => setShortWindowInput(e.target.value)}
									placeholder="50"
									className="flex-1"
								/>
								<Input
									value={longWindowInput}
									onChange={(e) => setLongWindowInput(e.target.value)}
									placeholder="200"
									className="flex-1"
								/>
								<Button
									onClick={handleWindowChange}
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
							{/* Market State Overview */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Fear & Greed Index */}
								<Card>
									<CardHeader>
										<CardTitle className="text-lg">Fear & Greed Index</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="flex items-center justify-between mb-4">
											<div>
												<p className="text-4xl font-bold" style={{ color: getFearGreedColor(data.fear_greed_index.index) }}>
													{Math.round(data.fear_greed_index.index)}
												</p>
												<p className="text-lg font-medium flex items-center gap-2 mt-1">
													{data.fear_greed_index.sentiment} {getSentimentEmoji(data.fear_greed_index.sentiment)}
												</p>
											</div>
											<div className="h-32 w-32">
												<ResponsiveContainer width="100%" height="100%">
													<RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="100%" data={formatFearGreedData()}>
														<PolarAngleAxis
															type="number"
															domain={[0, 100]}
															angleAxisId={0}
															tick={false}
														/>
														<RadialBar
															dataKey="value"
															cornerRadius={10}
															fill={getFearGreedColor(data.fear_greed_index.index)}
														/>
													</RadialBarChart>
												</ResponsiveContainer>
											</div>
										</div>
										<div className="space-y-2">
											<div className="flex justify-between text-sm">
												<span>Performance</span>
												<span>{data.fear_greed_index.components.performance.toFixed(0)}</span>
											</div>
											<Progress value={data.fear_greed_index.components.performance} className="h-2" />
											
											<div className="flex justify-between text-sm">
												<span>Volatility (inverted)</span>
												<span>{data.fear_greed_index.components.volatility.toFixed(0)}</span>
											</div>
											<Progress value={data.fear_greed_index.components.volatility} className="h-2" />
											
											<div className="flex justify-between text-sm">
												<span>High Multipliers</span>
												<span>{data.fear_greed_index.components.high_multipliers.toFixed(0)}</span>
											</div>
											<Progress value={data.fear_greed_index.components.high_multipliers} className="h-2" />
											
											<div className="flex justify-between text-sm">
												<span>Bust Frequency (inverted)</span>
												<span>{data.fear_greed_index.components.bust_frequency.toFixed(0)}</span>
											</div>
											<Progress value={data.fear_greed_index.components.bust_frequency} className="h-2" />
										</div>
									</CardContent>
								</Card>

								{/* Market State Summary */}
								<Card>
									<CardHeader>
										<CardTitle className="text-lg">Market State Analysis</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											<div>
												<Label className="text-xs text-muted-foreground">Current States</Label>
												<div className="flex flex-wrap gap-2 mt-1">
													{data.market_state.states.map((state) => (
														<Badge key={state} variant={state.includes('Risk') ? 'destructive' : 'default'}>
															{state}
														</Badge>
													))}
												</div>
											</div>
											
											<div className="grid grid-cols-2 gap-4">
												<div>
													<Label className="text-xs text-muted-foreground">Risk Level</Label>
													<p className={`text-lg font-semibold ${getRiskLevelColor(data.market_state.risk_level)}`}>
														{data.market_state.risk_level}
													</p>
												</div>
												<div>
													<Label className="text-xs text-muted-foreground">Opportunity Score</Label>
													<div className="flex items-center gap-2">
														<p className="text-lg font-semibold">{data.market_state.opportunity_score}/100</p>
														<Gauge className={`h-4 w-4 ${data.market_state.opportunity_score > 70 ? 'text-green-500' : data.market_state.opportunity_score > 40 ? 'text-yellow-500' : 'text-red-500'}`} />
													</div>
												</div>
											</div>

											<div>
												<Label className="text-xs text-muted-foreground mb-2">Trading Recommendations</Label>
												<div className="space-y-2">
													{data.trading_recommendations.map((rec, idx) => (
														<div key={idx} className="flex items-start gap-2 p-2 bg-muted rounded text-sm">
															<DollarSign className="h-4 w-4 mt-0.5 flex-shrink-0" />
															<span>{rec}</span>
														</div>
													))}
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Detailed Indicators */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{/* Bust Frequency Index */}
								<Card>
									<CardHeader className="pb-3">
										<CardTitle className="text-sm font-medium flex items-center gap-2">
											<AlertTriangle className="h-4 w-4" />
											Bust Frequency Index
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-2">
											<div className="flex items-baseline justify-between">
												<p className="text-2xl font-bold">{data.bust_frequency_index.index.toFixed(0)}</p>
												<Badge variant={data.bust_frequency_index.index > 110 ? 'destructive' : 'default'}>
													{data.bust_frequency_index.interpretation.split(' - ')[0]}
												</Badge>
											</div>
											<div className="space-y-1 text-xs">
												<div className="flex justify-between">
													<span>Recent rate:</span>
													<span>{data.bust_frequency_index.recent_bust_rate.toFixed(1)}%</span>
												</div>
												<div className="flex justify-between">
													<span>Long-term rate:</span>
													<span>{data.bust_frequency_index.long_term_bust_rate.toFixed(1)}%</span>
												</div>
											</div>
											<p className="text-xs text-muted-foreground mt-2">
												{data.bust_frequency_index.interpretation}
											</p>
										</div>
									</CardContent>
								</Card>

								{/* Volatility Regime */}
								<Card>
									<CardHeader className="pb-3">
										<CardTitle className="text-sm font-medium flex items-center gap-2">
											<Activity className="h-4 w-4" />
											Volatility Regime
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-2">
											{data.volatility_regime.error ? (
												<Alert>
													<AlertCircle className="h-4 w-4" />
													<AlertDescription>{data.volatility_regime.error}</AlertDescription>
												</Alert>
											) : (
												<>
													<div className="flex items-baseline justify-between">
														<p className="text-2xl font-bold">{data.volatility_regime.current_volatility.toFixed(3)}</p>
														<Badge>{data.volatility_regime.regime}</Badge>
													</div>
													<div className="space-y-1">
														<div className="flex justify-between text-xs">
															<span>Percentile rank:</span>
															<span>{data.volatility_regime.percentile_rank.toFixed(0)}%</span>
														</div>
														<Progress value={data.volatility_regime.percentile_rank} className="h-2" />
													</div>
													<div className="space-y-1 text-xs">
														<div className="flex justify-between">
															<span>Vol ratio:</span>
															<span>{data.volatility_regime.volatility_ratio.toFixed(2)}</span>
														</div>
														<div className="flex justify-between">
															<span>Average vol:</span>
															<span>{data.volatility_regime.average_volatility.toFixed(3)}</span>
														</div>
													</div>
												</>
											)}
										</div>
									</CardContent>
								</Card>

								{/* Momentum Indicators */}
								<Card>
									<CardHeader className="pb-3">
										<CardTitle className="text-sm font-medium flex items-center gap-2">
											{data.momentum_indicators.trend === 'bullish' ? (
												<TrendingUp className="h-4 w-4 text-green-500" />
											) : data.momentum_indicators.trend === 'bearish' ? (
												<TrendingDown className="h-4 w-4 text-red-500" />
											) : (
												<Activity className="h-4 w-4 text-yellow-500" />
											)}
											Momentum Indicators
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-2">
											{data.momentum_indicators.error ? (
												<Alert>
													<AlertCircle className="h-4 w-4" />
													<AlertDescription>{data.momentum_indicators.error}</AlertDescription>
												</Alert>
											) : (
												<>
													<div className="flex items-baseline justify-between">
														<div>
															<p className="text-2xl font-bold">{data.momentum_indicators.rsi.toFixed(0)}</p>
															<p className="text-xs text-muted-foreground">RSI</p>
														</div>
														<Badge variant={
															data.momentum_indicators.trend === 'bullish' ? 'default' : 
															data.momentum_indicators.trend === 'bearish' ? 'destructive' : 
															'secondary'
														}>
															{data.momentum_indicators.trend}
														</Badge>
													</div>
													<div className="space-y-1 text-xs">
														<div className="flex justify-between">
															<span>Momentum score:</span>
															<span className={data.momentum_indicators.momentum_score > 0 ? 'text-green-500' : 'text-red-500'}>
																{data.momentum_indicators.momentum_score > 0 ? '+' : ''}{data.momentum_indicators.momentum_score.toFixed(1)}%
															</span>
														</div>
														<div className="flex justify-between">
															<span>Recent average:</span>
															<span>{data.momentum_indicators.recent_average.toFixed(2)}x</span>
														</div>
													</div>
													<p className="text-xs text-muted-foreground mt-2">
														{data.momentum_indicators.interpretation}
													</p>
												</>
											)}
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					)}

					{isLoading && !data && (
						<div className="flex items-center justify-center py-8">
							<RefreshCw className="h-6 w-6 animate-spin mr-2" />
							<span>Analyzing market psychology...</span>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}