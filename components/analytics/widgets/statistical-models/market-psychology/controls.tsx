'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Dices } from 'lucide-react';
import { ExportButton } from '@/components/export-button';
import type { MarketPsychologyControlsProps } from './types';

export function MarketPsychologyControls({
  limitInput,
  shortWindowInput,
  longWindowInput,
  onLimitChange,
  onLimitApply,
  onShortWindowChange,
  onLongWindowChange,
  onWindowApply,
  getExcelConfig,
  getChartConfig,
}: MarketPsychologyControlsProps) {
  const handleLimitKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onLimitApply();
    }
  };

  const handleWindowKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onWindowApply();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
      {/* Window Sizes */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Window Sizes</span>
        <Input
          type="number"
          value={shortWindowInput}
          onChange={(e) => onShortWindowChange(e.target.value)}
          onBlur={onWindowApply}
          onKeyDown={handleWindowKeyDown}
          placeholder="50"
          className="w-20 h-8 text-center [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="text-sm text-muted-foreground">/</span>
        <Input
          type="number"
          value={longWindowInput}
          onChange={(e) => onLongWindowChange(e.target.value)}
          onBlur={onWindowApply}
          onKeyDown={handleWindowKeyDown}
          placeholder="200"
          className="w-20 h-8 text-center [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>

      <div className="flex-1" />

      {/* Games Input */}
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={limitInput}
          onChange={(e) => onLimitChange(e.target.value)}
          onBlur={onLimitApply}
          onKeyDown={handleLimitKeyDown}
          placeholder="2000"
          className="w-24 h-8 text-center [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <Dices className="h-4 w-4 text-muted-foreground" />
      </div>

      <ExportButton
        getExcelConfig={getExcelConfig}
        getChartConfig={getChartConfig}
        className="h-8 w-8"
      />
    </div>
  );
}