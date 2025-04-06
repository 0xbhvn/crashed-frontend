'use client';

import * as React from 'react';
import { format, parseISO } from 'date-fns';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { AnalyticsCard } from '../../core/analytics-card';
import { IntervalsControls } from './control-components';
import { IntervalsTable } from './intervals-table';
import {
	useRealTimeIntervalsAnalysis,
	useRealTimeGameSetIntervalsAnalysis,
} from '@/hooks/analytics';
import type {
	TimeIntervalDuration,
	GameIntervalSize,
} from '@/utils/export-utils/types';
import type {
	IntervalGridData,
	IntervalData,
	// GameSetIntervalData,
} from '@/utils/analytics-types';
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
	const [analyzeBy, setAnalyzeBy] = React.useState<'games' | 'time'>('games');
	const [hours, setHours] = React.useState<number>(24);
	const [hoursInputValue, setHoursInputValue] = React.useState<string>('24');
	const [games, setGames] = React.useState<number>(2000);
	const [gamesInputValue, setGamesInputValue] =
		React.useState<string>('2000');

	// Fetch time-based data
	const {
		data: timeIntervalsData,
		isLoading: timeIsLoading,
		error: timeError,
		refreshData: refreshTimeData,
	} = useRealTimeIntervalsAnalysis({
		value,
		intervalMinutes: timeInterval,
		hours,
	});

	// Fetch game-based data
	const {
		data: gameIntervalsData,
		isLoading: gameIsLoading,
		error: gameError,
		refreshData: refreshGameData,
	} = useRealTimeGameSetIntervalsAnalysis({
		value,
		gamesPerSet: gameInterval,
		totalGames: games,
	});

	// Try refreshing if no data is available
	React.useEffect(() => {
		if (analyzeBy === 'time') {
			if (
				(!timeIntervalsData || timeIntervalsData.length === 0) &&
				!timeIsLoading
			) {
				refreshTimeData();
			}
		} else {
			if (
				(!gameIntervalsData || gameIntervalsData.length === 0) &&
				!gameIsLoading
			) {
				refreshGameData();
			}
		}
	}, [
		analyzeBy,
		timeIntervalsData,
		timeIsLoading,
		refreshTimeData,
		gameIntervalsData,
		gameIsLoading,
		refreshGameData,
	]);

	// Calculate total occurrences from intervals data
	const totalOccurrences = React.useMemo(() => {
		const data =
			analyzeBy === 'time' ? timeIntervalsData : gameIntervalsData;
		if (!data || data.length === 0) return 0;
		return data.reduce((total, interval) => total + interval.count, 0);
	}, [analyzeBy, timeIntervalsData, gameIntervalsData]);

	// Convert interval data into a grid format for easier rendering
	const gridData = React.useMemo<IntervalGridData>(() => {
		if (!timeIntervalsData && !gameIntervalsData) return {};

		if (analyzeBy === 'games') {
			if (!gameIntervalsData || gameIntervalsData.length === 0) return {};

			const grid: IntervalGridData = {};
			// For tracking the most recent interval in each row
			const mostRecentIntervals: Record<
				string,
				{ date: Date; columnKey: string }
			> = {};

			// Process each game set from the API response
			for (const interval of gameIntervalsData) {
				try {
					// Calculate which batch this set belongs to based on actual game IDs
					const rangeSize = 100; // Group by 100 games

					// Find which "hundred" this game belongs to
					const startGameId = interval.start_game;
					const gameHundred =
						Math.floor(startGameId / rangeSize) * rangeSize;

					// Create a key for this batch using the new format: 80118xx
					// Extract the significant digits and add 'xx' suffix
					const significantDigits = Math.floor(
						gameHundred / 100
					).toString();
					const rowKey = `${significantDigits}xx`;

					// Initialize batch row if it doesn't exist
					if (!grid[rowKey]) {
						grid[rowKey] = {};
					}

					// Calculate position based on the game ID's position within the range
					// For games per set of 25, we'll have 4 columns (00-24, 25-49, 50-74, 75-99)
					const positionWithinRange = interval.start_game % rangeSize;
					const baseIndex = Math.floor(
						positionWithinRange / gameInterval
					);
					const columnKey = baseIndex.toString().padStart(2, '0');

					// Store interval data in the grid with all the expected fields
					grid[rowKey][columnKey] = {
						interval_start: interval.start_time,
						interval_end: interval.end_time,
						count: interval.count,
						total_games: interval.total_games,
						percentage: interval.percentage,
						// Add a flag for the most recent interval (will set later)
						is_most_recent: false,
					};

					// Keep track of the most recent interval in each row
					const endDate = new Date(interval.end_time);
					if (
						!mostRecentIntervals[rowKey] ||
						endDate > mostRecentIntervals[rowKey].date
					) {
						mostRecentIntervals[rowKey] = {
							date: endDate,
							columnKey,
						};
					}
				} catch (error) {
					console.error(
						'Error processing interval:',
						error,
						interval
					);
				}
			}

			// Find the most recent interval across all rows
			let globalMostRecentInterval: {
				rowKey: string;
				columnKey: string;
				date: Date;
			} | null = null;

			for (const rowKey in mostRecentIntervals) {
				const { columnKey, date } = mostRecentIntervals[rowKey];
				if (
					!globalMostRecentInterval ||
					date > globalMostRecentInterval.date
				) {
					globalMostRecentInterval = {
						rowKey,
						columnKey,
						date,
					};
				}
			}

			// Mark only the globally most recent interval as active
			if (globalMostRecentInterval) {
				const { rowKey, columnKey } = globalMostRecentInterval;
				if (grid[rowKey]?.[columnKey]) {
					grid[rowKey][columnKey].is_most_recent = true;
				}
			}

			return grid;
		}

		// Time-based analysis
		if (!timeIntervalsData || timeIntervalsData.length === 0) return {};

		const grid: IntervalGridData = {};

		// Process each interval from the API response
		for (const interval of timeIntervalsData) {
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
	}, [analyzeBy, timeIntervalsData, gameIntervalsData, gameInterval]);

	// Get row labels
	const rowLabels = React.useMemo(() => {
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

	// Calculate totals for each row
	const rowTotals = React.useMemo<HourTotalsMap>(() => {
		const totals: HourTotalsMap = {};

		// Calculate totals for each row
		for (const rowKey of Object.keys(gridData)) {
			const rowData = gridData[rowKey];
			let rowCount = 0;
			let rowTotalGames = 0;

			// Sum up all intervals in this row
			for (const interval of Object.values(rowData)) {
				if (interval) {
					rowCount += interval.count;
					rowTotalGames += interval.total_games;
				}
			}

			totals[rowKey] = {
				count: rowCount,
				totalGames: rowTotalGames,
				percentage:
					rowTotalGames > 0 ? (rowCount / rowTotalGames) * 100 : 0,
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
			hours: analyzeBy === 'time' ? hours : games,
			intervalMinutes: analyzeBy === 'time' ? timeInterval : gameInterval,
			analyzeBy,
		}),
		[value, hours, games, timeInterval, gameInterval, analyzeBy]
	);

	// Generate Excel export configuration
	const getExcelConfig = async (): Promise<ExcelExportConfig> => {
		return getExcelConfigUtil(
			currentConfig,
			gridData,
			rowLabels,
			rowTotals
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
		for (const [rowKey, rowData] of Object.entries(gridData)) {
			definedGridData[rowKey] = {};
			for (const [intervalKey, interval] of Object.entries(rowData)) {
				if (interval) {
					definedGridData[rowKey][intervalKey] = interval;
				}
			}
		}

		// Use the dedicated utility to generate the HTML config
		return generateIntervalsHtmlConfig({
			value,
			hours,
			intervalMinutes: timeInterval,
			intervalColumns,
			hourLabels: rowLabels,
			gridData: definedGridData,
			hourTotals: rowTotals,
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
		const currentError = analyzeBy === 'time' ? timeError : gameError;
		const currentIsLoading =
			analyzeBy === 'time'
				? timeIsLoading && !timeIntervalsData?.length // Only show loading if no data
				: gameIsLoading && !gameIntervalsData?.length; // Only show loading if no data

		if (currentError) {
			return (
				<Alert
					variant="destructive"
					className="mt-2"
				>
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>{currentError.message}</AlertDescription>
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

				<IntervalsTable
					intervalMinutes={
						analyzeBy === 'time' ? timeInterval : gameInterval
					}
					gridData={gridData}
					hourLabels={rowLabels}
					isLoading={currentIsLoading}
					value={value}
					hourTotals={rowTotals}
					currentTime={currentTime}
					analyzeBy={analyzeBy}
				/>
			</div>
		);
	};

	return (
		<AnalyticsCard
			title="Intervals Analysis"
			description={`Games with crash point below ${value}x by ${
				analyzeBy === 'time' ? 'time interval' : 'game set'
			}`}
			className={className}
			stats={
				// Only hide stats if there's an error or if there's no data at all
				(analyzeBy === 'time' ? !!timeError : !!gameError) ||
				(analyzeBy === 'time'
					? !timeIntervalsData?.length
					: !gameIntervalsData?.length)
					? undefined
					: {
							label: `Total ${value}x occurrences`,
							value: totalOccurrences,
					  }
			}
		>
			{renderContent()}
		</AnalyticsCard>
	);
}
