'use client';

// Common game data structure across analytics hooks
export interface GameData {
	gameId: string;
	hashValue: string;
	crashPoint: number;
	calculatedPoint: number;
	crashedFloor: number;
	endTime: string;
	prepareTime: string;
	beginTime: string;
}

// Batch game data structures
export interface BatchGameData {
	current: number;
	unique: number;
	currentGame?: GameData | null;
	uniqueGame?: GameData | null;
	currentProbability?: number | null;
	uniqueProbability?: number | null;
}

export interface BatchLastGamesData {
	[key: number]: BatchGameData;
}

// Shared API responses
export interface ApiGameResponse {
	game: GameData | null;
	games_since: number;
	probability?: number;
}

// Occurrences API data structures
export interface OccurrenceData {
	count: number;
	total_games: number;
	percentage: number;
	first_game_time?: string;
	last_game_time?: string;
	start_time?: string;
	end_time?: string;
}

// New interface for comparison data
export interface OccurrenceComparisonData {
	current_period: OccurrenceData;
	previous_period: OccurrenceData;
	comparison: {
		count_diff: number;
		percentage_diff: number;
		count_percent_change: number;
		// Additional fields for API compatibility
		count_change?: number;
		percentage_change?: number;
	};
}

export interface BatchOccurrencesData {
	[key: string]: OccurrenceData | OccurrenceComparisonData;
}

// Combined occurrences data structure (for both current and unique)
export interface OccurrencesData {
	[key: string]: {
		current?: OccurrenceData | OccurrenceComparisonData;
		unique?: OccurrenceData | OccurrenceComparisonData;
	};
}

// Shared game processing utility
export function isGameAboveCrashPoint(
	game: GameData,
	crashPoint: number
): boolean {
	return game.crashPoint >= crashPoint;
}

// Type for individual interval data (time-based)
export interface IntervalData {
	interval_start: string;
	interval_end: string;
	count: number;
	total_games: number;
	percentage: number;
	is_most_recent?: boolean;
}

// New Type for individual game-set interval data
export interface GameSetIntervalData {
	set_id: number;
	start_game: number;
	end_game: number;
	count: number;
	total_games: number;
	percentage: number;
	start_time: string;
	end_time: string;
}

// Type for the grid data structure used in the Intervals widget (time-based)
export interface IntervalGridData {
	[hourKey: string]: {
		[intervalKey: string]: IntervalData | undefined;
	};
}

// New Type for the grid data structure (game-set based)
// Keyed by set number string for consistency with table rendering if needed
export interface GameSetIntervalGridData {
	[setNumberKey: string]: GameSetIntervalData | undefined;
}

// Type for the API response structure (both time and game-set, check context)
export interface IntervalsAnalysisResponse {
	status: string;
	data?: {
		min_value?: number;
		interval_minutes?: number;
		hours?: number;
		games_per_set?: number;
		total_games?: number;
		start_date?: string;
		end_date?: string;
		count?: number;
		intervals: (IntervalData | GameSetIntervalData)[];
	};
	message?: string;
}
