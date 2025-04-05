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

// Shared constants for streak points used in LastGamesTable and OccurrencesTable
export const CURRENT_STREAK_POINTS = [
	2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 30, 40, 50, 100, 150, 200, 500, 1000,
];

export const UNIQUE_STREAK_POINTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Interval durations used in the IntervalsWidget for time-based analysis
export type TimeIntervalDuration = 10 | 15 | 30;
export const TIME_INTERVAL_OPTIONS: TimeIntervalDuration[] = [10, 15, 30];

// Interval sizes used in the IntervalsWidget for games-based analysis
export type GameIntervalSize = 20 | 25 | 50;
export const GAME_INTERVAL_OPTIONS: GameIntervalSize[] = [20, 25, 50];

// Type for game set size options
export type GameSetSize = 10 | 20 | 25 | 50;

// Constants for export/display if needed
export const GAME_SET_SIZE_OPTIONS: GameSetSize[] = [10, 20, 25, 50];

// Common pattern for all widget and table component props
export interface BaseWidgetProps {
	className?: string;
}

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
