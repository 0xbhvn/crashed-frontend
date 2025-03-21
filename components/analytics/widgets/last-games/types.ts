import type { ExcelExportConfig } from '@/utils/export-utils/excel';
import type { HtmlChartConfig } from '@/utils/export-utils/chart-html';
import type { BatchLastGamesData } from '@/utils/analytics-types';

// Time ago map structure
export type TimeAgoMap = Record<number, string>;

// Props for the LastGamesTable component
export interface LastGamesControls {
	selectedType: 'current' | 'unique';
	setSelectedType: (value: 'current' | 'unique') => void;
	getExcelConfig: () => Promise<ExcelExportConfig>;
	getChartConfig: () => Promise<HtmlChartConfig>;
}

// Props for the data table component
export interface LastGamesDataTableProps {
	selectedType: 'current' | 'unique';
	pointsToShow: number[];
	batchData?: BatchLastGamesData | null;
	timeAgoMap: TimeAgoMap;
	isLoading: boolean;
}
