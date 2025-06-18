'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import type { FearGreedIndex as FearGreedIndexType } from './types';
import { getFearGreedColor } from './utils';

interface FearGreedIndexProps {
  data: FearGreedIndexType;
}

export function FearGreedIndex({ data }: FearGreedIndexProps) {
  const formatFearGreedData = () => {
    return [
      {
        name: 'Fear & Greed',
        value: data.index,
        fill: getFearGreedColor(data.index),
      },
    ];
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <p
              className="text-4xl font-bold"
              style={{
                color: getFearGreedColor(data.index),
              }}
            >
              {Math.round(data.index)}
            </p>
            <p className="text-lg font-medium mt-1">
              {data.sentiment}
            </p>
          </div>
          <div className="h-32 w-32">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="100%"
                  data={formatFearGreedData()}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    angleAxisId={0}
                    tick={false}
                  />
                  <RadialBar
                    dataKey="value"
                    cornerRadius={10}
                    fill={getFearGreedColor(data.index)}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Performance</span>
            <span>{data.components.performance.toFixed(2)}</span>
          </div>
          <Progress value={data.components.performance} className="h-2" />

          <div className="flex justify-between text-sm">
            <span>Volatility (inverted)</span>
            <span>{data.components.volatility.toFixed(2)}</span>
          </div>
          <Progress value={data.components.volatility} className="h-2" />

          <div className="flex justify-between text-sm">
            <span>High Multipliers</span>
            <span>{data.components.high_multipliers.toFixed(2)}</span>
          </div>
          <Progress value={data.components.high_multipliers} className="h-2" />

          <div className="flex justify-between text-sm">
            <span>Bust Frequency (inverted)</span>
            <span>{data.components.bust_frequency.toFixed(2)}</span>
          </div>
          <Progress value={data.components.bust_frequency} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}