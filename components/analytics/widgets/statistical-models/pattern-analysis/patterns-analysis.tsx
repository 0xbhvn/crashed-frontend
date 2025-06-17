'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Legend,
  PolarAngleAxis,
} from 'recharts';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { formatNumber } from './utils';
import type { PatternAnalysisData } from './types';

interface PatternsAnalysisProps {
  data: PatternAnalysisData;
}

const chartConfig = {
  value: {
    label: 'Metric Value',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function PatternsAnalysis({ data }: PatternsAnalysisProps) {
  // Prepare chart data for pattern metrics with proper scaling for radial chart
  const chartData = React.useMemo(() => {
    return [
      {
        metric: 'Entropy',
        value: data.randomness_metrics.entropy * 100, // Already 0-1, scale to 0-100
        originalValue: data.randomness_metrics.entropy,
        category: 'randomness',
        description: 'Information entropy of crash sequence',
        fill: '#22c55e', // Green
      },
      {
        metric: 'Trend Slope',
        value: Math.min(Math.abs(data.patterns.trend.slope) * 100, 100), // Scale to 0-100
        originalValue: Math.abs(data.patterns.trend.slope),
        category: 'trend',
        description: 'Absolute trend slope',
        fill: '#3b82f6', // Blue
      },
      {
        metric: 'Anomaly Rate',
        value: data.summary.anomaly_rate * 100, // Already 0-1, scale to 0-100
        originalValue: data.summary.anomaly_rate,
        category: 'anomalies',
        description: 'Percentage of anomalous games',
        fill: '#ef4444', // Red
      },
      {
        metric: 'Peaks',
        value: Math.min((data.patterns.peaks.count / 100) * 100, 100), // Scale peaks to 0-100 (assuming max ~100 peaks)
        originalValue: data.patterns.peaks.count,
        category: 'patterns',
        description: 'Number of identified peaks',
        fill: '#f59e0b', // Yellow
      },
      {
        metric: 'Peak Height',
        value: Math.min((data.patterns.peaks.average_height / 200) * 100, 100), // Scale to 0-100 (assuming max ~200x)
        originalValue: data.patterns.peaks.average_height,
        category: 'patterns',
        description: 'Average height of peaks',
        fill: '#8b5cf6', // Purple
      },
    ];
  }, [data]);


  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Pattern Metrics</CardTitle>
        <CardDescription>
          Quantitative analysis of identified patterns and anomalies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Radial Chart visualization */}
          <div className="relative">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={400}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="30%"
                  outerRadius="80%"
                  barSize={20}
                  data={chartData}
                  startAngle={90}
                  endAngle={-270}
                >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar
                  dataKey="value"
                  cornerRadius={5}
                />
                <ChartTooltip
                  content={(props) => {
                    if (!props.active || !props.payload?.length) return null;
                    const data = props.payload[0].payload;
                    
                    return (
                      <div className="border-border/50 bg-background rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
                        <div className="p-2 space-y-1">
                          <p className="text-sm font-medium">{data.metric}</p>
                          <div className="rounded overflow-hidden border border-border/30 mt-2">
                            <table className="w-full">
                              <tbody>
                                <tr className="bg-muted/30">
                                  <td className="px-2 py-1 font-medium">Value</td>
                                  <td className="px-2 py-1 text-right">{formatNumber(data.originalValue)}</td>
                                </tr>
                                <tr>
                                  <td className="px-2 py-1 font-medium">Scaled</td>
                                  <td className="px-2 py-1 text-right">{data.value.toFixed(1)}%</td>
                                </tr>
                                <tr className="bg-muted/30">
                                  <td className="px-2 py-1 font-medium">Category</td>
                                  <td className="px-2 py-1 text-right capitalize">{data.category}</td>
                                </tr>
                                <tr>
                                  <td className="px-2 py-1 font-medium" colSpan={2}>
                                    {data.description}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                />
                <Legend
                  iconSize={10}
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ paddingTop: '20px' }}
                  formatter={(value, entry) => (
                    <span style={{ color: entry.color, fontSize: '12px' }}>
                      {(entry.payload as { metric?: string })?.metric}
                    </span>
                  )}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            </ChartContainer>
            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">Pattern</div>
                <div className="text-sm text-muted-foreground">Metrics</div>
                <div className="text-xs text-muted-foreground mt-1">Scaled 0-100%</div>
              </div>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  {data.patterns.trend.direction === 'increasing' ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : data.patterns.trend.direction === 'decreasing' ? (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  ) : (
                    <Activity className="h-4 w-4 text-yellow-500" />
                  )}
                  Trend Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold capitalize">
                  {data.patterns.trend.direction}
                </p>
                <p className="text-xs text-muted-foreground">
                  Slope: {data.patterns.trend.slope.toFixed(4)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Peak Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{data.patterns.peaks.count} peaks</p>
                <p className="text-xs text-muted-foreground">
                  Avg height: {data.patterns.peaks.average_height.toFixed(2)}x
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Periodicity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">
                  {data.patterns.periodicity.has_cycle ? 'Cyclical' : 'No cycle'}
                </p>
                {data.patterns.periodicity.has_cycle && (
                  <p className="text-xs text-muted-foreground">
                    Period: ~{Math.round(data.patterns.periodicity.dominant_period)} games
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {data.patterns.peaks.positions.length > 0 && (
            <div className="mt-4">
              <Label className="text-sm font-medium">Peak Positions</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.patterns.peaks.positions.slice(0, 20).map((pos) => (
                  <Badge key={pos} variant="outline" className="text-xs">
                    Game #{pos}
                  </Badge>
                ))}
                {data.patterns.peaks.positions.length > 20 && (
                  <Badge variant="outline" className="text-xs">
                    +{data.patterns.peaks.positions.length - 20} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}