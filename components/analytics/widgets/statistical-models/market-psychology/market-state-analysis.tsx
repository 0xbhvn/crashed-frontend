'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Gauge, DollarSign } from 'lucide-react';
import type { MarketState } from './types';
import { getRiskLevelColor, getOpportunityScoreColor } from './utils';

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
              {data.states.map((state) => (
                <Badge
                  key={state}
                  variant={state.includes('Risk') ? 'destructive' : 'default'}
                >
                  {state}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Risk Level</Label>
              <p className={`text-lg font-semibold ${getRiskLevelColor(data.risk_level)}`}>
                {data.risk_level}
              </p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Opportunity Score</Label>
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold">{data.opportunity_score}/100</p>
                <Gauge className={`h-4 w-4 ${getOpportunityScoreColor(data.opportunity_score)}`} />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground mb-2">Trading Recommendations</Label>
            <div className="space-y-2">
              {recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2 bg-muted rounded text-sm"
                >
                  <DollarSign className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}