'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatNumber, categorizeByRisk } from './utils';
import type { RiskRewardChartData } from './types';

interface RiskCategoriesProps {
  data: RiskRewardChartData[];
}

export function RiskCategories({ data }: RiskCategoriesProps) {
  const categories = categorizeByRisk(data);
  
  return (
    <div className="space-y-6">
      {Object.entries(categories).map(([category, strategies]) => (
        <div key={category} className="border rounded-lg overflow-hidden">
          <div className="bg-muted/50 px-4 py-3 border-b">
            <h4 className="font-semibold flex items-center gap-2">
              {category === 'Low Risk' && (
                <TrendingUp className="h-4 w-4 text-green-500" />
              )}
              {category === 'Medium Risk' && (
                <Minus className="h-4 w-4 text-yellow-500" />
              )}
              {category === 'High Risk' && (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              {category}
            </h4>
          </div>
          
          {strategies.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Strategy</TableHead>
                  <TableHead className="text-right">Expected Value</TableHead>
                  <TableHead className="text-right">Sharpe Ratio</TableHead>
                  <TableHead className="text-right">Win Rate</TableHead>
                  <TableHead className="text-right">Max Drawdown</TableHead>
                  <TableHead className="text-right">Risk (Std Dev)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {strategies.map((strategy) => (
                  <TableRow key={strategy.strategy}>
                    <TableCell className="font-medium">
                      {strategy.strategy}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={strategy.expectedValue > 0 ? 'text-green-600' : 'text-red-600'}>
                        {strategy.expectedValue > 0 ? '+' : ''}
                        {formatNumber(strategy.expectedValue)}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(strategy.sharpeRatio)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(strategy.winRate)}%
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(strategy.maxDrawdown)}%
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(strategy.risk)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-6 text-center">
              <p className="text-sm text-muted-foreground">
                No strategies in this category
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}