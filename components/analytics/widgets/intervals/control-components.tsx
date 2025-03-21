'use client';

import type * as React from 'react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExportButton } from '@/components/export-button';
import { INTERVAL_OPTIONS } from '@/utils/export-utils/types';
import type { IntervalDuration } from '@/utils/export-utils/types';
import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';

export interface IntervalsControlsProps {
	value: number;
	inputValue: string;
	hours: number;
	hoursInputValue: string;
	selectedInterval: IntervalDuration;
	onValueInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onHoursInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	applyValueChange: () => void;
	applyHoursChange: () => void;
	handleKeyDown: (
		e: React.KeyboardEvent<HTMLInputElement>,
		applyFn: () => void
	) => void;
	onIntervalChange: (value: string) => void;
	getExcelConfig: () => Promise<ExcelExportConfig>;
	getChartConfig: () => Promise<HtmlChartConfig>;
}

export function IntervalsControls({
	inputValue,
	hoursInputValue,
	selectedInterval,
	onValueInputChange,
	onHoursInputChange,
	applyValueChange,
	applyHoursChange,
	handleKeyDown,
	onIntervalChange,
	getExcelConfig,
	getChartConfig,
}: IntervalsControlsProps) {
	return (
		<div className="flex flex-col sm:flex-row mb-4 gap-4 justify-between">
			<div className="flex items-center gap-2">
				<span className="text-sm font-medium">Crash Point</span>
				<div className="flex items-center">
					<Input
						id="value-input"
						type="number"
						value={inputValue}
						onChange={onValueInputChange}
						onBlur={applyValueChange}
						onKeyDown={(e) => handleKeyDown(e, applyValueChange)}
						className="w-20 h-8 text-center [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
						min="1"
						step="0.1"
					/>
				</div>
			</div>

			<div className="flex items-center gap-3">
				<div className="flex items-center gap-2">
					<span className="text-sm font-medium whitespace-nowrap">
						Hours
					</span>
					<div className="flex items-center">
						<Input
							id="hours-input"
							type="number"
							value={hoursInputValue}
							onChange={onHoursInputChange}
							onBlur={applyHoursChange}
							onKeyDown={(e) =>
								handleKeyDown(e, applyHoursChange)
							}
							className="w-16 h-8 text-center [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
							min="1"
							max="72"
						/>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<span className="text-sm font-medium whitespace-nowrap">
						Interval
					</span>
					<Tabs
						value={selectedInterval.toString()}
						onValueChange={onIntervalChange}
					>
						<TabsList className="grid w-[180px] grid-cols-3 bg-muted/50 p-0.5">
							{INTERVAL_OPTIONS.map((duration) => (
								<TabsTrigger
									key={duration}
									value={duration.toString()}
									className="data-[state=active]:bg-black data-[state=active]:text-white"
								>
									{duration}m
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
				</div>

				{/* Export Button */}
				<ExportButton
					getExcelConfig={getExcelConfig}
					getChartConfig={getChartConfig}
					className="h-8 w-8"
				/>
			</div>
		</div>
	);
}
