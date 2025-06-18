'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from '@/components/ui/chart';
import type { ExpectedValuesData } from './types';
import { formatSurvivalData } from './utils';

interface SurvivalAnalysisTableProps {
  data: ExpectedValuesData;
}

const chartConfig = {
  probability: {
    label: 'Probability %',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export function SurvivalAnalysisTable({ data }: SurvivalAnalysisTableProps) {
  const survivalData = formatSurvivalData(data);

  // Color based on probability
  const getBarColor = (probability: number) => {
    if (probability > 80) return 'hsl(142, 71%, 45%)'; // Green
    if (probability > 60) return 'hsl(160, 60%, 45%)'; // Teal
    if (probability > 40) return 'hsl(48, 96%, 53%)'; // Yellow
    if (probability > 20) return 'hsl(25, 95%, 53%)'; // Orange
    return 'hsl(0, 84%, 60%)'; // Red
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Conditional Survival Probabilities</CardTitle>
        <CardDescription>
          Probability of reaching next milestone given current position
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart 
              data={survivalData}
              margin={{
                top: 10,
                right: 10,
                bottom: 60,
                left: 40,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="range"
                angle={-45}
                textAnchor="end"
                height={80}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                label={{
                  value: 'Probability (%)',
                  angle: -90,
                  position: 'insideLeft',
                }}
                domain={[0, 100]}
              />
              <ChartTooltip
                content={(props) => {
                  if (!props.active || !props.payload?.length) return null;
                  const data = props.payload[0].payload;
                  
                  return (
                    <div className="border-border/50 bg-background rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
                      <div className="p-2 space-y-1">
                        <p className="text-sm font-medium">{data.range}</p>
                        <div className="rounded overflow-hidden border border-border/30 mt-2">
                          <table className="w-full">
                            <tbody>
                              <tr className="bg-muted/30">
                                <td className="px-2 py-1 font-medium">Probability</td>
                                <td className="px-2 py-1 text-right">{data.probability.toFixed(2)}%</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
              <Bar
                dataKey="probability"
                radius={[4, 4, 0, 0]}
              >
                {survivalData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getBarColor(entry.probability)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}