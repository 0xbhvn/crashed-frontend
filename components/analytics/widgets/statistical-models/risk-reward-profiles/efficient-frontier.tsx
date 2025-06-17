'use client';

import * as React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from '@/components/ui/chart';
import { formatNumber } from './utils';
import type { RiskRewardChartData } from './types';

interface EfficientFrontierProps {
  data: RiskRewardChartData[];
}

const chartConfig = {
  sharpeRatio: {
    label: 'Sharpe Ratio',
    color: 'hsl(var(--chart-1))',
  },
  trend: {
    label: 'Trend',
    color: 'hsl(var(--muted-foreground))',
  },
} satisfies ChartConfig;

export function EfficientFrontier({ data }: EfficientFrontierProps) {
  // Calculate color for each bar based on Sharpe ratio
  const getBarColor = (sharpeRatio: number) => {
    if (sharpeRatio > 1) return 'hsl(142, 90%, 40%)'; // Green
    if (sharpeRatio > 0.5) return 'hsl(48, 95%, 50%)'; // Yellow
    return 'hsl(0, 90%, 45%)'; // Red
  };

  // Calculate trend line using polynomial regression for smooth curve
  const trendData = React.useMemo(() => {
    if (data.length < 2) return data;

    // For each data point, calculate a smoothed value based on neighbors
    return data.map((point, index) => {
      // Use a simple moving average for smoothing
      const windowSize = 2;
      const start = Math.max(0, index - windowSize);
      const end = Math.min(data.length - 1, index + windowSize);
      
      let sum = 0;
      let count = 0;
      
      for (let i = start; i <= end; i++) {
        sum += data[i].sharpeRatio;
        count++;
      }
      
      return {
        ...point,
        trendValue: count > 0 ? sum / count : point.sharpeRatio,
      };
    });
  }, [data]);

  return (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={trendData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="strategy" 
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            label={{
              value: 'Sharpe Ratio',
              angle: -90,
              position: 'insideLeft',
            }}
            tickFormatter={(value) => formatNumber(value)}
          />
          <ChartTooltip
            content={(props) => {
              if (!props.active || !props.payload?.length) return null;
              const data = props.payload[0].payload as RiskRewardChartData & { trendValue?: number };
              
              return (
                <div className="border-border/50 bg-background rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
                  <div className="p-2 space-y-1">
                    <p className="text-sm font-medium">{data.strategy}</p>
                    <div className="rounded overflow-hidden border border-border/30 mt-2">
                      <table className="w-full">
                        <tbody>
                          <tr className="bg-muted/30">
                            <td className="px-2 py-1 font-medium">Sharpe Ratio</td>
                            <td className="px-2 py-1 text-right font-medium">{formatNumber(data.sharpeRatio)}</td>
                          </tr>
                          {data.trendValue && (
                            <tr>
                              <td className="px-2 py-1 font-medium">Trend</td>
                              <td className="px-2 py-1 text-right">{formatNumber(data.trendValue)}</td>
                            </tr>
                          )}
                          <tr className="bg-muted/30">
                            <td className="px-2 py-1 font-medium">Win Rate</td>
                            <td className="px-2 py-1 text-right">{formatNumber(data.winRate)}%</td>
                          </tr>
                          <tr>
                            <td className="px-2 py-1 font-medium">Expected Value</td>
                            <td className="px-2 py-1 text-right">{formatNumber(data.expectedValue)}%</td>
                          </tr>
                          <tr className="bg-muted/30">
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
          
          {/* Bars for Sharpe Ratio */}
          <Bar dataKey="sharpeRatio" fill="hsl(var(--chart-1))">
            {trendData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.sharpeRatio)} />
            ))}
          </Bar>
          
          {/* Trend line */}
          <Line
            dataKey="trendValue"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            opacity={0.7}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}