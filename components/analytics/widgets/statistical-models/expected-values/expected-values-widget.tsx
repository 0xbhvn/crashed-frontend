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
import {
  AlertCircle,
  Calculator,
} from 'lucide-react';
import { useRealTimeExpectedValues } from '@/hooks/analytics/statistical-models';
import type { BaseWidgetProps } from '@/utils/export-utils/types';
import { ExpectedValuesControls } from './controls';
import { ExpectedValuesTable } from './expected-values-table';
import { KellyCriterionTable } from './kelly-criterion-table';
import { SurvivalAnalysisTable } from './survival-analysis-table';
import { getExpectedValuesExcelConfig } from './excel-export';
import { getExpectedValuesHtmlConfig } from './html-export';
import { validateLimit } from './utils';

export function ExpectedValuesWidget({ className }: BaseWidgetProps) {
  const [targets, setTargets] = React.useState<number[]>([
    1.5, 2, 3, 5, 10, 20, 50, 100,
  ]);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [limit, setLimit] = React.useState<number>(2000);
  const [limitInput, setLimitInput] = React.useState<string>('2000');

  const { data, isLoading, error } = useRealTimeExpectedValues({
    targets,
    limit,
    enabled: true,
  });

  const handleAddTarget = (value: string) => {
    if (!value.trim()) {
      setInputValue('');
      return;
    }
    
    const num = parseFloat(value.trim());
    if (!isNaN(num) && num > 0 && !targets.includes(num)) {
      setTargets([...targets, num].sort((a, b) => a - b));
    }
    setInputValue('');
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
    const newLimit = validateLimit(limitInput);
    if (newLimit) {
      setLimit(newLimit);
    } else {
      setLimitInput(limit.toString());
    }
  };

  const getExcelConfig = React.useCallback(async () => {
    return getExpectedValuesExcelConfig({ targets, limit, data });
  }, [targets, limit, data]);

  const getChartConfig = React.useCallback(async () => {
    return getExpectedValuesHtmlConfig(data);
  }, [data]);

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Expected Value Analysis
          </CardTitle>
          <CardDescription>
            Calculate expected values, Kelly criterion, and survival
            probabilities for different target multipliers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <ExpectedValuesControls
            targets={targets}
            inputValue={inputValue}
            limitInput={limitInput}
            onInputValueChange={setInputValue}
            onLimitInputChange={setLimitInput}
            handleAddTarget={handleAddTarget}
            handleRemoveTarget={handleRemoveTarget}
            handleInputKeyDown={handleInputKeyDown}
            applyLimitChange={applyLimitChange}
            getExcelConfig={getExcelConfig}
            getChartConfig={getChartConfig}
          />

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
                    <CardTitle className="text-sm font-medium">Max Expected Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {data.optimal_targets.max_expected_value.target}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      EV: {data.optimal_targets.max_expected_value.expected_value?.toFixed(4)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Probability: {data.optimal_targets.max_expected_value.probability?.toFixed(2)}%
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Max Kelly Criterion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {data.optimal_targets.max_kelly_criterion.target}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Kelly: {data.optimal_targets.max_kelly_criterion.kelly_criterion?.toFixed(2)}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      EV: {data.optimal_targets.max_kelly_criterion.expected_value?.toFixed(4)}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Best Risk-Adjusted</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {data.optimal_targets.best_risk_adjusted.target}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
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
                <div className="bg-muted/50 p-0.5 rounded-md">
                  <TabsList className="grid w-full grid-cols-3 bg-transparent p-0">
                    <TabsTrigger
                      value="expected-values"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:!bg-black data-[state=active]:!text-white data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground border-0 data-[state=active]:border-0"
                    >
                      Expected Values
                    </TabsTrigger>
                    <TabsTrigger
                      value="kelly-criterion"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:!bg-black data-[state=active]:!text-white data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground border-0 data-[state=active]:border-0"
                    >
                      Kelly Criterion
                    </TabsTrigger>
                    <TabsTrigger
                      value="survival"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:!bg-black data-[state=active]:!text-white data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground border-0 data-[state=active]:border-0"
                    >
                      Survival Analysis
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="expected-values" className="mt-6">
                  <ExpectedValuesTable data={data} />
                </TabsContent>

                <TabsContent value="kelly-criterion" className="mt-6">
                  <KellyCriterionTable data={data} />
                </TabsContent>

                <TabsContent value="survival" className="mt-6">
                  <SurvivalAnalysisTable data={data} />
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