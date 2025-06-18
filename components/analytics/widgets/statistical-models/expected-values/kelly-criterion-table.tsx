'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import {
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ComposedChart,
  Scatter,
  Cell,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from '@/components/ui/chart';
import type { ExpectedValuesData } from './types';
import { formatChartData, formatNumber } from './utils';

interface KellyCriterionTableProps {
  data: ExpectedValuesData;
}

const chartConfig = {
  kelly: {
    label: 'Kelly %',
    color: 'hsl(var(--chart-2))',
  },
  ev: {
    label: 'EV/100',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

export function KellyCriterionTable({ data }: KellyCriterionTableProps) {
  const chartData = formatChartData(data);

  return (
    <div className="space-y-6">
      {/* Kelly & EV Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Kelly Criterion & Expected Value Analysis</CardTitle>
          <CardDescription>
            Optimal bet sizing and expected value per 100 bets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 60,
                  bottom: 60,
                  left: 60,
                }}
              >
                <defs>
                  <linearGradient id="kellyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(280, 70%, 50%)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="hsl(280, 70%, 50%)" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="target"
                  tickLine={false}
                  axisLine={false}
                  label={{
                    value: 'Target Multiplier (x)',
                    position: 'insideBottom',
                    offset: -10,
                  }}
                />
                <YAxis
                  yAxisId="left"
                  tickLine={false}
                  axisLine={false}
                  label={{
                    value: 'Kelly Criterion (%)',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                  tickFormatter={(value) => `${value}%`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  label={{
                    value: 'EV per 100 Bets',
                    angle: 90,
                    position: 'insideRight',
                  }}
                />
                <ChartTooltip
                  content={(props) => {
                    if (!props.active || !props.payload?.length) return null;
                    const data = props.payload[0].payload;
                    
                    return (
                      <div className="border-border/50 bg-background rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
                        <div className="p-2 space-y-1">
                          <p className="text-sm font-medium">Target {data.target}x</p>
                          <div className="rounded overflow-hidden border border-border/30 mt-2">
                            <table className="w-full">
                              <tbody>
                                <tr className="bg-muted/30">
                                  <td className="px-2 py-1 font-medium">Kelly %</td>
                                  <td className="px-2 py-1 text-right">{formatNumber(data.kellyFraction, 2)}%</td>
                                </tr>
                                <tr>
                                  <td className="px-2 py-1 font-medium">EV/100</td>
                                  <td className="px-2 py-1 text-right">{formatNumber(data.evPer100, 2)}</td>
                                </tr>
                                <tr className="bg-muted/30">
                                  <td className="px-2 py-1 font-medium">Expected Value</td>
                                  <td className="px-2 py-1 text-right">{formatNumber(data.expectedValue, 4)}</td>
                                </tr>
                                <tr>
                                  <td className="px-2 py-1 font-medium">Edge</td>
                                  <td className="px-2 py-1 text-right">{formatNumber(data.edge, 2)}%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="kellyFraction"
                  stroke="hsl(280, 70%, 50%)"
                  strokeWidth={2}
                  fill="url(#kellyGradient)"
                  dot={false}
                />
                <Scatter
                  yAxisId="right"
                  dataKey="evPer100"
                  fill="#8884d8"
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={
                        entry.evPer100 > 5 ? 'hsl(142, 71%, 45%)' : // Green
                        entry.evPer100 > 0 ? 'hsl(48, 96%, 53%)' : // Yellow
                        entry.evPer100 > -5 ? 'hsl(25, 95%, 53%)' : // Orange
                        'hsl(0, 84%, 60%)' // Red
                      }
                    />
                  ))}
                </Scatter>
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
          <Alert className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Kelly Criterion suggests optimal bet sizing as a percentage of bankroll (capped at 25%).
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Probability Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Probability Analysis</CardTitle>
          <CardDescription>
            Actual probability vs breakeven probability across targets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 60,
                  left: 60,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="target"
                  tickLine={false}
                  axisLine={false}
                  label={{
                    value: 'Target Multiplier (x)',
                    position: 'insideBottom',
                    offset: -10,
                  }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  label={{
                    value: 'Probability (%)',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                  tickFormatter={(value) => `${value}%`}
                />
                <ChartTooltip
                  content={(props) => {
                    if (!props.active || !props.payload?.length) return null;
                    const data = props.payload[0].payload;
                    
                    return (
                      <div className="border-border/50 bg-background rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
                        <div className="p-2 space-y-1">
                          <p className="text-sm font-medium">Target {data.target}x</p>
                          <div className="rounded overflow-hidden border border-border/30 mt-2">
                            <table className="w-full">
                              <tbody>
                                <tr className="bg-muted/30">
                                  <td className="px-2 py-1 font-medium">Actual Probability</td>
                                  <td className="px-2 py-1 text-right">{formatNumber(data.empiricalProb, 2)}%</td>
                                </tr>
                                <tr>
                                  <td className="px-2 py-1 font-medium">Breakeven Probability</td>
                                  <td className="px-2 py-1 text-right">{formatNumber(data.breakevenProb, 2)}%</td>
                                </tr>
                                <tr className="bg-muted/30">
                                  <td className="px-2 py-1 font-medium">Edge</td>
                                  <td className="px-2 py-1 text-right">
                                    <span className={data.edge > 0 ? 'text-green-500' : 'text-red-500'}>
                                      {data.edge > 0 ? '+' : ''}{formatNumber(data.edge, 2)}%
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
                <Line
                  type="monotone"
                  dataKey="breakevenProb"
                  name="Breakeven %"
                  stroke="hsl(36, 100%, 50%)"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(36, 100%, 50%)', r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="empiricalProb"
                  name="Actual %"
                  stroke="hsl(199, 89%, 48%)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={(props) => {
                    const { cx, cy, payload } = props;
                    const isPositiveEdge = payload.edge > 0;
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={4}
                        fill={isPositiveEdge ? 'hsl(142, 71%, 45%)' : 'hsl(199, 89%, 48%)'}
                        stroke={isPositiveEdge ? 'hsl(142, 71%, 45%)' : 'hsl(199, 89%, 48%)'}
                        strokeWidth={1}
                      />
                    );
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="mt-4 flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full border-2 border-dashed" style={{ borderColor: 'hsl(199, 89%, 48%)' }} />
              <span>Actual Probability</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: 'hsl(142, 71%, 45%)' }} />
              <span>Positive Edge</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: 'hsl(36, 100%, 50%)' }} />
              <span>Breakeven Probability</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}