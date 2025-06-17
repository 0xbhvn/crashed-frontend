'use client';

import * as React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from '@/components/ui/chart';
import { formatNumber } from './utils';
import type { RiskRewardChartData } from './types';

interface ScatterPlotProps {
  data: RiskRewardChartData[];
}

const chartConfig = {
  scatter: {
    label: 'Strategy',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function ScatterPlot({ data }: ScatterPlotProps) {
  // Calculate color for each point based on Sharpe ratio
  const getPointColor = (sharpeRatio: number) => {
    if (sharpeRatio > 1) return 'hsl(142, 90%, 40%)'; // Green
    if (sharpeRatio > 0.5) return 'hsl(48, 95%, 50%)'; // Yellow
    return 'hsl(0, 90%, 45%)'; // Red
  };

  // Sort data by target multiplier for consistent x-axis ordering
  const sortedData = [...data].sort((a, b) => a.targetMultiplier - b.targetMultiplier);

  return (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 60,
            left: 60,
          }}
          data={sortedData}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="strategy"
            type="category"
            tickLine={false}
            axisLine={false}
            label={{
              value: 'Target Crash Point (x)',
              position: 'insideBottom',
              offset: -10,
            }}
          />
          <YAxis
            dataKey="expectedValue"
            tickLine={false}
            axisLine={false}
            label={{
              value: 'Expected Value per Bet (%)',
              angle: -90,
              position: 'insideLeft',
            }}
            tickFormatter={(value) => formatNumber(value)}
          />
          <ChartTooltip
            content={(props) => {
              if (!props.active || !props.payload?.length) return null;
              const data = props.payload[0].payload as RiskRewardChartData;
              
              return (
                <div className="border-border/50 bg-background rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
                  <div className="p-2 space-y-1">
                    <p className="text-sm font-medium">{data.strategy}</p>
                    <div className="rounded overflow-hidden border border-border/30 mt-2">
                      <table className="w-full">
                        <tbody>
                          <tr className="bg-muted/30">
                            <td className="px-2 py-1 font-medium">Target</td>
                            <td className="px-2 py-1 text-right">{data.targetMultiplier}x</td>
                          </tr>
                          <tr>
                            <td className="px-2 py-1 font-medium">Expected Value</td>
                            <td className="px-2 py-1 text-right">{formatNumber(data.expectedValue)}%</td>
                          </tr>
                          <tr className="bg-muted/30">
                            <td className="px-2 py-1 font-medium">Sharpe Ratio</td>
                            <td className="px-2 py-1 text-right">{formatNumber(data.sharpeRatio)}</td>
                          </tr>
                          <tr>
                            <td className="px-2 py-1 font-medium">Win Rate</td>
                            <td className="px-2 py-1 text-right">{formatNumber(data.winRate)}%</td>
                          </tr>
                          <tr className="bg-muted/30">
                            <td className="px-2 py-1 font-medium">Max Drawdown</td>
                            <td className="px-2 py-1 text-right">{formatNumber(data.maxDrawdown)}%</td>
                          </tr>
                          <tr>
                            <td className="px-2 py-1 font-medium">Risk (Std Dev)</td>
                            <td className="px-2 py-1 text-right">{formatNumber(data.risk)}%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            }}
          />
          <ReferenceLine y={0} stroke="#666" strokeDasharray="3 3" />
          
          <Scatter name="Strategies" data={sortedData} fill="#8884d8">
            {sortedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={getPointColor(entry.sharpeRatio)}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}