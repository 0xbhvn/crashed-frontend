import { format, parseISO } from 'date-fns';
import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { IntervalGridData } from '@/utils/analytics-types';
import type { HourTotalsMap } from './types';
import type {
	TimeIntervalDuration,
	GameIntervalSize,
} from '@/utils/export-utils/types';

interface IntervalConfig {
	value: number;
	hours: number;
	intervalMinutes: TimeIntervalDuration | GameIntervalSize;
	analyzeBy?: 'time' | 'games';
}

export const getExcelConfig = (
	currentConfig: IntervalConfig,
	gridData: IntervalGridData,
	rowLabels: string[],
	hourTotals: HourTotalsMap
): ExcelExportConfig => {
	// Determine if we're analyzing by time or games
	const analyzeBy = currentConfig.analyzeBy || 'time';
	const isTimeAnalysis = analyzeBy === 'time';

	// Get the interval columns
	const intervalColumns: string[] = [];

	if (isTimeAnalysis) {
		// For time analysis, generate columns based on minutes in an hour
		for (let i = 0; i < 60; i += Number(currentConfig.intervalMinutes)) {
			const columnKey = i.toString().padStart(2, '0');
			intervalColumns.push(columnKey);
		}
	} else {
		// For game analysis, generate columns based on game intervals in a set of 100
		const gameInterval: number = Number(currentConfig.intervalMinutes);
		const columnsPerRow: number = Math.floor(100 / gameInterval);

		for (let i = 0; i < columnsPerRow; i++) {
			const columnKey: string = i.toString().padStart(2, '0');
			intervalColumns.push(columnKey);
		}
	}

	// Prepare data for rows in the Excel sheet
	const rows = rowLabels.map((rowKey) => {
		try {
			// Format label for display
			let rowDisplay: string;

			if (isTimeAnalysis) {
				// Format date for time analysis
				const date = parseISO(`${rowKey}:00:00`);
				rowDisplay = format(date, 'MMM dd, yyyy h a');
			} else {
				// For game analysis, use the game range label
				rowDisplay = rowKey; // Already formatted as 80118xx
			}

			// Create base row with hour/game range information
			const row: Record<string, string | number> = {
				rowLabel: rowDisplay,
				total: hourTotals[rowKey]?.count || 0,
				totalGames: hourTotals[rowKey]?.totalGames || 0,
				percentage: hourTotals[rowKey]?.percentage
					? `${hourTotals[rowKey]?.percentage.toFixed(2)}%`
					: '0.00%',
			};

			// Add data for each interval column
			for (const columnKey of intervalColumns) {
				const interval = gridData[rowKey]?.[columnKey];
				row[`int_${columnKey}`] = interval ? interval.count : 0;
				row[`pct_${columnKey}`] = interval
					? `${interval.percentage.toFixed(2)}%`
					: '0.00%';
			}

			return row;
		} catch {
			// Return a row with default values in case of an error
			return {
				rowLabel: rowKey,
				total: 0,
				totalGames: 0,
				percentage: '0.00%',
			};
		}
	});

	// Create columns for the Excel sheet
	const columns = [
		{
			header: isTimeAnalysis ? 'Hour' : 'Game Range',
			key: 'rowLabel',
			width: 20,
		},
		{ header: 'Total Count', key: 'total', width: 15 },
		{ header: 'Total Games', key: 'totalGames', width: 15 },
		{ header: 'Percentage', key: 'percentage', width: 15 },
	];

	// Add interval columns
	for (const columnKey of intervalColumns) {
		let intervalLabel: string;

		if (isTimeAnalysis) {
			// Format the time interval range (e.g., "00-10" for a 10-minute interval)
			const intervalEnd = (
				(Number.parseInt(columnKey, 10) +
					Number(currentConfig.intervalMinutes)) %
				60
			)
				.toString()
				.padStart(2, '0');
			intervalLabel = `${columnKey}-${intervalEnd}`;
		} else {
			// Format the game interval range (e.g., "00-24" for a 25-game interval)
			const gameInterval: number = Number(currentConfig.intervalMinutes);
			const start: number = Number.parseInt(columnKey, 10) * gameInterval;
			const end: number = Math.min(start + gameInterval - 1, 99);
			intervalLabel = `${start.toString().padStart(2, '0')}-${end
				.toString()
				.padStart(2, '0')}`;
		}

		// Add count column
		columns.push({
			header: `${intervalLabel} Count`,
			key: `int_${columnKey}`,
			width: 15,
		});

		// Add percentage column
		columns.push({
			header: `${intervalLabel} %`,
			key: `pct_${columnKey}`,
			width: 15,
		});
	}

	// Create configuration for Excel export
	const excelConfig: ExcelExportConfig = {
		fileName: `intervals_analysis_${
			isTimeAnalysis ? 'time' : 'games'
		}_${format(new Date(), 'yyyyMMdd_HHmmss')}.xlsx`,
		creator: 'Crash Game Analytics',
		sheets: [
			{
				name: 'Intervals Data',
				columns,
				data: rows,
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
						parameter: 'Crash Point',
						value: currentConfig.value,
					},
					{
						parameter: isTimeAnalysis
							? 'Hours Analyzed'
							: 'Games Analyzed',
						value: currentConfig.hours,
					},
					{
						parameter: isTimeAnalysis
							? 'Interval Duration'
							: 'Games Per Set',
						value: isTimeAnalysis
							? `${currentConfig.intervalMinutes} minutes`
							: `${currentConfig.intervalMinutes} games`,
					},
					{
						parameter: 'Analysis Type',
						value: isTimeAnalysis ? 'Time-based' : 'Game-based',
					},
				],
				autoFilter: false,
				freezeHeader: true,
			},
		],
	};

	return excelConfig;
};
