'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { DollarSign, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MarketState } from './types';
import { getRiskLevelColor, getOpportunityScoreBadgeColor } from './utils';

interface MarketStateAnalysisProps {
  data: MarketState;
  recommendations: string[];
}

export function MarketStateAnalysis({ data, recommendations }: MarketStateAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Market State Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground">Current States</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {data.states.map((state) => {
                let badgeColor = 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
                let icon = null;
                
                if (state.includes('Risk')) {
                  badgeColor = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
                  icon = <AlertTriangle className="h-3 w-3" />;
                } else if (state.includes('Opportunity')) {
                  badgeColor = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
                  icon = <TrendingUp className="h-3 w-3" />;
                } else if (state.includes('Volatile')) {
                  badgeColor = 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
                } else if (state.includes('Stable')) {
                  badgeColor = 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
                }
                
                return (
                  <Badge
                    key={state}
                    className={cn('px-2.5 py-0.5 font-semibold flex items-center gap-1', badgeColor)}
                  >
                    {icon}
                    {state}
                  </Badge>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Risk Level</Label>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={cn('px-3 py-1 text-base font-semibold', getRiskLevelColor(data.risk_level))}>
                  {data.risk_level}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Opportunity Score</Label>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={cn('px-3 py-1 text-base font-semibold', getOpportunityScoreBadgeColor(data.opportunity_score))}>
                  {data.opportunity_score}/100
                </Badge>
                {data.opportunity_score >= 75 && <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />}
                {data.opportunity_score < 25 && <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />}
              </div>
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground mb-2">Trading Recommendations</Label>
            <div className="space-y-2">
              {recommendations.map((rec, idx) => {
                let bgColor = 'bg-gray-50 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800';
                let iconColor = 'text-gray-600 dark:text-gray-400';
                
                if (rec.toLowerCase().includes('buy') || rec.toLowerCase().includes('favorable')) {
                  bgColor = 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
                  iconColor = 'text-green-600 dark:text-green-400';
                } else if (rec.toLowerCase().includes('caution') || rec.toLowerCase().includes('avoid')) {
                  bgColor = 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
                  iconColor = 'text-yellow-600 dark:text-yellow-400';
                } else if (rec.toLowerCase().includes('risk') || rec.toLowerCase().includes('stop')) {
                  bgColor = 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
                  iconColor = 'text-red-600 dark:text-red-400';
                }
                
                return (
                  <div
                    key={idx}
                    className={cn(
                      'flex items-start gap-3 p-3 rounded-lg border text-sm transition-colors',
                      bgColor
                    )}
                  >
                    <DollarSign className={cn('h-4 w-4 mt-0.5 flex-shrink-0', iconColor)} />
                    <span className="flex-1">{rec}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}