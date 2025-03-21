import { format } from 'date-fns';
import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { Game } from '@/models/game';

interface GamesExportConfig {
	games: Game[];
	page: number;
	perPage: number;
	crashPointThreshold: number;
}

export const getExcelConfig = async ({
	games,
	page,
	perPage,
	crashPointThreshold,
}: GamesExportConfig): Promise<ExcelExportConfig> => {
	// Transform data for export
	const exportData = games.map((game: Game) => ({
		gameId: game.gameId,
		crashPoint:
			typeof game.crashPoint === 'number'
				? game.crashPoint.toFixed(2)
				: '',
		beginTime: game.beginTime
			? format(new Date(game.beginTime), 'MMM d, yyyy h:mm:ss a')
			: '',
		endTime: game.endTime
			? format(new Date(game.endTime), 'MMM d, yyyy h:mm:ss a')
			: '',
		duration:
			game.beginTime && game.endTime
				? (
						(new Date(game.endTime).getTime() -
							new Date(game.beginTime).getTime()) /
						1000
				  ).toFixed(2)
				: '',
	}));

	// Create configuration for Excel export
	const excelConfig: ExcelExportConfig = {
		fileName: `crash_games_${format(new Date(), 'yyyyMMdd_HHmmss')}.xlsx`,
		creator: 'Crash Game Analytics',
		sheets: [
			{
				name: 'Games Data',
				columns: [
					{ header: 'Game ID', key: 'gameId', width: 15 },
					{ header: 'Crash Point', key: 'crashPoint', width: 15 },
					{ header: 'Begin Time', key: 'beginTime', width: 22 },
					{ header: 'End Time', key: 'endTime', width: 22 },
					{
						header: 'Duration (sec)',
						key: 'duration',
						width: 15,
					},
				],
				data: exportData,
				autoFilter: true,
				freezeHeader: true,
			},
			// Add filter information sheet
			{
				name: 'Filter Info',
				columns: [
					{ header: 'Parameter', key: 'parameter', width: 20 },
					{ header: 'Value', key: 'value', width: 30 },
				],
				data: [
					{ parameter: 'Page', value: page.toString() },
					{
						parameter: 'Games Per Page',
						value: perPage.toString(),
					},
					{
						parameter: 'Crash Point Threshold',
						value: `≥ ${crashPointThreshold}`,
					},
					{
						parameter: 'Export Date',
						value: format(new Date(), 'MMM d, yyyy h:mm a'),
					},
				],
				autoFilter: false,
				freezeHeader: true,
			},
		],
	};

	return excelConfig;
};
