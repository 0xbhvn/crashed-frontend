'use client';

import { useState, useEffect, useMemo } from 'react';
import { formatDuration, intervalToDuration } from 'date-fns';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { AnalyticsCard } from '../../core/analytics-card';
import { useRealTimeBatchGames } from '@/hooks/analytics';
import { Controls } from './controls';
import { DataTable } from './data-table';
import { generateLastGamesHtmlConfig } from '@/utils/export-utils/lastgames-html';
import { CrashPointCards } from '../../core/crash-point-cards';
import {
	CURRENT_STREAK_POINTS,
	UNIQUE_STREAK_POINTS,
	type BaseWidgetProps,
} from '@/utils/export-utils/types';
import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';
import type { TimeAgoMap } from './types';
import { getExcelConfig as getExcelConfigUtil } from './excel-export';

// Generate the initial merged array with default crash points
const getInitialCrashPoints = () => [
	...new Set([...CURRENT_STREAK_POINTS, ...UNIQUE_STREAK_POINTS]),
];

// Props interfaces
export interface LastGamesTableProps extends BaseWidgetProps {
	selectedType: 'current' | 'unique';
	setSelectedType: (value: 'current' | 'unique') => void;
}

export function LastGamesTable({
	className,
	selectedType,
	setSelectedType,
}: LastGamesTableProps) {
	// State for all crash points (base + custom)
	const [allCrashPoints, setAllCrashPoints] = useState<number[]>(
		getInitialCrashPoints()
	);

	// State for custom points added per type
	const [customCurrentPoints, setCustomCurrentPoints] = useState<number[]>(
		[]
	);
	const [customUniquePoints, setCustomUniquePoints] = useState<number[]>([]);

	const [timeAgoMap, setTimeAgoMap] = useState<TimeAgoMap>({});

	// Get the current points to display based on selected tab - memoized to prevent unnecessary recalculations
	const pointsToShow = useMemo(
		() =>
			selectedType === 'current'
				? [...CURRENT_STREAK_POINTS, ...customCurrentPoints].sort(
						(a, b) => a - b
				  )
				: [...UNIQUE_STREAK_POINTS, ...customUniquePoints].sort(
						(a, b) => a - b
				  ),
		[selectedType, customCurrentPoints, customUniquePoints]
	);

	// Fetch data with real-time updates - now more efficient with optimized API calls
	const {
		data: batchData,
		isLoading: batchLoading,
		error: batchError,
		isValueLoading,
	} = useRealTimeBatchGames({
		values: allCrashPoints,
	});

	// Update time ago strings every second
	useEffect(() => {
		if (!batchData) return;

		// Store point references in a variable to avoid recreating on every render
		const currentPointsToProcess = [...pointsToShow];

		function updateTimeAgo() {
			const newTimeAgoMap: TimeAgoMap = {};

			for (const point of currentPointsToProcess) {
				if (!batchData || !batchData[point]) continue;

				const pointData = batchData[point];

				// Use the appropriate game data based on selected tab
				const gameData =
					selectedType === 'current'
						? pointData?.currentGame
						: pointData?.uniqueGame;

				if (gameData?.beginTime) {
					const interval = intervalToDuration({
						start: new Date(gameData.beginTime),
						end: new Date(),
					});

					const formatted = formatDuration(interval, {
						format: ['hours', 'minutes'],
						delimiter: ', ',
					});

					newTimeAgoMap[point] = formatted
						? `${formatted} ago`
						: 'just now';
				}
			}

			setTimeAgoMap(newTimeAgoMap);
		}

		// Initial update
		updateTimeAgo();

		// Set up interval to update every second
		const intervalId = setInterval(updateTimeAgo, 1000);

		// Clean up on unmount
		return () => clearInterval(intervalId);
	}, [batchData, pointsToShow, selectedType]);

	// Handle crash point changes from the cards
	const handleCrashPointAdded = (newPoint: number) => {
		// For unique streak (exact value), we floor decimal values
		const uniquePointValue = Math.floor(newPoint);
		// For current streak, we keep the exact value
		const currentPointValue = newPoint;

		// Update state in batches to prevent unnecessary re-renders
		// Use a single function to update all state values based on current state
		const updateStates = () => {
			// Check if points need to be added to allCrashPoints
			setAllCrashPoints((prev) => {
				const newAllPoints = [...prev];
				let changed = false;

				// Add currentPointValue if needed
				if (!prev.includes(currentPointValue)) {
					newAllPoints.push(currentPointValue);
					changed = true;
				}

				// Add uniquePointValue if needed and different
				if (
					uniquePointValue !== currentPointValue &&
					!prev.includes(uniquePointValue)
				) {
					newAllPoints.push(uniquePointValue);
					changed = true;
				}

				return changed ? newAllPoints : prev;
			});

			// Check if we need to add to current points collection
			setCustomCurrentPoints((prev) => {
				if (
					!CURRENT_STREAK_POINTS.includes(currentPointValue) &&
					!prev.includes(currentPointValue)
				) {
					return [...prev, currentPointValue].sort((a, b) => a - b);
				}
				return prev;
			});

			// Check if we need to add to unique points collection
			setCustomUniquePoints((prev) => {
				if (
					!UNIQUE_STREAK_POINTS.includes(uniquePointValue) &&
					!prev.includes(uniquePointValue)
				) {
					return [...prev, uniquePointValue].sort((a, b) => a - b);
				}
				return prev;
			});
		};

		// Use a setTimeout to batch updates and break any potential update cycles
		setTimeout(updateStates, 0);
	};

	// Generate Excel export configuration
	const getExcelConfig = async (): Promise<ExcelExportConfig> => {
		return getExcelConfigUtil({
			selectedType,
			batchData: batchData || {},
			timeAgoMap,
		});
	};

	// Generate HTML chart configuration
	const getChartConfig = async (): Promise<HtmlChartConfig> => {
		// Use the dedicated utility to generate the HTML config
		return generateLastGamesHtmlConfig({
			selectedType,
			batchData: batchData || {},
			timeAgoMap,
			pointsToShow,
		});
	};

	// Render content
	const renderContent = () => {
		if (batchError) {
			return (
				<Alert
					variant="destructive"
					className="mt-2"
				>
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>{batchError.message}</AlertDescription>
				</Alert>
			);
		}

		return (
			<div className="w-full">
				<Controls
					selectedType={selectedType}
					setSelectedType={setSelectedType}
					getExcelConfig={getExcelConfig}
					getChartConfig={getChartConfig}
				/>

				<CrashPointCards
					selectedType={selectedType}
					batchData={batchData}
					timeAgoMap={timeAgoMap}
					onCrashPointChange={handleCrashPointAdded}
					defaultPoints={[
						...CURRENT_STREAK_POINTS,
						...UNIQUE_STREAK_POINTS,
					]}
					isValueLoading={isValueLoading}
				/>

				<DataTable
					selectedType={selectedType}
					pointsToShow={pointsToShow}
					batchData={batchData}
					timeAgoMap={timeAgoMap}
					isLoading={batchLoading}
					isValueLoading={isValueLoading}
				/>
			</div>
		);
	};

	return (
		<AnalyticsCard
			title="Last Games Analysis"
			description="Recent games meeting crash point thresholds"
			className={className}
		>
			{renderContent()}
		</AnalyticsCard>
	);
}
