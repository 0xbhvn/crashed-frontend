'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import {
  AlertCircle,
  AlertTriangle,
  Activity,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import type { BustFrequencyIndex, VolatilityRegime, MomentumIndicators } from './types';
import { getMomentumBadgeVariant, formatPercentage, formatMultiplier } from './utils';

interface DetailedIndicatorsProps {
  bustFrequency: BustFrequencyIndex;
  volatilityRegime: VolatilityRegime;
  momentumIndicators: MomentumIndicators;
}

export function DetailedIndicators({
  bustFrequency,
  volatilityRegime,
  momentumIndicators,
}: DetailedIndicatorsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Bust Frequency Index */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Bust Frequency Index
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold">{bustFrequency.index.toFixed(2)}</p>
              <Badge variant={bustFrequency.index > 110 ? 'destructive' : 'default'}>
                {bustFrequency.interpretation.split(' - ')[0]}
              </Badge>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Recent rate:</span>
                <span>{formatPercentage(bustFrequency.recent_bust_rate)}</span>
              </div>
              <div className="flex justify-between">
                <span>Long-term rate:</span>
                <span>{formatPercentage(bustFrequency.long_term_bust_rate)}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {bustFrequency.interpretation}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Volatility Regime */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Volatility Regime
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {volatilityRegime.error ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{volatilityRegime.error}</AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="flex items-baseline justify-between">
                  <p className="text-2xl font-bold">
                    {volatilityRegime.current_volatility.toFixed(2)}
                  </p>
                  <Badge>{volatilityRegime.regime}</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Percentile rank:</span>
                    <span>{formatPercentage(volatilityRegime.percentile_rank)}</span>
                  </div>
                  <Progress value={volatilityRegime.percentile_rank} className="h-2" />
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Vol ratio:</span>
                    <span>{volatilityRegime.volatility_ratio.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average vol:</span>
                    <span>{volatilityRegime.average_volatility.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Momentum Indicators */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            {momentumIndicators.trend === 'bullish' ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : momentumIndicators.trend === 'bearish' ? (
              <TrendingDown className="h-4 w-4 text-red-500" />
            ) : (
              <Activity className="h-4 w-4 text-yellow-500" />
            )}
            Momentum Indicators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {momentumIndicators.error ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{momentumIndicators.error}</AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-2xl font-bold">{momentumIndicators.rsi.toFixed(0)}</p>
                    <p className="text-xs text-muted-foreground">RSI</p>
                  </div>
                  <Badge variant={getMomentumBadgeVariant(momentumIndicators.trend)}>
                    {momentumIndicators.trend.charAt(0).toUpperCase() + momentumIndicators.trend.slice(1)}
                  </Badge>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Momentum score:</span>
                    <span
                      className={
                        momentumIndicators.momentum_score > 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }
                    >
                      {momentumIndicators.momentum_score > 0 ? '+' : ''}
                      {formatPercentage(momentumIndicators.momentum_score)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recent average:</span>
                    <span>{formatMultiplier(momentumIndicators.recent_average)}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {momentumIndicators.interpretation}
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}