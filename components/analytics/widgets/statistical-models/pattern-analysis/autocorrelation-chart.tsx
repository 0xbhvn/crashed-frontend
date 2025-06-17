'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { formatAutocorrelationData } from './utils';
import type { PatternAnalysisData } from './types';

interface AutocorrelationChartProps {
  data: PatternAnalysisData;
}

const chartConfig = {
  correlation: {
    label: 'Correlation',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function AutocorrelationChart({ data }: AutocorrelationChartProps) {
  const chartData = formatAutocorrelationData(data);

  // Calculate color for each bar based on significance and value
  const getBarColor = (entry: { significant: boolean; correlation: number }) => {
    if (entry.significant) return 'hsl(0, 90%, 45%)'; // Red for significant
    if (Math.abs(entry.correlation) > 0.1) return 'hsl(48, 95%, 50%)'; // Yellow for moderate
    return 'hsl(142, 90%, 40%)'; // Green for low correlation
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Autocorrelation Analysis</CardTitle>
        <CardDescription>
          Correlation of crash points with previous games at different lags
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-md">
            <p className="text-sm font-medium">{data.autocorrelation.interpretation}</p>
            {data.autocorrelation.significant_lags.length > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                Significant at lags: {data.autocorrelation.significant_lags.join(', ')}
              </p>
            )}
          </div>

          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart 
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="lag"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  label={{
                    value: 'Lag',
                    position: 'insideBottom',
                    offset: -10,
                  }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  label={{
                    value: 'Correlation',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                />
                <ChartTooltip
                  content={(props) => {
                    if (!props.active || !props.payload?.length) return null;
                    const data = props.payload[0].payload;
                    
                    return (
                      <div className="border-border/50 bg-background rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
                        <div className="p-2 space-y-1">
                          <p className="text-sm font-medium">Lag {data.lag}</p>
                          <div className="rounded overflow-hidden border border-border/30 mt-2">
                            <table className="w-full">
                              <tbody>
                                <tr className="bg-muted/30">
                                  <td className="px-2 py-1 font-medium">Correlation</td>
                                  <td className="px-2 py-1 text-right">{data.correlation.toFixed(4)}</td>
                                </tr>
                                <tr>
                                  <td className="px-2 py-1 font-medium">Significant</td>
                                  <td className="px-2 py-1 text-right">
                                    <span className={data.significant ? 'text-red-500' : 'text-green-500'}>
                                      {data.significant ? 'Yes' : 'No'}
                                    </span>
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
                <Bar dataKey="correlation">
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getBarColor(entry)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}