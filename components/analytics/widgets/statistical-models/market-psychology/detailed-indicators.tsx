'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertCircle,
  AlertTriangle,
  Activity,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import type { BustFrequencyIndex, VolatilityRegime, MomentumIndicators } from './types';
import { cn } from '@/lib/utils';
import { getMomentumBadgeColor, getBustFrequencyBadgeColor, getVolatilityRegimeBadgeColor, formatPercentage, formatMultiplier } from './utils';

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
              <Badge className={cn('px-3 py-1 text-base font-semibold', getBustFrequencyBadgeColor(bustFrequency.index))}>
                {bustFrequency.interpretation.split(' - ')[0].replace(/bust frequency/i, '').trim()}
              </Badge>
            </div>
            <div className="mt-3">
              <table className="w-full text-xs">
                <tbody>
                  <tr className="border-b">
                    <td className="py-1.5 text-muted-foreground">Recent rate</td>
                    <td className="py-1.5 text-right font-medium">{formatPercentage(bustFrequency.recent_bust_rate)}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-muted-foreground">Long-term rate</td>
                    <td className="py-1.5 text-right font-medium">{formatPercentage(bustFrequency.long_term_bust_rate)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
                  <Badge className={cn('px-3 py-1 text-base font-semibold', getVolatilityRegimeBadgeColor(volatilityRegime.regime))}>
                    {volatilityRegime.regime.replace(/\s*volatility\s*regime\s*/i, '').replace(/\s*volatility\s*/i, '').trim()}
                  </Badge>
                </div>
                <div className="mt-3">
                  <table className="w-full text-xs">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-1.5 text-muted-foreground">Percentile rank</td>
                        <td className="py-1.5 text-right">
                          <Badge className={cn(
                            'px-2 py-0.5 text-xs font-medium',
                            volatilityRegime.percentile_rank > 75 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                            volatilityRegime.percentile_rank > 50 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                            volatilityRegime.percentile_rank > 25 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          )}>
                            {formatPercentage(volatilityRegime.percentile_rank)}
                          </Badge>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-1.5 text-muted-foreground">Volatility ratio</td>
                        <td className="py-1.5 text-right">
                          <Badge className={cn(
                            'px-2 py-0.5 text-xs font-medium',
                            volatilityRegime.volatility_ratio > 1.5 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                            volatilityRegime.volatility_ratio > 1 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          )}>
                            {volatilityRegime.volatility_ratio.toFixed(2)}
                          </Badge>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 text-muted-foreground">Average volatility</td>
                        <td className="py-1.5 text-right font-medium">{volatilityRegime.average_volatility.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
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
                  <Badge className={cn('px-3 py-1 text-base font-semibold', getMomentumBadgeColor(momentumIndicators.trend))}>
                    {momentumIndicators.trend.charAt(0).toUpperCase() + momentumIndicators.trend.slice(1)}
                  </Badge>
                </div>
                <div className="mt-3">
                  <table className="w-full text-xs">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-1.5 text-muted-foreground">Momentum score</td>
                        <td className="py-1.5 text-right">
                          <Badge className={cn(
                            'px-2 py-0.5 text-xs font-medium',
                            momentumIndicators.momentum_score > 20 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            momentumIndicators.momentum_score > 0 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                            momentumIndicators.momentum_score > -20 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          )}>
                            {momentumIndicators.momentum_score > 0 ? '+' : ''}
                            {formatPercentage(momentumIndicators.momentum_score)}
                          </Badge>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 text-muted-foreground">Recent average</td>
                        <td className="py-1.5 text-right font-medium">{formatMultiplier(momentumIndicators.recent_average)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}