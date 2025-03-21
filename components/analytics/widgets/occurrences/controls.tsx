'use client';

import * as React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GitCompareIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { ExportButton } from '@/components/export-button';
import type { OccurrencesControlsProps } from './types';

export function Controls({
	selectedType,
	setSelectedType,
	analyzeBy,
	setAnalyzeBy,
	limitInput,
	hoursInput,
	showComparison,
	setShowComparison,
	handleLimitInputChange,
	handleHoursInputChange,
	applyLimitChange,
	applyHoursChange,
	handleKeyDown,
	getExcelConfig,
	getChartConfig,
}: OccurrencesControlsProps) {
	return (
		<div className="flex justify-between items-center mb-4">
			<div className="flex items-center gap-3">
				<Tabs
					defaultValue="current"
					value={selectedType}
					onValueChange={(value) =>
						setSelectedType(value as 'current' | 'unique')
					}
				>
					<TabsList className="grid w-[240px] grid-cols-2 bg-muted/50 p-0.5">
						<TabsTrigger
							value="current"
							className="data-[state=active]:bg-black data-[state=active]:text-white"
						>
							Above Value
						</TabsTrigger>
						<TabsTrigger
							value="unique"
							className="data-[state=active]:bg-black data-[state=active]:text-white"
						>
							Exact Value
						</TabsTrigger>
					</TabsList>
				</Tabs>

				{/* Comparison Toggle */}
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<div className="flex items-center border border-border rounded-md h-8 px-2">
								<Button
									variant="ghost"
									size="icon"
									onClick={() =>
										setShowComparison(!showComparison)
									}
									className="h-6 w-6 p-0"
								>
									<GitCompareIcon
										className={cn(
											'h-4 w-4',
											showComparison
												? 'text-foreground'
												: 'text-muted-foreground'
										)}
									/>
								</Button>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>
								Comparison Mode: {showComparison ? 'ON' : 'OFF'}
							</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>

			<div className="flex items-center gap-3">
				{analyzeBy === 'games' ? (
					<Input
						id="limit"
						type="number"
						className="w-24 h-8 text-sm [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
						value={limitInput}
						onChange={handleLimitInputChange}
						onBlur={applyLimitChange}
						onKeyDown={(e) => handleKeyDown(e, applyLimitChange)}
					/>
				) : (
					<Input
						id="hours"
						type="number"
						className="w-24 h-8 text-sm [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
						value={hoursInput}
						onChange={handleHoursInputChange}
						onBlur={applyHoursChange}
						onKeyDown={(e) => handleKeyDown(e, applyHoursChange)}
					/>
				)}

				<Tabs
					defaultValue="games"
					value={analyzeBy}
					onValueChange={(value) =>
						setAnalyzeBy(value as 'games' | 'time')
					}
				>
					<TabsList className="grid w-[240px] grid-cols-2 bg-muted/50 p-0.5">
						<TabsTrigger
							value="games"
							className="data-[state=active]:bg-black data-[state=active]:text-white"
						>
							Games
						</TabsTrigger>
						<TabsTrigger
							value="time"
							className="data-[state=active]:bg-black data-[state=active]:text-white"
						>
							Hours
						</TabsTrigger>
					</TabsList>
				</Tabs>

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
