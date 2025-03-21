// Types for Series Widget
export interface SeriesWidgetProps {
	defaultValue?: number;
	className?: string;
}

// Payload interface for follow streak data
export interface FollowStreakPayload {
	seriesId?: string;
	id?: number;
	[key: string]: unknown;
}

// Interface for follow circle props
export interface FollowCircleProps {
	cx: number;
	cy: number;
	r: number;
	fill: string;
	keyValue: string;
}

// Interface for follow streak label props
export interface FollowStreakLabelProps {
	x?: number | string;
	y?: number | string;
	value?: number | string;
	width?: number | string;
	index?: number;
	payload?: FollowStreakPayload;
	showCircles?: boolean;
}

// Game object interface
export interface GameObject {
	game_id: string;
	crash_point?: number;
	time?: string;
}
