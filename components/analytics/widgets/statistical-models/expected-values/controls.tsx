'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Dices } from 'lucide-react';
import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';
import { ExportButton } from '@/components/export-button';

interface ExpectedValuesControlsProps {
  targets: number[];
  inputValue: string;
  limitInput: string;
  onInputValueChange: (value: string) => void;
  onLimitInputChange: (value: string) => void;
  handleAddTarget: (value: string) => void;
  handleRemoveTarget: (target: number) => void;
  handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  applyLimitChange: () => void;
  getExcelConfig: () => Promise<ExcelExportConfig>;
  getChartConfig: () => Promise<HtmlChartConfig>;
}

export function ExpectedValuesControls({
  targets,
  inputValue,
  limitInput,
  onInputValueChange,
  onLimitInputChange,
  handleAddTarget,
  handleRemoveTarget,
  handleInputKeyDown,
  applyLimitChange,
  getExcelConfig,
  getChartConfig,
}: ExpectedValuesControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium whitespace-nowrap">Crash Points</span>
        <div className="flex flex-wrap items-center gap-2 min-h-[32px] px-3 py-1 border rounded-md bg-background">
          {targets.map((target) => (
            <Badge
              key={target}
              variant="secondary"
              className="h-6 px-2 gap-1"
            >
              {target}x
              <button
                onClick={() => handleRemoveTarget(target)}
                className="ml-1 hover:text-destructive focus:outline-none"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => onInputValueChange(e.target.value)}
            onKeyDown={handleInputKeyDown}
            onBlur={() => handleAddTarget(inputValue)}
            placeholder=""
            className="border-0 h-6 w-20 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={limitInput}
          onChange={(e) => onLimitInputChange(e.target.value)}
          onBlur={applyLimitChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              applyLimitChange();
            }
          }}
          placeholder="2000"
          className="w-24 h-8 text-center [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          min="1"
          max="10000"
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