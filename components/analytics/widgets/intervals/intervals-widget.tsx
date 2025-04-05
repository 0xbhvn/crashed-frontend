'use client';

import * as React from 'react';
import { format, parseISO } from 'date-fns';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { AnalyticsCard } from '../../core/analytics-card';
import { IntervalsControls } from './control-components';
import { IntervalsTable } from './intervals-table';
import { useRealTimeIntervalsAnalysis } from '@/hooks/analytics';
import type {
	TimeIntervalDuration,
	GameIntervalSize,
} from '@/utils/export-utils/types';
import type { IntervalGridData, IntervalData } from '@/utils/analytics-types';
import type { BaseWidgetProps } from '@/utils/export-utils/types';
import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';
import { generateIntervalsHtmlConfig } from '@/utils/export-utils/intervals-html';
import type { HourTotalsMap } from './types';
import { getExcelConfig as getExcelConfigUtil } from './excel-export';

export function IntervalsWidget({ className }: BaseWidgetProps) {
	// Value for analysis (crash point)
	const [value, setValue] = React.useState<number>(10);
	const [inputValue, setInputValue] = React.useState<string>('10');

	// Analysis parameters
	const [timeInterval, setTimeInterval] =
		React.useState<TimeIntervalDuration>(10);
	const [gameInterval, setGameInterval] =
		React.useState<GameIntervalSize>(25);
	const [analyzeBy, setAnalyzeBy] = React.useState<'games' | 'time'>('time');
	const [hours, setHours] = React.useState<number>(24);
	const [hoursInputValue, setHoursInputValue] = React.useState<string>('24');
	const [games, setGames] = React.useState<number>(2000);
	const [gamesInputValue, setGamesInputValue] =
		React.useState<string>('2000');

	// Fetch data
	const {
		data: intervalsData,
		isLoading,
		error,
		refreshData,
	} = useRealTimeIntervalsAnalysis({
		value,
		intervalMinutes: timeInterval,
		hours,
	});

	// Try refreshing if no data is available
	React.useEffect(() => {
		// If we have no data but aren't loading, try refreshing once
		if ((!intervalsData || intervalsData.length === 0) && !isLoading) {
			refreshData();
		}
	}, [intervalsData, isLoading, refreshData]);

	// Calculate total occurrences frov  m intervals data
	const totalOccurrences = React.useMemo(() => {
		if (!intervalsData || intervalsData.length === 0) return 0;
		return intervalsData.reduce(
			(total, interval) => total + interval.count,
			0
		);
	}, [intervalsData]);

	// Convert interval data into a grid format for easier rendering
	const gridData = React.useMemo<IntervalGridData>(() => {
		if (!intervalsData || intervalsData.length === 0) return {};

		const grid: IntervalGridData = {};

		// Process each interval from the API response
		for (const interval of intervalsData) {
			try {
				// Extract date parts from interval_start
				const startDate = parseISO(interval.interval_start);

				// Format the hour key as YYYY-MM-DD HH for row identification
				const hourKey = format(startDate, 'yyyy-MM-dd HH');

				// Extract minute part to determine which column this belongs to
				const startMinute = Number.parseInt(
					format(startDate, 'mm'),
					10
				);

				// Map the minute to the correct column (e.g., 00-10, 10-20, etc.)
				// Column keys are the starting minute: "00", "10", "20", etc.
				const intervalKey = startMinute.toString().padStart(2, '0');

				// Initialize hour row if it doesn't exist
				if (!grid[hourKey]) {
					grid[hourKey] = {};
				}

				// Store interval data in the grid
				grid[hourKey][intervalKey] = interval;
			} catch {
				// Silently skip problematic intervals
			}
		}

		return grid;
	}, [intervalsData]);

	// Get hour labels (row headers)
	const hourLabels = React.useMemo(() => {
		return Object.keys(gridData).sort((a, b) => b.localeCompare(a)); // Sort in descending order
	}, [gridData]);

	// State to keep track of current time
	const [currentTime, setCurrentTime] = React.useState(new Date());

	// Update current time every second
	React.useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		// Cleanup function to prevent memory leaks
		return () => {
			clearInterval(interval);
		};
	}, []);

	// Calculate totals for each hour
	const hourTotals = React.useMemo<HourTotalsMap>(() => {
		const totals: HourTotalsMap = {};

		// Calculate totals for each hour
		for (const hourKey of Object.keys(gridData)) {
			const hourData = gridData[hourKey];
			let hourCount = 0;
			let hourTotalGames = 0;

			// Sum up all intervals in this hour
			for (const interval of Object.values(hourData)) {
				if (interval) {
					hourCount += interval.count;
					hourTotalGames += interval.total_games;
				}
			}

			totals[hourKey] = {
				count: hourCount,
				totalGames: hourTotalGames,
				percentage:
					hourTotalGames > 0 ? (hourCount / hourTotalGames) * 100 : 0,
			};
		}

		return totals;
	}, [gridData]);

	// Handle value input change
	const handleValueInputChange = (value: string) => {
		setInputValue(value);
	};

	// Apply value change
	const applyValueChange = () => {
		const numValue = Number.parseFloat(inputValue);
		if (!Number.isNaN(numValue) && numValue > 0) {
			setValue(numValue);
			// Update input display to show integers without decimal places if it's a whole number
			setInputValue(
				numValue % 1 === 0 ? numValue.toFixed(0) : numValue.toString()
			);
		} else {
			// Format the value display based on whether it's an integer or decimal
			setInputValue(
				value % 1 === 0 ? value.toFixed(0) : value.toString()
			);
		}
	};

	// Handle hours input change
	const handleHoursInputChange = (value: string) => {
		setHoursInputValue(value);
	};

	// Apply hours change
	const applyHoursChange = () => {
		const numValue = Number.parseInt(hoursInputValue, 10);
		if (!Number.isNaN(numValue) && numValue > 0 && numValue <= 168) {
			setHours(numValue);
		} else {
			setHoursInputValue(hours.toString());
		}
	};

	// Handle games input change
	const handleGamesInputChange = (value: string) => {
		setGamesInputValue(value);
	};

	// Apply games change
	const applyGamesChange = () => {
		const numValue = Number.parseInt(gamesInputValue, 10);
		if (!Number.isNaN(numValue) && numValue > 0 && numValue <= 10000) {
			setGames(numValue);
		} else {
			setGamesInputValue(games.toString());
		}
	};

	// Handle analyze by change
	const handleAnalyzeByChange = (value: string) => {
		setAnalyzeBy(value as 'games' | 'time');
	};

	// Handle key down for inputs
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			if ((e.target as HTMLInputElement).id === 'value-input') {
				applyValueChange();
			} else if ((e.target as HTMLInputElement).id === 'hours-input') {
				applyHoursChange();
			} else if ((e.target as HTMLInputElement).id === 'games-input') {
				applyGamesChange();
			}
		}
	};

	// Handle interval change
	const handleIntervalChange = (value: string) => {
		const numValue = Number(value);
		if (analyzeBy === 'time') {
			setTimeInterval(numValue as TimeIntervalDuration);
		} else {
			setGameInterval(numValue as GameIntervalSize);
		}
	};

	// Current export configuration
	const currentConfig = React.useMemo(
		() => ({
			value,
			hours,
			intervalMinutes: timeInterval,
		}),
		[value, hours, timeInterval]
	);

	// Generate Excel export configuration
	const getExcelConfig = async (): Promise<ExcelExportConfig> => {
		return getExcelConfigUtil(
			currentConfig,
			gridData,
			hourLabels,
			hourTotals
		);
	};

	// Generate HTML chart configuration
	const getChartConfig = async (): Promise<HtmlChartConfig> => {
		// Get the interval columns
		const intervalColumns = [];
		for (let i = 0; i < 60; i += timeInterval) {
			intervalColumns.push(i);
		}

		// Filter out undefined values from gridData
		const definedGridData: Record<
			string,
			Record<string, IntervalData>
		> = {};
		for (const [hourKey, hourData] of Object.entries(gridData)) {
			definedGridData[hourKey] = {};
			for (const [intervalKey, interval] of Object.entries(hourData)) {
				if (interval) {
					definedGridData[hourKey][intervalKey] = interval;
				}
			}
		}

		// Use the dedicated utility to generate the HTML config
		return generateIntervalsHtmlConfig({
			value,
			hours,
			intervalMinutes: timeInterval,
			intervalColumns,
			hourLabels,
			gridData: definedGridData,
			hourTotals,
			formatHourLabel: (hourKey: string) => {
				try {
					const date = parseISO(`${hourKey}:00:00`);
					return format(date, 'MMM dd, h a');
				} catch {
					return hourKey;
				}
			},
		});
	};

	// Render content
	const renderContent = () => {
		if (error) {
			return (
				<Alert
					variant="destructive"
					className="mt-2"
				>
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>{error.message}</AlertDescription>
				</Alert>
			);
		}

		return (
			<div className="w-full">
				<IntervalsControls
					value={value}
					inputValue={inputValue}
					hours={hours}
					hoursInputValue={hoursInputValue}
					games={games}
					gamesInputValue={gamesInputValue}
					timeInterval={timeInterval}
					gameInterval={gameInterval}
					analyzeBy={analyzeBy}
					onValueInputChange={handleValueInputChange}
					onHoursInputChange={handleHoursInputChange}
					onGamesInputChange={handleGamesInputChange}
					applyValueChange={applyValueChange}
					applyHoursChange={applyHoursChange}
					applyGamesChange={applyGamesChange}
					handleKeyDown={handleKeyDown}
					onIntervalChange={handleIntervalChange}
					onAnalyzeByChange={handleAnalyzeByChange}
					getExcelConfig={getExcelConfig}
					getChartConfig={getChartConfig}
				/>

				{analyzeBy === 'time' ? (
					<IntervalsTable
						intervalMinutes={timeInterval}
						gridData={gridData}
						hourLabels={hourLabels}
						isLoading={isLoading}
						value={value}
						hourTotals={hourTotals}
						currentTime={currentTime}
					/>
				) : (
					<div className="flex items-center justify-center h-[400px] text-muted-foreground">
						Coming soon...
					</div>
				)}
			</div>
		);
	};

	return (
		<AnalyticsCard
			title="Intervals Analysis"
			description={`Games with crash point below ${value}x by time interval`}
			className={className}
			stats={
				!isLoading && !error && totalOccurrences !== undefined
					? {
							label: `Total ${value}x occurrences`,
							value: totalOccurrences,
					  }
					: undefined
			}
		>
			{renderContent()}
		</AnalyticsCard>
	);
}
