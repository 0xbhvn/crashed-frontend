'use client';

import { useState, useEffect } from 'react';
import { formatDuration, intervalToDuration, format } from 'date-fns';
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
		// Transform data for export
		const exportRows = pointsToShow.map((point) => {
			const pointData = batchData?.[point];
			const streakValue = pointData?.[selectedType] ?? 0;

			// Use the appropriate game data based on selected tab
			const gameData =
				selectedType === 'current'
					? pointData?.currentGame
					: pointData?.uniqueGame;
			const exact = gameData?.crashPoint;

			return {
				crashPoint:
					selectedType === 'current'
						? `≥ ${point}${point === Math.floor(point) ? '.0' : ''}`
						: `= ${point}${
								point === Math.floor(point) ? '.0' : ''
						  }`,
				streakCount: streakValue,
				timeSince: !gameData
					? 'No data'
					: timeAgoMap[point] || 'calculating...',
				lastGameId: !gameData ? '-' : `#${gameData.gameId}`,
				exactCrash: !gameData ? '-' : `${exact?.toFixed(2)}x`,
				beginTime: gameData?.beginTime
					? new Date(gameData.beginTime).toISOString()
					: '-',
			};
		});

		// Define columns for Excel
		const columns = [
			{ header: 'Crash Point', key: 'crashPoint', width: 15 },
			{ header: 'Streak Count', key: 'streakCount', width: 15 },
			{ header: 'Time Since', key: 'timeSince', width: 20 },
			{ header: 'Last Game ID', key: 'lastGameId', width: 15 },
			{ header: 'Exact Crash', key: 'exactCrash', width: 15 },
			{ header: 'Begin Time', key: 'beginTime', width: 20 },
		];

		// Create configuration for Excel export
		const excelConfig: ExcelExportConfig = {
			fileName: `lastgames_analysis_${format(
				new Date(),
				'yyyyMMdd_HHmmss'
			)}.xlsx`,
			creator: 'Crash Game Analytics',
			sheets: [
				{
					name: 'Last Games Data',
					columns,
					data: exportRows,
					autoFilter: true,
					freezeHeader: true,
				},
				// Add configuration sheet
				{
					name: 'Configuration',
					columns: [
						{ header: 'Parameter', key: 'parameter', width: 20 },
						{ header: 'Value', key: 'value', width: 20 },
					],
					data: [
						{
							parameter: 'Analysis Type',
							value:
								selectedType === 'current'
									? 'Above Value'
									: 'Exact Value',
						},
						{
							parameter: 'Points Analyzed',
							value: pointsToShow.length,
						},
					],
					autoFilter: false,
					freezeHeader: true,
				},
			],
		};

		return excelConfig;
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
