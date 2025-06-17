'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Dices } from 'lucide-react';
import { ExportButton } from '@/components/export-button';
import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';

interface PatternAnalysisControlsProps {
	limitInput: string;
	thresholdInput: string;
	onLimitInputChange: (value: string) => void;
	onThresholdInputChange: (value: string) => void;
	applyLimitChange: () => void;
	applyThresholdChange: () => void;
	getExcelConfig: () => Promise<ExcelExportConfig>;
	getChartConfig: () => Promise<HtmlChartConfig>;
}

export function PatternAnalysisControls({
	limitInput,
	thresholdInput,
	onLimitInputChange,
	onThresholdInputChange,
	applyLimitChange,
	applyThresholdChange,
	getExcelConfig,
	getChartConfig,
}: PatternAnalysisControlsProps) {
	const handleLimitKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			applyLimitChange();
		}
	};

	const handleThresholdKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			applyThresholdChange();
		}
	};

	return (
		<div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
			{/* Anomaly Threshold */}
			<div className="flex items-center gap-2">
				<span className="text-sm font-medium">Z-Score</span>
				<Input
					type="number"
					value={thresholdInput}
					onChange={(e) => onThresholdInputChange(e.target.value)}
					onBlur={applyThresholdChange}
					onKeyDown={handleThresholdKeyDown}
					placeholder="3.0"
					className="w-20 h-8 text-center [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
					min="0.1"
					max="10"
					step="0.1"
				/>
			</div>

			<div className="flex-1" />

			{/* Games to Analyze */}
			<div className="flex items-center gap-2">
				<Input
					type="number"
					value={limitInput}
					onChange={(e) => onLimitInputChange(e.target.value)}
					onBlur={applyLimitChange}
					onKeyDown={handleLimitKeyDown}
					placeholder="1000"
					className="w-24 h-8 text-center [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
					min="1"
					max="10000"
				/>
				<Dices className="h-4 w-4 text-muted-foreground" />
			</div>

			{/* Export Button */}
			<ExportButton
				getExcelConfig={getExcelConfig}
				getChartConfig={getChartConfig}
			/>
		</div>
	);
}
