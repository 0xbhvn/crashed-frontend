import { format, parseISO } from 'date-fns';
import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { IntervalGridData } from '@/utils/analytics-types';
import type { HourTotalsMap } from './types';
import type { IntervalDuration } from '@/utils/export-utils/types';

interface IntervalConfig {
	value: number;
	hours: number;
	intervalMinutes: IntervalDuration;
}

export const getExcelConfig = (
	currentConfig: IntervalConfig,
	gridData: IntervalGridData,
	hourLabels: string[],
	hourTotals: HourTotalsMap
): ExcelExportConfig => {
	// Get the interval columns
	const intervalColumns: string[] = [];
	for (let i = 0; i < 60; i += currentConfig.intervalMinutes) {
		const columnKey = i.toString().padStart(2, '0');
		intervalColumns.push(columnKey);
	}

	// Prepare data for rows in the Excel sheet
	const rows = hourLabels.map((hourKey) => {
		try {
			// Format date for display
			const date = parseISO(`${hourKey}:00:00`);
			const hourDisplay = format(date, 'MMM dd, yyyy h a');

			// Create base row with hour information
			const row: Record<string, string | number> = {
				hour: hourDisplay,
				total: hourTotals[hourKey]?.count || 0,
				totalGames: hourTotals[hourKey]?.totalGames || 0,
				percentage: hourTotals[hourKey]?.percentage
					? `${hourTotals[hourKey]?.percentage.toFixed(2)}%`
					: '0.00%',
			};

			// Add data for each interval column
			for (const columnKey of intervalColumns) {
				const interval = gridData[hourKey]?.[columnKey];
				row[`int_${columnKey}`] = interval ? interval.count : 0;
				row[`pct_${columnKey}`] = interval
					? `${interval.percentage.toFixed(2)}%`
					: '0.00%';
			}

			return row;
		} catch {
			// Return a row with default values in case of an error
			return {
				hour: hourKey,
				total: 0,
				totalGames: 0,
				percentage: '0.00%',
			};
		}
	});

	// Create columns for the Excel sheet
	const columns = [
		{ header: 'Hour', key: 'hour', width: 20 },
		{ header: 'Total Count', key: 'total', width: 15 },
		{ header: 'Total Games', key: 'totalGames', width: 15 },
		{ header: 'Percentage', key: 'percentage', width: 15 },
	];

	// Add interval columns
	for (const columnKey of intervalColumns) {
		// Format the interval range (e.g., "00-10" for a 10-minute interval)
		const intervalEnd = (
			(Number.parseInt(columnKey, 10) + currentConfig.intervalMinutes) %
			60
		)
			.toString()
			.padStart(2, '0');
		const intervalLabel = `${columnKey}-${intervalEnd}`;

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
		fileName: `intervals_analysis_${format(
			new Date(),
			'yyyyMMdd_HHmmss'
		)}.xlsx`,
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
						parameter: 'Hours Analyzed',
						value: currentConfig.hours,
					},
					{
						parameter: 'Interval Duration',
						value: `${currentConfig.intervalMinutes} minutes`,
					},
				],
				autoFilter: false,
				freezeHeader: true,
			},
		],
	};

	return excelConfig;
};
