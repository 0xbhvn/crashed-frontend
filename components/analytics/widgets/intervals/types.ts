import type {
	TimeIntervalDuration,
	GameIntervalSize,
} from '@/utils/export-utils/types';
import type { IntervalData } from '@/utils/analytics-types';

// Interval hour total information
export interface HourTotal {
	count: number;
	totalGames: number;
	percentage: number;
}

// Map of hour keys to their totals
export interface HourTotalsMap {
	[hourKey: string]: HourTotal;
}

// Interval export configuration
export interface IntervalsExportConfig {
	value: number;
	hours: number;
	intervalMinutes: TimeIntervalDuration | GameIntervalSize;
	analyzeBy?: 'time' | 'games';
}

// Grid cell display type
export interface IntervalCellData {
	data?: IntervalData;
	isCurrentInterval: boolean;
}
