'use client';

import { useState, useEffect } from 'react';
import { formatDuration, intervalToDuration } from 'date-fns';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { AnalyticsCard } from '../../core/AnalyticsCard';
import { useRealTimeBatchGames } from '@/hooks/analytics';
import { Controls } from './controls';
import { DataTable } from './data-table';
import { generateLastGamesHtmlConfig } from '@/utils/export-utils/lastgames-html';
import {
	CURRENT_STREAK_POINTS,
	UNIQUE_STREAK_POINTS,
	type BaseWidgetProps,
} from '@/utils/export-utils/types';
import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';
import type { TimeAgoMap } from './types';
import { getExcelConfig as getExcelConfigUtil } from './excel-export';

// All crash points for API requests
const ALL_CRASH_POINTS = [
	...new Set([...CURRENT_STREAK_POINTS, ...UNIQUE_STREAK_POINTS]),
];

export function LastGamesTable({ className }: BaseWidgetProps) {
	const [selectedType, setSelectedType] = useState<'current' | 'unique'>(
		'current'
	);
	const [timeAgoMap, setTimeAgoMap] = useState<TimeAgoMap>({});

	// Get the current points to display based on selected tab
	const pointsToShow =
		selectedType === 'current'
			? CURRENT_STREAK_POINTS
			: UNIQUE_STREAK_POINTS;

	// Fetch data with real-time updates
	const {
		data: batchData,
		isLoading: batchLoading,
		error: batchError,
	} = useRealTimeBatchGames({
		values: ALL_CRASH_POINTS,
	});

	// Update time ago strings every second
	useEffect(() => {
		const updateTimeAgo = () => {
			if (!batchData) return;

			const newTimeAgoMap: TimeAgoMap = {};

			for (const point of pointsToShow) {
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
		};

		// Initial update
		updateTimeAgo();

		// Set up interval to update every second
		const intervalId = setInterval(updateTimeAgo, 1000);

		// Clean up on unmount
		return () => clearInterval(intervalId);
	}, [batchData, pointsToShow, selectedType]);

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

				<DataTable
					selectedType={selectedType}
					pointsToShow={pointsToShow}
					batchData={batchData}
					timeAgoMap={timeAgoMap}
					isLoading={batchLoading}
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
