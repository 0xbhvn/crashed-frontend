'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getRandomnessColor } from './utils';
import type { PatternAnalysisData } from './types';

interface SummaryCardsProps {
  data: PatternAnalysisData;
}

export function SummaryCards({ data }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Randomness Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <span className={getRandomnessColor(data.summary.randomness_score)}>
              {data.summary.randomness_score.toFixed(2)}%
            </span>
          </div>
          <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
            {data.randomness_metrics.interpretation.split(' - ').map((part, index) => (
              <p key={index} className="capitalize">
                {part}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Anomalies Detected</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.summary.total_anomalies}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {data.summary.anomaly_rate.toFixed(2)}% of games
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Dominant Pattern</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-base font-medium">
            {data.summary.dominant_pattern}
          </div>
          <p className="text-xs text-muted-foreground mt-1 capitalize">
            {data.patterns.trend.direction} trend
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Entropy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.randomness_metrics.entropy.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Ratio: {(data.randomness_metrics.entropy_ratio * 100).toFixed(2)}%
          </p>
        </CardContent>
      </Card>
    </div>
  );
}