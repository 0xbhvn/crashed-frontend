'use client';

import * as React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from '@/components/ui/chart';
import { formatNumber } from './utils';
import type { RiskRewardData, RiskRewardChartData } from './types';

interface StrategyRadarProps {
  data: RiskRewardData;
  strategies: RiskRewardChartData[];
}

const chartConfig = {
  strategy: {
    label: 'Strategy',
    color: 'hsl(var(--primary))',
  },
  average: {
    label: 'Average',
    color: 'hsl(var(--muted-foreground))',
  },
} satisfies ChartConfig;

interface MetricData {
  metric: string;
  value: number;
  benchmark: number;
  fullMark: 100;
}

export function StrategyRadar({ data, strategies }: StrategyRadarProps) {
  // Show all selected strategies instead of limiting to top 4
  const displayStrategies = strategies;

  // Calculate averages for benchmarking
  const averages = React.useMemo(() => {
    const allStrategies = Object.values(data.strategies);
    return {
      sharpe: allStrategies.reduce((sum, s) => sum + s.risk_metrics.sharpe_ratio, 0) / allStrategies.length,
      winRate: allStrategies.reduce((sum, s) => sum + s.performance.win_rate, 0) / allStrategies.length,
      expectedValue: allStrategies.reduce((sum, s) => sum + s.performance.average_return * 100, 0) / allStrategies.length,
      drawdown: allStrategies.reduce((sum, s) => sum + s.drawdown_analysis.max_drawdown_percent, 0) / allStrategies.length,
      profitFactor: allStrategies.reduce((sum, s) => sum + (s.risk_metrics.profit_factor === Infinity ? 10 : s.risk_metrics.profit_factor), 0) / allStrategies.length,
    };
  }, [data]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {displayStrategies.map((strategy) => {
        const strategyData = data.strategies[strategy.strategy];
        if (!strategyData) return null;

        // Create metrics data for radar chart with different scales for each metric
        const metrics: MetricData[] = [
          {
            metric: 'Sharpe Ratio',
            value: Math.min(Math.max(0, ((strategy.sharpeRatio - 0.01) / (0.03 - 0.01)) * 100), 100),
            benchmark: Math.min(Math.max(0, ((averages.sharpe - 0.01) / (0.03 - 0.01)) * 100), 100),
            fullMark: 100,
          },
          {
            metric: 'Win Rate',
            value: Math.min(Math.max(0, strategy.winRate * 2), 100), // Scale 0-50% to 0-100%
            benchmark: Math.min(Math.max(0, averages.winRate * 2), 100),
            fullMark: 100,
          },
          {
            metric: 'Expected Value',
            value: Math.min(Math.max(0, ((strategy.expectedValue - 0.5) / (6.5 - 0.5)) * 100), 100),
            benchmark: Math.min(Math.max(0, ((averages.expectedValue - 0.5) / (6.5 - 0.5)) * 100), 100),
            fullMark: 100,
          },
          {
            metric: 'Risk Control',
            value: Math.min(Math.max(0, (((100 - strategy.maxDrawdown) / 100 - 0.4) / (0.92 - 0.4)) * 100), 100),
            benchmark: Math.min(Math.max(0, (((100 - averages.drawdown) / 100 - 0.4) / (0.92 - 0.4)) * 100), 100),
            fullMark: 100,
          },
          {
            metric: 'Profit Factor',
            value: Math.min(Math.max(0, ((strategy.profitFactor - 1.02) / (1.08 - 1.02)) * 100), 100),
            benchmark: Math.min(Math.max(0, ((averages.profitFactor - 1.02) / (1.08 - 1.02)) * 100), 100),
            fullMark: 100,
          },
        ];

        return (
          <div key={strategy.strategy} className="space-y-2">
            <h4 className="text-center font-semibold">{strategy.strategy}</h4>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={metrics}>
                  <PolarGrid strokeDasharray="3 3" />
                  <PolarAngleAxis 
                    dataKey="metric" 
                    tick={{ fontSize: 12 }}
                    className="text-xs"
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]}
                    tick={{ fontSize: 10 }}
                  />
                  <ChartTooltip
                    content={(props) => {
                      if (!props.active || !props.payload?.length) return null;
                      const data = props.payload[0].payload as MetricData;
                      
                      // Get actual values for display
                      let actualValue = '';
                      switch (data.metric) {
                        case 'Sharpe Ratio':
                          actualValue = formatNumber(strategy.sharpeRatio);
                          break;
                        case 'Win Rate':
                          actualValue = `${formatNumber(strategy.winRate)}%`;
                          break;
                        case 'Expected Value':
                          actualValue = `${formatNumber(strategy.expectedValue)}%`;
                          break;
                        case 'Risk Control':
                          actualValue = `${formatNumber(strategy.maxDrawdown)}% drawdown`;
                          break;
                        case 'Profit Factor':
                          actualValue = strategy.profitFactor === 10 ? '∞' : formatNumber(strategy.profitFactor);
                          break;
                      }
                      
                      return (
                        <div className="border-border/50 bg-background rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
                          <div className="p-2">
                            <p className="font-medium">{data.metric}</p>
                            <p className="text-sm mt-1">{actualValue}</p>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Radar
                    name="Strategy"
                    dataKey="value"
                    stroke="hsl(142, 70%, 50%)"
                    fill="hsl(142, 70%, 50%)"
                    fillOpacity={0.5}
                  />
                  <Radar
                    name="Average"
                    dataKey="benchmark"
                    stroke="hsl(48, 95%, 50%)"
                    fill="hsl(48, 95%, 50%)"
                    fillOpacity={0.2}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="line"
                    wrapperStyle={{ fontSize: '12px' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        );
      })}
    </div>
  );
}