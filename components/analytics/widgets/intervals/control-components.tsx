'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Timer, Dices } from 'lucide-react';
import type {
	TimeIntervalDuration,
	GameIntervalSize,
} from '@/utils/export-utils/types';
import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';
import {
	TIME_INTERVAL_OPTIONS,
	GAME_INTERVAL_OPTIONS,
} from '@/utils/export-utils/types';
import { DateRangeExport } from './export-date-range';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { ExportButton } from '@/components/export-button';

interface IntervalsControlsProps {
	value: number;
	inputValue: string;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	hours: number;
	hoursInputValue: string;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	games: number;
	gamesInputValue: string;
	timeInterval: TimeIntervalDuration;
	gameInterval: GameIntervalSize;
	analyzeBy: 'games' | 'time';
	onValueInputChange: (value: string) => void;
	onHoursInputChange: (value: string) => void;
	onGamesInputChange: (value: string) => void;
	applyValueChange: () => void;
	applyHoursChange: () => void;
	applyGamesChange: () => void;
	handleKeyDown: (e: React.KeyboardEvent) => void;
	onIntervalChange: (value: string) => void;
	onAnalyzeByChange: (value: string) => void;
	getExcelConfig: () => Promise<ExcelExportConfig>;
	getChartConfig: () => Promise<HtmlChartConfig>;
}

export function IntervalsControls({
	value,
	inputValue,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	hours,
	hoursInputValue,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	games,
	gamesInputValue,
	timeInterval,
	gameInterval,
	analyzeBy,
	onValueInputChange,
	onHoursInputChange,
	onGamesInputChange,
	applyValueChange,
	applyHoursChange,
	applyGamesChange,
	handleKeyDown,
	onIntervalChange,
	onAnalyzeByChange,
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
		<div className="flex flex-col sm:flex-row mb-4 gap-4">
			<div className="flex items-center gap-2">
				<span className="text-sm">Crash Point</span>
				<div className="flex items-center">
					<Input
						id="value-input"
						type="number"
						value={inputValue}
						onChange={(e) => onValueInputChange(e.target.value)}
						onBlur={applyValueChange}
						onKeyDown={handleKeyDown}
						className="w-20 h-8 text-center [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
						min="1"
						step="0.1"
					/>
				</div>
			</div>

			<div className="flex items-center gap-3 flex-1">
				<div className="flex-1" />

				<div className="flex items-center gap-2">
					<div className="flex items-center">
						<Input
							id={
								analyzeBy === 'time'
									? 'hours-input'
									: 'games-input'
							}
							type="number"
							value={
								analyzeBy === 'time'
									? hoursInputValue
									: gamesInputValue
							}
							onChange={(e) =>
								analyzeBy === 'time'
									? onHoursInputChange(e.target.value)
									: onGamesInputChange(e.target.value)
							}
							onBlur={
								analyzeBy === 'time'
									? applyHoursChange
									: applyGamesChange
							}
							onKeyDown={handleKeyDown}
							className="w-24 h-8 text-center [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
							min="1"
							max={analyzeBy === 'time' ? '72' : '10000'}
						/>
					</div>

					<Tabs
						value={analyzeBy}
						onValueChange={onAnalyzeByChange}
					>
						<TabsList className="grid w-[100px] grid-cols-2 bg-muted/50 p-0.5">
							<TabsTrigger
								value="games"
								className="data-[state=active]:bg-black data-[state=active]:text-white"
							>
								<Dices className="h-4 w-4" />
							</TabsTrigger>
							<TabsTrigger
								value="time"
								className="data-[state=active]:bg-black data-[state=active]:text-white"
							>
								<Timer className="h-4 w-4" />
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>

				<div className="flex items-center gap-2">
					<span className="text-sm whitespace-nowrap">Interval</span>
					<Tabs
						value={String(
							analyzeBy === 'time' ? timeInterval : gameInterval
						)}
						onValueChange={onIntervalChange}
					>
						<TabsList className="grid w-[180px] grid-cols-3 bg-muted/50 p-0.5">
							{(analyzeBy === 'time'
								? TIME_INTERVAL_OPTIONS
								: GAME_INTERVAL_OPTIONS
							).map((interval) => (
								<TabsTrigger
									key={interval}
									value={interval.toString()}
									className="data-[state=active]:bg-black data-[state=active]:text-white"
								>
									{analyzeBy === 'time'
										? `${interval}m`
										: interval}
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
										Hold for date range export
									</div>
								)}
							</div>
						</PopoverTrigger>
						<PopoverContent
							className="p-0 w-96"
							align="end"
						>
							<div className="flex flex-col py-1">
								<DateRangeExport
									value={value}
									selectedInterval={
										analyzeBy === 'time'
											? timeInterval
											: gameInterval
									}
									analyzeBy={analyzeBy}
								/>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</div>
	);
}
