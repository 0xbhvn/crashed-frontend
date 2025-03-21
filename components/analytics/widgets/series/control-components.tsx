'use client';

import type * as React from 'react';
import { ArrowDownWideNarrow, Clock, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { ExportButton } from '@/components/export-button';

import type { ExportConfig } from '@/utils/export-utils';
import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';

export interface SeriesControlsProps {
	value: number;
	inputValue: string;
	analyzeBy: 'games' | 'time';
	limit: number;
	limitInput: string;
	hours: number;
	hoursInput: string;
	sortBy: 'time' | 'length';
	isLoading: boolean;
	showCircles: boolean;
	onValueInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onLimitInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onHoursInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	applyValueChange: () => void;
	applyLimitChange: () => void;
	applyHoursChange: () => void;
	handleKeyDown: (
		e: React.KeyboardEvent<HTMLInputElement>,
		applyFn: () => void
	) => void;
	toggleSortMode: () => void;
	toggleCirclesVisibility: () => void;
	handleTabChange: (value: string) => void;
	getExcelConfig: () => Promise<ExcelExportConfig>;
	getChartConfig: () => Promise<HtmlChartConfig>;
	currentConfig: ExportConfig;
}

export function SeriesControls({
	inputValue,
	analyzeBy,
	limitInput,
	hoursInput,
	sortBy,
	isLoading,
	showCircles,
	onValueInputChange,
	onLimitInputChange,
	onHoursInputChange,
	applyValueChange,
	applyLimitChange,
	applyHoursChange,
	handleKeyDown,
	toggleSortMode,
	toggleCirclesVisibility,
	handleTabChange,
	getExcelConfig,
	getChartConfig,
}: SeriesControlsProps) {
	return (
		<div className="flex justify-between items-center mb-4">
			<div className="flex items-center gap-3">
				<div className="flex items-center text-sm text-muted-foreground">
					<span className="mr-2">Crash Point</span>
					<div className="w-16">
						<Input
							type="number"
							value={inputValue}
							onChange={onValueInputChange}
							onBlur={applyValueChange}
							onKeyDown={(e) =>
								handleKeyDown(e, applyValueChange)
							}
							min="1"
							step="0.1"
							aria-label="Crash point value"
							className="text-center h-7 px-2 py-1 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
						/>
					</div>
				</div>

				{/* Combined controls box for sort by and follow circles */}
				<TooltipProvider>
					<div className="flex items-center border border-border rounded-md h-8 px-2 gap-2">
						{/* Sort by toggle */}
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									onClick={toggleSortMode}
									className="h-6 w-6 p-0"
								>
									{sortBy === 'time' ? (
										<Clock className="h-4 w-4 text-muted-foreground" />
									) : (
										<ArrowDownWideNarrow className="h-4 w-4 text-muted-foreground" />
									)}
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>
									Sort By:{' '}
									{sortBy === 'time' ? 'Time' : 'Length'}
								</p>
							</TooltipContent>
						</Tooltip>

						{/* Follow circles toggle */}
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									onClick={toggleCirclesVisibility}
									className="h-6 w-6 p-0"
								>
									{showCircles ? (
										<Eye className="h-4 w-4 text-muted-foreground" />
									) : (
										<EyeOff className="h-4 w-4 text-muted-foreground" />
									)}
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>
									Follow Circles: {showCircles ? 'ON' : 'OFF'}
								</p>
							</TooltipContent>
						</Tooltip>
					</div>
				</TooltipProvider>

				{/* Excel Export Button using the new generic component */}
				<ExportButton
					getExcelConfig={getExcelConfig}
					getChartConfig={getChartConfig}
				/>
			</div>

			<div className="flex items-center gap-3">
				{analyzeBy === 'games' ? (
					<Input
						id="limit"
						type="number"
						className="w-24 h-8 text-sm [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
						value={limitInput}
						onChange={onLimitInputChange}
						onBlur={applyLimitChange}
						onKeyDown={(e) => handleKeyDown(e, applyLimitChange)}
					/>
				) : (
					<Input
						id="hours"
						type="number"
						className="w-24 h-8 text-sm [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
						value={hoursInput}
						onChange={onHoursInputChange}
						onBlur={applyHoursChange}
						onKeyDown={(e) => handleKeyDown(e, applyHoursChange)}
					/>
				)}

				<Tabs
					defaultValue="games"
					value={analyzeBy}
					onValueChange={handleTabChange}
				>
					<TabsList className="grid w-[240px] grid-cols-2 bg-muted/50 p-0.5">
						<TabsTrigger
							value="games"
							className="data-[state=active]:bg-black data-[state=active]:text-white"
							disabled={isLoading && analyzeBy === 'time'}
						>
							Games
						</TabsTrigger>
						<TabsTrigger
							value="time"
							className="data-[state=active]:bg-black data-[state=active]:text-white"
							disabled={isLoading && analyzeBy === 'games'}
						>
							Hours
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>
		</div>
	);
}
