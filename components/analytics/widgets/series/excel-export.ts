import { format } from 'date-fns';
import type {
	ExcelExportConfig,
	ExcelColumnDefinition,
} from '@/utils/export-utils/excel';
import type { ExportConfig } from '@/utils/export-utils';

// Define the structure for series data
interface SeriesData {
	length: number;
	start_game_id: string;
	end_game_id: string;
	start_time: string;
	end_time: string;
	crash_point: number | null;
}

// Define the parameter interface
interface SeriesExcelParams {
	currentConfig: ExportConfig;
	seriesData: SeriesData[];
}

/**
 * Generate Excel export configuration for Series Analysis
 */
export const getExcelConfig = async ({
	currentConfig,
	seriesData,
}: SeriesExcelParams): Promise<ExcelExportConfig> => {
	// Transform data for export
	const exportData = seriesData.map((series) => ({
		length: series.length,
		seriesId: `${series.start_game_id}-${series.end_game_id}`,
		startGameId: series.start_game_id,
		endGameId: series.end_game_id,
		startTime: new Date(series.start_time),
		endTime: new Date(series.end_time),
		crashPoint: series.crash_point,
	}));

	// Define columns for the main sheet
	const mainColumns: ExcelColumnDefinition[] = [
		{ header: 'Length (games)', key: 'length', width: 15 },
		{
			header: 'Start Game',
			key: 'startGameId',
			width: 15,
			formatter: (value) => `#${value}`,
		},
		{
			header: 'End Game',
			key: 'endGameId',
			width: 15,
			formatter: (value) => `#${value}`,
		},
		{
			header: 'Start Time',
			key: 'startTime',
			width: 20,
			formatter: (value) => format(value as Date, 'MMM d, yyyy h:mm a'),
		},
		{
			header: 'End Time',
			key: 'endTime',
			width: 20,
			formatter: (value) => format(value as Date, 'MMM d, yyyy h:mm a'),
		},
		{
			header: 'Crash Point',
			key: 'crashPoint',
			width: 15,
			formatter: (value) => value !== null && value !== undefined ? `${(value as number).toFixed(2)}x` : '-',
		},
	];

	// Define configuration for Excel export
	const excelConfig: ExcelExportConfig = {
		fileName: `series_analysis_${format(
			new Date(),
			'yyyyMMdd_HHmmss'
		)}.xlsx`,
		creator: 'Crash Game Analytics',
		sheets: [
			{
				name: 'Series Data',
				columns: mainColumns,
				data: exportData,
				autoFilter: true,
				freezeHeader: true,
			},
			// Add instructions sheet
			{
				name: 'Chart Instructions',
				columns: [
					{
						header: 'Instructions',
						key: 'instructions',
						width: 60,
					},
				],
				data: [
					{
						instructions: 'Series Length Chart Instructions',
					},
					{ instructions: '' },
					{ instructions: 'To create a chart in Excel:' },
					{
						instructions:
							'1. Select all data in the Series Data sheet',
					},
					{ instructions: '2. Go to the Insert tab' },
					{
						instructions:
							'3. Click on the Column or Bar chart option',
					},
					{ instructions: '4. Select a chart style' },
					{ instructions: '' },
					{ instructions: 'For Series Length chart:' },
					{
						instructions:
							'- Use "Length (games)" column for values',
					},
					{
						instructions:
							'- Use "Start Game" column for categories',
					},
					{ instructions: '' },
					{ instructions: 'For Crash Point chart:' },
					{
						instructions:
							'- Use "Crash Point" column for values',
					},
					{
						instructions:
							'- Use "Start Game" column for categories',
					},
				],
				autoFilter: false,
				freezeHeader: false,
			},
		],
	};


	// Add configuration sheet
	excelConfig.sheets.push({
		name: 'Configuration',
		columns: [
			{ header: 'Parameter', key: 'parameter', width: 20 },
			{ header: 'Value', key: 'value', width: 15 },
		],
		data: [
			{ parameter: 'Crash Point', value: currentConfig.value },
			{
				parameter: 'Analysis Mode',
				value: currentConfig.analyzeBy === 'games' ? 'Games' : 'Hours',
			},
			{ parameter: 'Games Limit', value: currentConfig.limit },
			{ parameter: 'Hours', value: currentConfig.hours },
			{
				parameter: 'Sort By',
				value: currentConfig.sortBy === 'time' ? 'Time' : 'Length',
			},
		],
		autoFilter: false,
		freezeHeader: true,
	});

	return excelConfig;
};
