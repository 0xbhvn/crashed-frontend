'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, RefreshCw, TrendingUp, TrendingDown, Calculator, Target, Trophy, Percent } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import { useExpectedValues } from '@/hooks/analytics/statistical-models';
import type { BaseWidgetProps } from '@/utils/export-utils/types';

export function ExpectedValuesWidget({ className }: BaseWidgetProps) {
	const [targetInput, setTargetInput] = React.useState<string>('1.5,2,3,5,10,20,50,100');
	const [targets, setTargets] = React.useState<number[]>([1.5, 2, 3, 5, 10, 20, 50, 100]);
	const [limit, setLimit] = React.useState<number>(10000);
	const [limitInput, setLimitInput] = React.useState<string>('10000');

	const {
		data,
		isLoading,
		error,
		refreshData,
	} = useExpectedValues({
		targets,
		limit,
		enabled: true,
	});

	const handleTargetChange = () => {
		try {
			const newTargets = targetInput.split(',').map(t => {
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

	const getEVColor = (ev: number) => {
		if (ev > 0.1) return 'text-green-600 font-bold';
		if (ev > 0) return 'text-green-500';
		if (ev > -0.05) return 'text-yellow-500';
		return 'text-red-500';
	};

	const getRecommendationColor = (recommendation: string) => {
		if (recommendation.includes('Strongly favorable')) return 'text-green-600';
		if (recommendation.includes('Favorable')) return 'text-green-500';
		if (recommendation.includes('Neutral')) return 'text-yellow-500';
		return 'text-red-500';
	};

	const formatChartData = () => {
		if (!data?.target_analysis) return [];
		return Object.entries(data.target_analysis).map(([key, analysis]) => ({
			target: parseFloat(key.replace('x', '')),
			expectedValue: analysis.expected_value,
			empiricalProb: analysis.empirical_probability,
			theoreticalProb: analysis.theoretical_probability,
			kellyFraction: analysis.kelly_criterion,
			edge: analysis.edge,
		}));
	};

	const formatSurvivalData = () => {
		if (!data?.survival_probabilities) return [];
		return Object.entries(data.survival_probabilities).map(([key, prob]) => ({
			range: `${prob.from}x→${prob.to}x`,
			probability: prob.conditional_probability,
			from: prob.from,
			to: prob.to,
		}));
	};

	return (
		<div className={className}>
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Calculator className="h-5 w-5" />
						Expected Value Analysis & Optimal Strategies
					</CardTitle>
					<CardDescription>
						Calculate expected values, Kelly criterion, and survival probabilities for different target multipliers
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Controls */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="space-y-2 md:col-span-2">
							<Label htmlFor="targets">Target Multipliers</Label>
							<div className="flex gap-2">
								<Input
									id="targets"
									value={targetInput}
									onChange={(e) => setTargetInput(e.target.value)}
									placeholder="1.5,2,3,5,10,20,50,100"
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
					</div>
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
						Refresh Analysis
					</Button>

					{error && (
						<Alert variant="destructive">
							<AlertCircle className="h-4 w-4" />
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					{data && (
						<div className="space-y-6">
							{/* Optimal Targets Summary */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<Card>
									<CardHeader className="pb-3">
										<CardTitle className="text-sm font-medium flex items-center gap-2">
											<Trophy className="h-4 w-4 text-yellow-500" />
											Max Expected Value
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-2xl font-bold">{data.optimal_targets.max_expected_value.target}</p>
										<p className="text-sm text-muted-foreground">
											EV: {data.optimal_targets.max_expected_value.expected_value?.toFixed(4)}
										</p>
										<p className="text-xs text-muted-foreground">
											Prob: {data.optimal_targets.max_expected_value.probability?.toFixed(1)}%
										</p>
									</CardContent>
								</Card>

								<Card>
									<CardHeader className="pb-3">
										<CardTitle className="text-sm font-medium flex items-center gap-2">
											<Percent className="h-4 w-4 text-blue-500" />
											Max Kelly Criterion
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-2xl font-bold">{data.optimal_targets.max_kelly_criterion.target}</p>
										<p className="text-sm text-muted-foreground">
											Kelly: {data.optimal_targets.max_kelly_criterion.kelly_criterion?.toFixed(1)}%
										</p>
										<p className="text-xs text-muted-foreground">
											EV: {data.optimal_targets.max_kelly_criterion.expected_value?.toFixed(4)}
										</p>
									</CardContent>
								</Card>

								<Card>
									<CardHeader className="pb-3">
										<CardTitle className="text-sm font-medium flex items-center gap-2">
											<Target className="h-4 w-4 text-green-500" />
											Best Risk-Adjusted
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-2xl font-bold">{data.optimal_targets.best_risk_adjusted.target}</p>
										<p className="text-sm text-muted-foreground">
											Score: {data.optimal_targets.best_risk_adjusted.risk_adjusted_score?.toFixed(4)}
										</p>
										<p className="text-xs text-muted-foreground">
											Balanced risk/reward
										</p>
									</CardContent>
								</Card>
							</div>

							{/* Detailed Analysis Tabs */}
							<Tabs defaultValue="expected-values" className="w-full">
								<TabsList className="grid w-full grid-cols-3">
									<TabsTrigger value="expected-values">Expected Values</TabsTrigger>
									<TabsTrigger value="kelly-criterion">Kelly Criterion</TabsTrigger>
									<TabsTrigger value="survival">Survival Analysis</TabsTrigger>
								</TabsList>

								<TabsContent value="expected-values" className="mt-6">
									<div className="space-y-6">
										{/* EV Chart */}
										<Card>
											<CardHeader>
												<CardTitle className="text-lg">Expected Value by Target</CardTitle>
												<CardDescription>
													Comparison of expected values across different target multipliers
												</CardDescription>
											</CardHeader>
											<CardContent>
												<div className="h-64 w-full">
													<ResponsiveContainer width="100%" height="100%">
														<LineChart data={formatChartData()}>
															<CartesianGrid strokeDasharray="3 3" />
															<XAxis 
																dataKey="target" 
																label={{ value: 'Target Multiplier', position: 'insideBottom', offset: -5 }}
																scale="log"
																domain={['dataMin', 'dataMax']}
															/>
															<YAxis label={{ value: 'Expected Value', angle: -90, position: 'insideLeft' }} />
															<Tooltip formatter={(value: number) => value.toFixed(4)} />
															<Line 
																type="monotone" 
																dataKey="expectedValue" 
																stroke="#10b981" 
																strokeWidth={2}
																dot={{ fill: '#10b981' }}
															/>
														</LineChart>
													</ResponsiveContainer>
												</div>
											</CardContent>
										</Card>

										{/* Detailed Table */}
										<Card>
											<CardHeader>
												<CardTitle className="text-lg">Target Analysis Details</CardTitle>
											</CardHeader>
											<CardContent>
												<div className="border rounded-md overflow-x-auto">
													<Table>
														<TableHeader>
															<TableRow>
																<TableHead>Target</TableHead>
																<TableHead>Empirical %</TableHead>
																<TableHead>Theoretical %</TableHead>
																<TableHead>Expected Value</TableHead>
																<TableHead>Edge %</TableHead>
																<TableHead>Recommendation</TableHead>
															</TableRow>
														</TableHeader>
														<TableBody>
															{Object.entries(data.target_analysis).map(([key, analysis]) => (
																<TableRow key={key}>
																	<TableCell className="font-medium">{key}</TableCell>
																	<TableCell>{analysis.empirical_probability.toFixed(2)}%</TableCell>
																	<TableCell className="text-muted-foreground">
																		{analysis.theoretical_probability.toFixed(2)}%
																	</TableCell>
																	<TableCell>
																		<span className={getEVColor(analysis.expected_value)}>
																			{analysis.expected_value > 0 ? '+' : ''}{analysis.expected_value.toFixed(4)}
																		</span>
																	</TableCell>
																	<TableCell>
																		<span className={analysis.edge > 0 ? 'text-green-500' : 'text-red-500'}>
																			{analysis.edge > 0 ? '+' : ''}{analysis.edge.toFixed(2)}%
																		</span>
																	</TableCell>
																	<TableCell>
																		<span className={`text-xs ${getRecommendationColor(analysis.recommendation)}`}>
																			{analysis.recommendation}
																		</span>
																	</TableCell>
																</TableRow>
															))}
														</TableBody>
													</Table>
												</div>
											</CardContent>
										</Card>
									</div>
								</TabsContent>

								<TabsContent value="kelly-criterion" className="mt-6">
									<div className="space-y-6">
										{/* Kelly Chart */}
										<Card>
											<CardHeader>
												<CardTitle className="text-lg">Kelly Criterion Analysis</CardTitle>
												<CardDescription>
													Optimal bet sizing based on edge and probability
												</CardDescription>
											</CardHeader>
											<CardContent>
												<div className="h-64 w-full">
													<ResponsiveContainer width="100%" height="100%">
														<AreaChart data={formatChartData()}>
															<CartesianGrid strokeDasharray="3 3" />
															<XAxis 
																dataKey="target" 
																label={{ value: 'Target Multiplier', position: 'insideBottom', offset: -5 }}
															/>
															<YAxis label={{ value: 'Kelly %', angle: -90, position: 'insideLeft' }} />
															<Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
															<Area 
																type="monotone" 
																dataKey="kellyFraction" 
																stroke="#3b82f6" 
																fill="#3b82f6"
																fillOpacity={0.6}
															/>
														</AreaChart>
													</ResponsiveContainer>
												</div>
												<Alert className="mt-4">
													<AlertCircle className="h-4 w-4" />
													<AlertDescription>
														Kelly Criterion suggests optimal bet sizing as a percentage of bankroll. 
														Values are capped at 25% for safety. Never bet more than you can afford to lose.
													</AlertDescription>
												</Alert>
											</CardContent>
										</Card>

										{/* Kelly Details */}
										<Card>
											<CardHeader>
												<CardTitle className="text-lg">Bet Sizing Recommendations</CardTitle>
											</CardHeader>
											<CardContent>
												<div className="space-y-3">
													{Object.entries(data.target_analysis)
														.sort(([,a], [,b]) => b.kelly_criterion - a.kelly_criterion)
														.slice(0, 5)
														.map(([key, analysis]) => (
														<div key={key} className="flex items-center justify-between p-3 bg-muted rounded-lg">
															<div>
																<p className="font-medium">Target {key}</p>
																<p className="text-xs text-muted-foreground">
																	Breakeven: {analysis.breakeven_probability.toFixed(1)}% | 
																	Actual: {analysis.empirical_probability.toFixed(1)}%
																</p>
															</div>
															<div className="text-right">
																<Badge variant={analysis.kelly_criterion > 10 ? 'default' : 'secondary'}>
																	Kelly: {analysis.kelly_criterion.toFixed(1)}%
																</Badge>
																<p className="text-xs mt-1">
																	EV/100: {analysis.ev_per_100_bets > 0 ? '+' : ''}{analysis.ev_per_100_bets.toFixed(2)}
																</p>
															</div>
														</div>
													))}
												</div>
											</CardContent>
										</Card>
									</div>
								</TabsContent>

								<TabsContent value="survival" className="mt-6">
									<div className="space-y-6">
										{/* Survival Probability Chart */}
										<Card>
											<CardHeader>
												<CardTitle className="text-lg">Conditional Survival Probabilities</CardTitle>
												<CardDescription>
													Probability of reaching next milestone given current position
												</CardDescription>
											</CardHeader>
											<CardContent>
												<div className="h-64 w-full">
													<ResponsiveContainer width="100%" height="100%">
														<BarChart data={formatSurvivalData()}>
															<CartesianGrid strokeDasharray="3 3" />
															<XAxis dataKey="range" angle={-45} textAnchor="end" height={80} />
															<YAxis label={{ value: 'Probability %', angle: -90, position: 'insideLeft' }} />
															<Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
															<Bar dataKey="probability" fill="#8b5cf6" />
														</BarChart>
													</ResponsiveContainer>
												</div>
											</CardContent>
										</Card>

										{/* Survival Analysis Table */}
										<Card>
											<CardHeader>
												<CardTitle className="text-lg">Survival Analysis Details</CardTitle>
											</CardHeader>
											<CardContent>
												<div className="space-y-3">
													{Object.entries(data.survival_probabilities).map(([key, prob]) => (
														<div key={key} className="p-4 bg-muted rounded-lg">
															<div className="flex items-center justify-between mb-2">
																<span className="font-medium">
																	{prob.from}x → {prob.to}x
																</span>
																<Badge variant={prob.conditional_probability > 50 ? 'default' : 'secondary'}>
																	{prob.conditional_probability.toFixed(1)}%
																</Badge>
															</div>
															<Progress value={prob.conditional_probability} className="h-2" />
															<p className="text-xs text-muted-foreground mt-1">
																{prob.interpretation}
															</p>
														</div>
													))}
												</div>
											</CardContent>
										</Card>
									</div>
								</TabsContent>
							</Tabs>
						</div>
					)}

					{isLoading && !data && (
						<div className="flex items-center justify-center py-8">
							<RefreshCw className="h-6 w-6 animate-spin mr-2" />
							<span>Calculating expected values...</span>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}