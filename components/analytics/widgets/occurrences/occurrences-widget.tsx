'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { AnalyticsCard } from '../../core/AnalyticsCard';
import { useRealTimeOccurrences } from '@/hooks/analytics';
import { Controls } from './controls';
import { DataTable } from './data-table';
import { generateOccurrencesHtmlConfig } from '@/utils/export-utils/occurrences-html';
import type { BaseWidgetProps } from '@/utils/export-utils/types';
import {
	CURRENT_STREAK_POINTS,
	UNIQUE_STREAK_POINTS,
} from '@/utils/export-utils/types';
import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';
import { isComparisonData } from './types';

// All crash points for API requests
const ALL_CRASH_POINTS = [
	...new Set([...CURRENT_STREAK_POINTS, ...UNIQUE_STREAK_POINTS]),
];

export function OccurrencesTable({ className }: BaseWidgetProps) {
	// State variables for component
	const [selectedType, setSelectedType] = useState<'current' | 'unique'>(
		'current'
	);
	const [analyzeBy, setAnalyzeBy] = useState<'games' | 'time'>('games');
	const [limit, setLimit] = useState(2000);
	const [limitInput, setLimitInput] = useState(limit.toString());
	const [hours, setHours] = useState(24);
	const [hoursInput, setHoursInput] = useState(hours.toString());
	const [showComparison, setShowComparison] = useState(false);

	// Update input values when limit/hours change externally
	useEffect(() => {
		setLimitInput(limit.toString());
	}, [limit]);

	useEffect(() => {
		setHoursInput(hours.toString());
	}, [hours]);

	// Handle limit input changes
	const handleLimitInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Just update the input value, don't update limit yet
		setLimitInput(e.target.value);
	};

	// Apply limit change
	const applyLimitChange = () => {
		const newLimit = Number.parseInt(limitInput, 10);
		// Ensure limit is within valid range and is a number
		if (!Number.isNaN(newLimit) && newLimit >= 100 && newLimit <= 10000) {
			setLimit(newLimit);
		} else {
			// Reset to current limit if invalid
			setLimitInput(limit.toString());
		}
	};

	// Handle hours input changes
	const handleHoursInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Just update the input value, don't update hours yet
		setHoursInput(e.target.value);
	};

	// Apply hours change
	const applyHoursChange = () => {
		const newHours = Number.parseInt(hoursInput, 10);
		// Ensure hours is within valid range and is a number
		if (!Number.isNaN(newHours) && newHours >= 1 && newHours <= 168) {
			setHours(newHours);
		} else {
			// Reset to current hours if invalid
			setHoursInput(hours.toString());
		}
	};

	// Handle key down for both inputs
	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		applyFn: () => void
	) => {
		if (e.key === 'Enter') {
			applyFn();
		}
	};

	// Get the current points to display based on selected tab
	const pointsToShow =
		selectedType === 'current'
			? CURRENT_STREAK_POINTS
			: UNIQUE_STREAK_POINTS;

	// Fetch data with real-time updates
	const {
		data: occurrencesData,
		isLoading: occurrencesLoading,
		error: occurrencesError,
	} = useRealTimeOccurrences({
		values: ALL_CRASH_POINTS,
		analyzeBy,
		limit,
		hours,
		comparison: showComparison,
	});

	// Debug logging
	useEffect(() => {
		console.log('Occurrences Data:', occurrencesData);
		console.log('Loading State:', occurrencesLoading);
		console.log('Error State:', occurrencesError);
	}, [occurrencesData, occurrencesLoading, occurrencesError]);

	// Generate Excel export configuration
	const getExcelConfig = async (): Promise<ExcelExportConfig> => {
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
							? `≥ ${point}${
									point === Math.floor(point) ? '.0' : ''
							  }`
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
							? `≥ ${point}${
									point === Math.floor(point) ? '.0' : ''
							  }`
							: `= ${point}${
									point === Math.floor(point) ? '.0' : ''
							  }`,
					occurrences: currentData.count,
					...(showComparison
						? {
								change: `${
									comparison.count_diff > 0 ? '+' : ''
								}${comparison.count_diff}`,
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
						: `= ${point}${
								point === Math.floor(point) ? '.0' : ''
						  }`,
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
							header:
								analyzeBy === 'games' ? '% Change' : '% Diff',
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

	// Generate HTML chart configuration
	const getChartConfig = async (): Promise<HtmlChartConfig> => {
		// Use the dedicated utility to generate the HTML config
		return generateOccurrencesHtmlConfig({
			selectedType,
			analyzeBy,
			limit,
			hours,
			showComparison,
			occurrencesData: occurrencesData || undefined,
			pointsToShow,
		});
	};

	// Render content
	const renderContent = () => {
		if (occurrencesError) {
			return (
				<Alert
					variant="destructive"
					className="mt-2"
				>
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>
						{occurrencesError.message}
					</AlertDescription>
				</Alert>
			);
		}

		return (
			<div className="w-full">
				<Controls
					selectedType={selectedType}
					setSelectedType={setSelectedType}
					analyzeBy={analyzeBy}
					setAnalyzeBy={setAnalyzeBy}
					limitInput={limitInput}
					hoursInput={hoursInput}
					showComparison={showComparison}
					setShowComparison={setShowComparison}
					handleLimitInputChange={handleLimitInputChange}
					handleHoursInputChange={handleHoursInputChange}
					applyLimitChange={applyLimitChange}
					applyHoursChange={applyHoursChange}
					handleKeyDown={handleKeyDown}
					getExcelConfig={getExcelConfig}
					getChartConfig={getChartConfig}
				/>

				<DataTable
					selectedType={selectedType}
					analyzeBy={analyzeBy}
					showComparison={showComparison}
					pointsToShow={pointsToShow}
					occurrencesData={occurrencesData || undefined}
					isLoading={occurrencesLoading}
				/>
			</div>
		);
	};

	return (
		<AnalyticsCard
			title="Occurrences Analysis"
			description="Frequency analysis of crash points"
			className={className}
		>
			{renderContent()}
		</AnalyticsCard>
	);
}
