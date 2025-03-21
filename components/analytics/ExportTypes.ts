// Re-export from the new location
export {
	ExportButton,
	type ExportButtonProps,
} from '@/components/export-button';

export type {
	ExcelExportConfig,
	ExcelColumnDefinition,
	ExcelSheetConfig,
} from '@/utils/export-utils/excel';

export type {
	HtmlChartConfig,
	ChartDefinition,
	ChartDataset,
	TableColumn,
} from '@/utils/export-utils/chart-html';

// Keep the SeriesExportData type for backward compatibility
export interface SeriesExportData {
	length: number;
	seriesId: string;
	startGameId: string;
	endGameId: string;
	startTime: Date;
	endTime: Date;
	followCount: number;
	followGames?: string[];
}

// Legacy config type for backward compatibility
export interface ExportConfig {
	value: number;
	analyzeBy: 'games' | 'time';
	limit: number;
	hours: number;
	sortBy: 'time' | 'length';
	showCircles: boolean;
}
