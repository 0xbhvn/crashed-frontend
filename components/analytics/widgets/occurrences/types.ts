import type {
	OccurrenceComparisonData,
	OccurrencesData,
	OccurrenceData,
} from '@/utils/analytics-types';
import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';

// Props for the main controls component
export interface OccurrencesControlsProps {
	selectedType: 'current' | 'unique';
	setSelectedType: (value: 'current' | 'unique') => void;
	analyzeBy: 'games' | 'time';
	setAnalyzeBy: (value: 'games' | 'time') => void;
	limitInput: string;
	hoursInput: string;
	showComparison: boolean;
	setShowComparison: (value: boolean) => void;
	handleLimitInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleHoursInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	applyLimitChange: () => void;
	applyHoursChange: () => void;
	handleKeyDown: (
		e: React.KeyboardEvent<HTMLInputElement>,
		applyFn: () => void
	) => void;
	getExcelConfig: () => Promise<ExcelExportConfig>;
	getChartConfig: () => Promise<HtmlChartConfig>;
}

// Props for the data table component
export interface OccurrencesTableProps {
	selectedType: 'current' | 'unique';
	analyzeBy: 'games' | 'time';
	showComparison: boolean;
	pointsToShow: number[];
	occurrencesData?: OccurrencesData;
	isLoading: boolean;
}

// Props for the cell content component
export interface CellContentProps {
	point: number;
	selectedType: 'current' | 'unique';
	pointKey: string;
	dataItem?:
		| OccurrenceData
		| OccurrenceComparisonData
		| {
				count: number;
				percentage: number;
				comparison: {
					count_change?: number;
					count_diff?: number;
					percentage_change?: number;
					percentage_diff?: number;
					count_percent_change?: number;
				};
		  }
		| null
		| undefined;
	showComparison: boolean;
	analyzeBy: 'games' | 'time';
}

// Helper function to check if the data is comparison data
export function isComparisonData(data: unknown): data is
	| OccurrenceComparisonData
	| {
			comparison: {
				count_change?: number;
				count_diff?: number;
				percentage_change?: number;
				percentage_diff?: number;
				count_percent_change?: number;
				[key: string]: number | undefined;
			};
	  } {
	return (
		data !== null &&
		typeof data === 'object' &&
		(('current_period' in data && 'comparison' in data) ||
			('comparison' in data && 'count' in data && 'percentage' in data))
	);
}
