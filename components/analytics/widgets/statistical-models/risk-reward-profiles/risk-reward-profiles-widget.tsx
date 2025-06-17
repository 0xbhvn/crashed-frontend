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
import { AlertCircle, TrendingUp } from 'lucide-react';
import { useRealTimeRiskRewardProfiles } from '@/hooks/analytics/statistical-models';
import type { BaseWidgetProps } from '@/utils/export-utils/types';
import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';
import { getExcelConfig } from './excel-export';
import { getHtmlConfig } from './html-export';
import { RiskRewardProfilesControls } from './controls';
import { ScatterPlot } from './scatter-plot';
import { EfficientFrontier } from './efficient-frontier';
import { StrategyRadar } from './strategy-radar';
import { RiskCategories } from './risk-categories';
import { transformToRiskRewardData } from './utils';

export function RiskRewardProfilesWidget({ className }: BaseWidgetProps) {
  const [targets, setTargets] = React.useState<number[]>([1.5, 2, 3, 5, 10, 20]);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [limit, setLimit] = React.useState<number>(1000);
  const [limitInput, setLimitInput] = React.useState<string>('1000');

  const { data, isLoading, error } = useRealTimeRiskRewardProfiles({
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

  const riskRewardData = React.useMemo(
    () => (data ? transformToRiskRewardData(data) : []),
    [data]
  );

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Risk/Reward Profiles
          </CardTitle>
          <CardDescription>
            Analyze risk-reward tradeoffs and performance profiles of different betting strategies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <RiskRewardProfilesControls
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
                  <CardTitle className="text-lg">Analysis Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  {data.optimal_strategy && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Best Sharpe Ratio
                          </p>
                          <p className="font-semibold text-lg">
                            {data.optimal_strategy.best_sharpe_ratio}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Best Win Rate
                          </p>
                          <p className="font-semibold text-lg">
                            {data.optimal_strategy.best_win_rate}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Best Expected Value
                          </p>
                          <p className="font-semibold text-lg">
                            {data.optimal_strategy.best_roi}
                          </p>
                        </div>
                      </div>
                      <div className="p-4 bg-muted rounded-md">
                        <p className="text-sm font-medium">Recommendation</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {data.optimal_strategy.recommendation}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Visualizations */}
              <Tabs defaultValue="scatter" className="w-full">
                <div className="bg-muted/50 p-0.5 rounded-md">
                  <TabsList className="grid w-full grid-cols-4 bg-transparent p-0">
                    <TabsTrigger
                      value="scatter"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:!bg-black data-[state=active]:!text-white data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground border-0 data-[state=active]:border-0"
                    >
                      Risk vs EV
                    </TabsTrigger>
                    <TabsTrigger
                      value="frontier"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:!bg-black data-[state=active]:!text-white data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground border-0 data-[state=active]:border-0"
                    >
                      Efficient Frontier
                    </TabsTrigger>
                    <TabsTrigger
                      value="profiles"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:!bg-black data-[state=active]:!text-white data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground border-0 data-[state=active]:border-0"
                    >
                      Performance Profiles
                    </TabsTrigger>
                    <TabsTrigger
                      value="categories"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:!bg-black data-[state=active]:!text-white data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground border-0 data-[state=active]:border-0"
                    >
                      Risk Categories
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="scatter" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Risk vs Expected Value Analysis
                      </CardTitle>
                      <CardDescription>
                        Each point represents a strategy at different target crash points.
                        Points are colored by Sharpe ratio performance.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScatterPlot data={riskRewardData} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="frontier" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Efficient Frontier
                      </CardTitle>
                      <CardDescription>
                        Risk-adjusted returns showing Sharpe ratio efficiency
                        across strategies
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <EfficientFrontier data={riskRewardData} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="profiles" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Strategy Performance Profile
                      </CardTitle>
                      <CardDescription>
                        Multi-dimensional comparison of strategies across key
                        performance metrics
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <StrategyRadar data={data} strategies={riskRewardData} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="categories" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Risk Categories</CardTitle>
                      <CardDescription>
                        Strategies categorized by risk level based on volatility
                        and drawdown
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RiskCategories data={riskRewardData} />
                    </CardContent>
                  </Card>
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