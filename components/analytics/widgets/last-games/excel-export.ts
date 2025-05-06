import { format } from 'date-fns';
import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import {
	CURRENT_STREAK_POINTS,
	UNIQUE_STREAK_POINTS,
} from '@/utils/export-utils/types';
import type { TimeAgoMap } from './types';
import type { BatchLastGamesData } from '@/utils/analytics-types';

interface LastGamesExportConfig {
	selectedType: 'current' | 'unique';
	batchData: BatchLastGamesData;
	timeAgoMap: TimeAgoMap;
}

export const getExcelConfig = async ({
	selectedType,
	batchData,
	timeAgoMap,
}: LastGamesExportConfig): Promise<ExcelExportConfig> => {
	// Get the points to show based on selected type
	const pointsToShow =
		selectedType === 'current'
			? CURRENT_STREAK_POINTS
			: UNIQUE_STREAK_POINTS;

	// Transform data for export
	const exportRows = pointsToShow.map((point) => {
		const pointData = batchData?.[point];
		const streakValue = pointData?.[selectedType] ?? 0;

		// Use the appropriate game data based on selected tab
		const gameData =
			selectedType === 'current'
				? pointData?.currentGame
				: pointData?.uniqueGame;

		// Get probability based on selected type (only for current mode)
		const probability =
			selectedType === 'current' ? pointData?.currentProbability : null;

		const exact = gameData?.crashPoint;

		const baseData = {
			crashPoint:
				selectedType === 'current'
					? `≥ ${point}${point === Math.floor(point) ? '.0' : ''}`
					: `= ${point}${point === Math.floor(point) ? '.0' : ''}`,
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

		// Add probability only for current mode
		if (selectedType === 'current') {
			return {
				...baseData,
				probability:
					probability !== null && probability !== undefined
						? `${probability.toFixed(2)}%`
						: '-',
			};
		}

		return baseData;
	});

	// Define columns for Excel
	const baseColumns = [
		{ header: 'Crash Point', key: 'crashPoint', width: 15 },
		{ header: 'Streak Count', key: 'streakCount', width: 15 },
	];

	// Add probability column only for current mode
	const additionalColumns =
		selectedType === 'current'
			? [{ header: 'Probability', key: 'probability', width: 15 }]
			: [];

	const finalColumns = [
		...baseColumns,
		...additionalColumns,
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
				columns: finalColumns,
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
