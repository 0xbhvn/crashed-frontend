'use client';

import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { AnalyticsCard } from '../../core/analytics-card';
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
import { getExcelConfig as getExcelConfigUtil } from './excel-export';

// All crash points for API requests
const ALL_CRASH_POINTS = [
	...new Set([...CURRENT_STREAK_POINTS, ...UNIQUE_STREAK_POINTS]),
];

interface OccurrencesTableProps extends BaseWidgetProps {
	selectedType?: 'current' | 'unique';
}

export function OccurrencesTable({ className, selectedType: propSelectedType }: OccurrencesTableProps) {
	// State variables for component
	const [selectedType, setSelectedType] = useState<'current' | 'unique'>(
		propSelectedType || 'current'
	);
	const [analyzeBy, setAnalyzeBy] = useState<'games' | 'time'>('games');
	const [limit, setLimit] = useState(2000);
	const [limitInput, setLimitInput] = useState(limit.toString());
	const [hours, setHours] = useState(24);
	const [hoursInput, setHoursInput] = useState(hours.toString());
	const [showComparison, setShowComparison] = useState(true);

	// State to handle temporary loading when toggling comparison
	const [isTogglingComparison, setIsTogglingComparison] = useState(false);

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
	});

	// Generate Excel export configuration
	const getExcelConfig = async (): Promise<ExcelExportConfig> => {
		return getExcelConfigUtil({
			selectedType,
			analyzeBy,
			limit,
			hours,
			showComparison,
			occurrencesData: occurrencesData || undefined,
		});
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

	// Handle comparison toggle
	const toggleComparison = (value: boolean) => {
		// If turning comparison back on, show a loading state
		if (value) {
			setIsTogglingComparison(true);
			// Clear the toggling state after a short delay to simulate data loading
			setTimeout(() => {
				setIsTogglingComparison(false);
			}, 300);
		}
		setShowComparison(value);
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
					setShowComparison={toggleComparison}
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
					isLoading={occurrencesLoading || isTogglingComparison}
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
