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
import { AlertCircle, Brain } from 'lucide-react';
import { useRealTimePatternAnalysis } from '@/hooks/analytics/statistical-models';
import type { BaseWidgetProps } from '@/utils/export-utils/types';
import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';
import { getExcelConfig } from './excel-export';
import { getHtmlConfig } from './html-export';
import { PatternAnalysisControls } from './controls';
import { ClusteringChart } from './clustering-chart';
import { AnomaliesTable } from './anomalies-table';
import { AutocorrelationChart } from './autocorrelation-chart';
import { PatternsAnalysis } from './patterns-analysis';
import { SummaryCards } from './summary-cards';

export function PatternAnalysisWidget({ className }: BaseWidgetProps) {
  const [limit, setLimit] = React.useState<number>(2000);
  const [limitInput, setLimitInput] = React.useState<string>('2000');
  const [anomalyThreshold, setAnomalyThreshold] = React.useState<number>(3.0);
  const [thresholdInput, setThresholdInput] = React.useState<string>('3.0');

  const { data, isLoading, error } = useRealTimePatternAnalysis({
    limit,
    anomalyThreshold,
    enabled: true,
  });

  const applyLimitChange = () => {
    const newLimit = parseInt(limitInput);
    if (!isNaN(newLimit) && newLimit > 0) {
      setLimit(newLimit);
    } else {
      setLimitInput(limit.toString());
    }
  };

  const applyThresholdChange = () => {
    const newThreshold = parseFloat(thresholdInput);
    if (!isNaN(newThreshold) && newThreshold > 0) {
      setAnomalyThreshold(newThreshold);
    } else {
      setThresholdInput(anomalyThreshold.toString());
    }
  };

  // Generate Excel export configuration
  const getExcelConfigAsync = async (): Promise<ExcelExportConfig> => {
    return getExcelConfig({ params: { limit, anomalyThreshold, enabled: true }, data });
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
            <Brain className="h-5 w-5" />
            Pattern Recognition & Anomaly Detection
          </CardTitle>
          <CardDescription>
            Advanced pattern analysis using entropy, autocorrelation, anomaly detection, and clustering
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <PatternAnalysisControls
            limitInput={limitInput}
            thresholdInput={thresholdInput}
            onLimitInputChange={setLimitInput}
            onThresholdInputChange={setThresholdInput}
            applyLimitChange={applyLimitChange}
            applyThresholdChange={applyThresholdChange}
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
              {/* Summary Cards */}
              <SummaryCards data={data} />

              {/* Detailed Analysis Tabs */}
              <Tabs defaultValue="distribution" className="w-full">
                <div className="bg-muted/50 p-0.5 rounded-md">
                  <TabsList className="grid w-full grid-cols-4 bg-transparent p-0">
                    <TabsTrigger
                      value="distribution"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:!bg-black data-[state=active]:!text-white data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground border-0 data-[state=active]:border-0"
                    >
                      Distribution
                    </TabsTrigger>
                    <TabsTrigger
                      value="anomalies"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:!bg-black data-[state=active]:!text-white data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground border-0 data-[state=active]:border-0"
                    >
                      Anomalies
                    </TabsTrigger>
                    <TabsTrigger
                      value="autocorrelation"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:!bg-black data-[state=active]:!text-white data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground border-0 data-[state=active]:border-0"
                    >
                      Autocorrelation
                    </TabsTrigger>
                    <TabsTrigger
                      value="patterns"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:!bg-black data-[state=active]:!text-white data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground border-0 data-[state=active]:border-0"
                    >
                      Patterns
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="distribution" className="mt-6">
                  <ClusteringChart data={data} />
                </TabsContent>

                <TabsContent value="anomalies" className="mt-6">
                  <AnomaliesTable data={data} anomalyThreshold={anomalyThreshold} />
                </TabsContent>

                <TabsContent value="autocorrelation" className="mt-6">
                  <AutocorrelationChart data={data} />
                </TabsContent>

                <TabsContent value="patterns" className="mt-6">
                  <PatternsAnalysis data={data} />
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