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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatisticalModelsSkeleton } from '@/components/analytics/loading-skeleton';
import { AlertCircle, TrendingUp, Target } from 'lucide-react';
import { useRealTimeRiskAdjustedMetrics } from '@/hooks/analytics/statistical-models';
import type { BaseWidgetProps } from '@/utils/export-utils/types';
import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';
import { getExcelConfig } from './excel-export';
import { getHtmlConfig } from './html-export';
import { RiskAdjustedMetricsControls } from './controls';
import { OverviewTable } from './overview-table';
import { RiskMetricsTable } from './risk-metrics-table';
import { DrawdownTable } from './drawdown-table';
import { DetailsTable } from './details-table';

export function RiskAdjustedMetricsWidget({ className }: BaseWidgetProps) {
	const [targets, setTargets] = React.useState<number[]>([2, 3, 5, 10]);
	const [inputValue, setInputValue] = React.useState<string>('');
	const [limit, setLimit] = React.useState<number>(1000);
	const [limitInput, setLimitInput] = React.useState<string>('1000');

	const { data, isLoading, error } = useRealTimeRiskAdjustedMetrics({
		targets,
		limit,
		enabled: true,
	});

	const handleAddTarget = (value: string) => {
		const num = parseFloat(value.trim());
		if (!isNaN(num) && num > 0 && !targets.includes(num)) {
			setTargets([...targets, num].sort((a, b) => a - b));
			setInputValue('');
		}
	};

	const handleRemoveTarget = (target: number) => {
		setTargets(targets.filter((t) => t !== target));
	};

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault();
			handleAddTarget(inputValue);
		}
	};

	const applyLimitChange = () => {
		const newLimit = parseInt(limitInput);
		if (!isNaN(newLimit) && newLimit > 0) {
			setLimit(newLimit);
		} else {
			// Invalid input, revert to current limit
			setLimitInput(limit.toString());
		}
	};

	// Generate Excel export configuration
	const getExcelConfigAsync = async (): Promise<ExcelExportConfig> => {
		return getExcelConfig({ targets, limit, data });
	};

	// Generate HTML chart configuration
	const getChartConfigAsync = async (): Promise<HtmlChartConfig> => {
		return getHtmlConfig({ data });
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
					<RiskAdjustedMetricsControls
						targets={targets}
						inputValue={inputValue}
						limitInput={limitInput}
						onInputValueChange={setInputValue}
						onLimitInputChange={setLimitInput}
						handleAddTarget={handleAddTarget}
						handleRemoveTarget={handleRemoveTarget}
						handleInputKeyDown={handleInputKeyDown}
						applyLimitChange={applyLimitChange}
						getExcelConfig={getExcelConfigAsync}
						getChartConfig={getChartConfigAsync}
					/>

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
								</CardHeader>
								<CardContent>
									{data.optimal_strategy && (
										<div className="space-y-4">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div>
													<p className="text-xs text-muted-foreground">
														Best Risk-Adjusted
													</p>
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
													<p className="text-xs text-muted-foreground">
														Best Win Rate
													</p>
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
								<div className="bg-muted/50 p-0.5 rounded-md">
									<TabsList className="grid w-full grid-cols-4 bg-transparent p-0">
										<TabsTrigger
											value="overview"
											className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:!bg-black data-[state=active]:!text-white data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground border-0 data-[state=active]:border-0"
										>
											Overview
										</TabsTrigger>
										<TabsTrigger
											value="risk-metrics"
											className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:!bg-black data-[state=active]:!text-white data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground border-0 data-[state=active]:border-0"
										>
											Risk Metrics
										</TabsTrigger>
										<TabsTrigger
											value="drawdown"
											className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:!bg-black data-[state=active]:!text-white data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground border-0 data-[state=active]:border-0"
										>
											Drawdown
										</TabsTrigger>
										<TabsTrigger
											value="details"
											className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:!bg-black data-[state=active]:!text-white data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground border-0 data-[state=active]:border-0"
										>
											Details
										</TabsTrigger>
									</TabsList>
								</div>

								<TabsContent
									value="overview"
									className="mt-6"
								>
									<OverviewTable data={data} />
								</TabsContent>

								<TabsContent
									value="risk-metrics"
									className="mt-6"
								>
									<RiskMetricsTable data={data} />
								</TabsContent>

								<TabsContent
									value="drawdown"
									className="mt-6"
								>
									<DrawdownTable data={data} />
								</TabsContent>

								<TabsContent
									value="details"
									className="mt-6"
								>
									<DetailsTable data={data} />
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
