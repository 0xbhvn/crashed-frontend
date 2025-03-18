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
}

export interface BatchLastGamesData {
	[key: number]: BatchGameData;
}

// Shared API responses
export interface ApiGameResponse {
	game: GameData | null;
	games_since: number;
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
