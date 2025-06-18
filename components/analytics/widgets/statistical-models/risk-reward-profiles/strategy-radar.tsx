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

  // Calculate averages and ranges for benchmarking and scaling
  const { averages, ranges } = React.useMemo(() => {
    const allStrategies = Object.values(data.strategies);
    
    // Calculate averages
    const avgs = {
      sharpe: allStrategies.reduce((sum, s) => sum + s.risk_metrics.sharpe_ratio, 0) / allStrategies.length,
      winRate: allStrategies.reduce((sum, s) => sum + s.performance.win_rate, 0) / allStrategies.length,
      expectedValue: allStrategies.reduce((sum, s) => sum + s.performance.average_return * 100, 0) / allStrategies.length,
      drawdown: allStrategies.reduce((sum, s) => sum + s.drawdown_analysis.max_drawdown_percent, 0) / allStrategies.length,
      profitFactor: allStrategies.reduce((sum, s) => sum + (s.risk_metrics.profit_factor === Infinity ? 10 : s.risk_metrics.profit_factor), 0) / allStrategies.length,
    };
    
    // Calculate min/max ranges for each metric
    const ranges = {
      sharpe: {
        min: Math.min(...allStrategies.map(s => s.risk_metrics.sharpe_ratio)),
        max: Math.max(...allStrategies.map(s => s.risk_metrics.sharpe_ratio)),
      },
      winRate: {
        min: Math.min(...allStrategies.map(s => s.performance.win_rate)),
        max: Math.max(...allStrategies.map(s => s.performance.win_rate)),
      },
      expectedValue: {
        min: Math.min(...allStrategies.map(s => s.performance.average_return * 100)),
        max: Math.max(...allStrategies.map(s => s.performance.average_return * 100)),
      },
      drawdown: {
        min: Math.min(...allStrategies.map(s => s.drawdown_analysis.max_drawdown_percent)),
        max: Math.max(...allStrategies.map(s => s.drawdown_analysis.max_drawdown_percent)),
      },
      profitFactor: {
        min: Math.min(...allStrategies.map(s => s.risk_metrics.profit_factor === Infinity ? 10 : s.risk_metrics.profit_factor)),
        max: Math.max(...allStrategies.map(s => s.risk_metrics.profit_factor === Infinity ? 10 : s.risk_metrics.profit_factor)),
      },
    };
    
    return { averages: avgs, ranges };
  }, [data]);
  
  // Helper function to normalize values to 0-100 scale
  const normalize = (value: number, min: number, max: number): number => {
    const range = max - min;
    if (range === 0) return 50; // Default to middle if no variation
    return Math.max(0, Math.min(100, ((value - min) / range) * 100));
  };

  return (
    <div className="space-y-4">
      <div className="text-xs text-muted-foreground text-center">
        <p>Charts use relative scaling based on the range of all analyzed strategies.</p>
        <p>Values are normalized from 0 (worst) to 100 (best) for visual comparison.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {displayStrategies.map((strategy) => {
        const strategyData = data.strategies[strategy.strategy];
        if (!strategyData) return null;

        // Create metrics data for radar chart with dynamic relative scaling
        const metrics: MetricData[] = [
          {
            metric: 'Sharpe Ratio',
            value: normalize(strategy.sharpeRatio, ranges.sharpe.min, ranges.sharpe.max),
            benchmark: normalize(averages.sharpe, ranges.sharpe.min, ranges.sharpe.max),
            fullMark: 100,
          },
          {
            metric: 'Win Rate',
            value: normalize(strategy.winRate, ranges.winRate.min, ranges.winRate.max),
            benchmark: normalize(averages.winRate, ranges.winRate.min, ranges.winRate.max),
            fullMark: 100,
          },
          {
            metric: 'Expected Value',
            value: normalize(strategy.expectedValue, ranges.expectedValue.min, ranges.expectedValue.max),
            benchmark: normalize(averages.expectedValue, ranges.expectedValue.min, ranges.expectedValue.max),
            fullMark: 100,
          },
          {
            metric: 'Risk Control',
            // Invert drawdown since lower is better
            value: normalize(ranges.drawdown.max - strategy.maxDrawdown, 0, ranges.drawdown.max - ranges.drawdown.min),
            benchmark: normalize(ranges.drawdown.max - averages.drawdown, 0, ranges.drawdown.max - ranges.drawdown.min),
            fullMark: 100,
          },
          {
            metric: 'Profit Factor',
            value: normalize(strategy.profitFactor, ranges.profitFactor.min, ranges.profitFactor.max),
            benchmark: normalize(averages.profitFactor, ranges.profitFactor.min, ranges.profitFactor.max),
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
                      
                      // Get range info for display
                      let rangeInfo = '';
                      switch (data.metric) {
                        case 'Sharpe Ratio':
                          rangeInfo = `Range: ${formatNumber(ranges.sharpe.min)} to ${formatNumber(ranges.sharpe.max)}`;
                          break;
                        case 'Win Rate':
                          rangeInfo = `Range: ${formatNumber(ranges.winRate.min)}% to ${formatNumber(ranges.winRate.max)}%`;
                          break;
                        case 'Expected Value':
                          rangeInfo = `Range: ${formatNumber(ranges.expectedValue.min)}% to ${formatNumber(ranges.expectedValue.max)}%`;
                          break;
                        case 'Risk Control':
                          rangeInfo = `Drawdown range: ${formatNumber(ranges.drawdown.min)}% to ${formatNumber(ranges.drawdown.max)}%`;
                          break;
                        case 'Profit Factor':
                          rangeInfo = `Range: ${formatNumber(ranges.profitFactor.min)} to ${formatNumber(ranges.profitFactor.max)}`;
                          break;
                      }
                      
                      return (
                        <div className="border-border/50 bg-background rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
                          <div className="p-2 space-y-1">
                            <p className="font-medium">{data.metric}</p>
                            <p className="text-sm">{actualValue}</p>
                            <p className="text-xs text-muted-foreground">{rangeInfo}</p>
                            <p className="text-xs text-muted-foreground">Scaled: {formatNumber(data.value)}%</p>
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
    </div>
  );
}