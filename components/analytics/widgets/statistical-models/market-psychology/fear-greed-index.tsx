'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import type { FearGreedIndex as FearGreedIndexType } from './types';
import { getFearGreedColor, getFearGreedBadgeColor } from './utils';

interface FearGreedIndexProps {
  data: FearGreedIndexType;
}

export function FearGreedIndex({ data }: FearGreedIndexProps) {
  const RADIAN = Math.PI / 180;
  const cx = 120;
  const cy = 80;
  const iR = 40;
  const oR = 70;

  // Define gauge segments for background
  const gaugeSegments = [
    { value: 25, fill: '#10b981' }, // Extreme Fear (0-25)
    { value: 15, fill: '#84cc16' }, // Fear (25-40)
    { value: 20, fill: '#facc15' }, // Neutral (40-60)
    { value: 15, fill: '#f59e0b' }, // Greed (60-75)
    { value: 25, fill: '#ef4444' }, // Extreme Greed (75-100)
  ];

  const needle = (value: number, cx: number, cy: number, iR: number, oR: number) => {
    const total = 100;
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx;
    const y0 = cy;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return (
      <g>
        <circle cx={x0} cy={y0} r={r} fill="currentColor" className="text-foreground" stroke="none"/>
        <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} fill="currentColor" className="text-foreground" stroke="none"/>
      </g>
    );
  };

  const chartConfig = {
    value: {
      label: 'Index',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Fear & Greed Index</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between mb-4">
          <div className="pb-2">
            <p
              className="text-4xl font-bold"
              style={{
                color: getFearGreedColor(data.index),
              }}
            >
              {Math.round(data.index)}
            </p>
            <Badge className={cn('mt-2 px-2.5 py-0.5 font-semibold', getFearGreedBadgeColor(data.index))}>
              {data.sentiment}
            </Badge>
          </div>
          <div className="h-24 w-52">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <clipPath id="gauge-clip">
                      <rect x="0" y="0" width="300" height="120" />
                    </clipPath>
                  </defs>
                  <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    data={gaugeSegments}
                    cx={cx}
                    cy={cy}
                    innerRadius={iR}
                    outerRadius={oR}
                    stroke="none"
                    clipPath="url(#gauge-clip)"
                  >
                    {gaugeSegments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  {needle(data.index, cx, cy, iR, oR)}
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
        <div className="mt-4">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b">
                <td className="py-2 text-muted-foreground">Performance</td>
                <td className="py-2 text-right">
                  <Badge className={cn(
                    'px-2.5 py-0.5 font-medium',
                    data.components.performance > 60 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                    data.components.performance > 40 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  )}>
                    {data.components.performance.toFixed(2)}%
                  </Badge>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 text-muted-foreground">Volatility (inverted)</td>
                <td className="py-2 text-right">
                  <Badge className={cn(
                    'px-2.5 py-0.5 font-medium',
                    data.components.volatility > 60 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                    data.components.volatility > 40 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  )}>
                    {data.components.volatility.toFixed(2)}%
                  </Badge>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 text-muted-foreground">High Multipliers</td>
                <td className="py-2 text-right">
                  <Badge className={cn(
                    'px-2.5 py-0.5 font-medium',
                    data.components.high_multipliers > 60 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                    data.components.high_multipliers > 40 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  )}>
                    {data.components.high_multipliers.toFixed(2)}%
                  </Badge>
                </td>
              </tr>
              <tr>
                <td className="py-2 text-muted-foreground">Bust Frequency (inverted)</td>
                <td className="py-2 text-right">
                  <Badge className={cn(
                    'px-2.5 py-0.5 font-medium',
                    data.components.bust_frequency > 60 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                    data.components.bust_frequency > 40 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  )}>
                    {data.components.bust_frequency.toFixed(2)}%
                  </Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}