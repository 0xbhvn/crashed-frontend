import { format } from 'date-fns';
import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import {
	CURRENT_STREAK_POINTS,
	UNIQUE_STREAK_POINTS,
} from '@/utils/export-utils/types';
import type { OccurrencesData } from '@/utils/analytics-types';
import { isComparisonData } from './types';

interface OccurrencesExportConfig {
	selectedType: 'current' | 'unique';
	analyzeBy: 'games' | 'time';
	limit: number;
	hours: number;
	showComparison: boolean;
	occurrencesData?: OccurrencesData;
}

export const getExcelConfig = async ({
	selectedType,
	analyzeBy,
	limit,
	hours,
	showComparison,
	occurrencesData,
}: OccurrencesExportConfig): Promise<ExcelExportConfig> => {
	// Get the points to show based on selected type
	const pointsToShow =
		selectedType === 'current'
			? CURRENT_STREAK_POINTS
			: UNIQUE_STREAK_POINTS;

	// Transform data for export
	const exportRows = pointsToShow.map((point) => {
		// Format the key to match exactly what the API returns (with decimal)
		const pointKey =
			point === Math.floor(point) ? `${point}.0` : point.toString();

		// Get the data for the selected type (current or unique)
		const dataItem = occurrencesData?.[pointKey]?.[selectedType];

		if (!dataItem) {
			return {
				crashPoint:
					selectedType === 'current'
						? `≥ ${point}${point === Math.floor(point) ? '.0' : ''}`
						: `= ${point}${
								point === Math.floor(point) ? '.0' : ''
						  }`,
				occurrences: 0,
				...(showComparison ? { change: '-' } : {}),
				percentage: '0.00%',
				...(showComparison ? { percentChange: '-' } : {}),
			};
		}

		if (isComparisonData(dataItem)) {
			const currentData = dataItem.current_period;
			const comparison = dataItem.comparison;

			return {
				crashPoint:
					selectedType === 'current'
						? `≥ ${point}${point === Math.floor(point) ? '.0' : ''}`
						: `= ${point}${
								point === Math.floor(point) ? '.0' : ''
						  }`,
				occurrences: currentData.count,
				...(showComparison
					? {
							change: `${comparison.count_diff > 0 ? '+' : ''}${
								comparison.count_diff
							}`,
					  }
					: {}),
				percentage: `${currentData.percentage.toFixed(2)}%`,
				...(showComparison
					? {
							percentChange: `${
								analyzeBy === 'games'
									? comparison.count_percent_change > 0
										? '+'
										: ''
									: comparison.percentage_diff > 0
									? '+'
									: ''
							}${Math.abs(
								analyzeBy === 'games'
									? comparison.count_percent_change
									: comparison.percentage_diff
							).toFixed(2)}%`,
					  }
					: {}),
			};
		}

		// Regular data handling (non-comparison)
		return {
			crashPoint:
				selectedType === 'current'
					? `≥ ${point}${point === Math.floor(point) ? '.0' : ''}`
					: `= ${point}${point === Math.floor(point) ? '.0' : ''}`,
			occurrences: dataItem.count,
			...(showComparison ? { change: '-' } : {}),
			percentage: `${dataItem.percentage.toFixed(2)}%`,
			...(showComparison ? { percentChange: '-' } : {}),
		};
	});

	// Define columns for Excel
	const columns = [
		{ header: 'Crash Point', key: 'crashPoint', width: 15 },
		{ header: 'Occurrences', key: 'occurrences', width: 15 },
		...(showComparison
			? [{ header: 'Change', key: 'change', width: 15 }]
			: []),
		{ header: 'Percentage', key: 'percentage', width: 15 },
		...(showComparison
			? [
					{
						header: analyzeBy === 'games' ? '% Change' : '% Diff',
						key: 'percentChange',
						width: 15,
					},
			  ]
			: []),
	];

	// Create configuration for Excel export
	const excelConfig: ExcelExportConfig = {
		fileName: `occurrences_analysis_${format(
			new Date(),
			'yyyyMMdd_HHmmss'
		)}.xlsx`,
		creator: 'Crash Game Analytics',
		sheets: [
			{
				name: 'Occurrences Data',
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
						parameter: 'Analyze By',
						value:
							analyzeBy === 'games'
								? `Games (${limit})`
								: `Hours (${hours})`,
					},
					{
						parameter: 'Comparison Mode',
						value: showComparison ? 'Enabled' : 'Disabled',
					},
				],
				autoFilter: false,
				freezeHeader: true,
			},
		],
	};

	return excelConfig;
};
