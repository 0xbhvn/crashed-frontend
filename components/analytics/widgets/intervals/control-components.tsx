'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExportButton } from '@/components/export-button';
import { INTERVAL_OPTIONS } from '@/utils/export-utils/types';
import type { IntervalDuration } from '@/utils/export-utils/types';
import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';
import { DateRangeExport } from './export-date-range';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { DownloadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
	value,
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
	// State for the export menu popover
	const [isHovering, setIsHovering] = React.useState(false);
	const [isOpen, setIsOpen] = React.useState(false);
	const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

	// Handle mouse enter on the export button
	const handleMouseEnter = () => {
		setIsHovering(true);
		// Set a timeout to open the popover after 1 second
		hoverTimeoutRef.current = setTimeout(() => {
			setIsOpen(true);
		}, 1000);
	};

	// Handle mouse leave on the export button
	const handleMouseLeave = () => {
		setIsHovering(false);
		// Clear the timeout if the user moves the mouse away before 1 second
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
			hoverTimeoutRef.current = null;
		}
	};

	// Clean up the timeout on unmount
	React.useEffect(() => {
		return () => {
			if (hoverTimeoutRef.current) {
				clearTimeout(hoverTimeoutRef.current);
			}
		};
	}, []);

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

				<div className="flex items-center gap-2">
					{/* Export Popover with options */}
					<Popover
						open={isOpen}
						onOpenChange={setIsOpen}
					>
						<PopoverTrigger asChild>
							<div
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
								className="relative"
							>
								<ExportButton
									getExcelConfig={getExcelConfig}
									getChartConfig={getChartConfig}
									className="h-8 w-8"
								/>
								{isHovering && !isOpen && (
									<div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 text-xs px-2 py-1 bg-background border rounded shadow-sm whitespace-nowrap">
										Hold for export options
									</div>
								)}
							</div>
						</PopoverTrigger>
						<PopoverContent
							className="p-0 w-52"
							align="end"
						>
							<div className="flex flex-col py-1">
								<Button
									variant="ghost"
									size="sm"
									className="justify-start rounded-none text-sm font-normal h-9 px-3 hover:bg-muted/50"
									onClick={async () => {
										setIsOpen(false);
										try {
											const excelConfig =
												await getExcelConfig();
											const { exportToExcel } =
												await import(
													'@/utils/export-utils/excel'
												);
											await exportToExcel(excelConfig);

											if (getChartConfig) {
												const chartConfig =
													await getChartConfig();
												const { generateChartHtml } =
													await import(
														'@/utils/export-utils/chart-html'
													);
												generateChartHtml(chartConfig);
											}
										} catch (err) {
											console.error(
												'Export failed:',
												err
											);
										}
									}}
								>
									<DownloadIcon className="mr-2 h-4 w-4" />
									Export Current View
								</Button>
								<DateRangeExport
									value={value}
									onOpenChange={(open) => {
										if (!open) setIsOpen(false);
									}}
								/>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</div>
	);
}
