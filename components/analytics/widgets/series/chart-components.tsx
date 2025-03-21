'use client';

import * as React from 'react';
import type { FollowCircleProps, FollowStreakLabelProps } from './types';

// CSS for pulsing effect
export const pulseKeyframes = `
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.pulse-animation {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
`;

// Memoized circle component to prevent unnecessary re-renders
export const FollowCircle = React.memo(
	({ cx, cy, r, fill, keyValue }: FollowCircleProps) => (
		<circle
			key={keyValue}
			cx={cx}
			cy={cy}
			r={r}
			fill={fill}
		/>
	),
	// Custom comparison function to only re-render when props actually change
	(prevProps, nextProps) => {
		return (
			prevProps.cx === nextProps.cx &&
			prevProps.cy === nextProps.cy &&
			prevProps.r === nextProps.r &&
			prevProps.fill === nextProps.fill &&
			prevProps.keyValue === nextProps.keyValue
		);
	}
);
FollowCircle.displayName = 'FollowCircle';

// Memoized follow streak label component with optimized circle generation
export const FollowStreakLabel = React.memo(
	(props: Record<string, unknown>) => {
		const { x, y, value, width, index, payload, showCircles } =
			props as FollowStreakLabelProps;

		// Create a stable reference for the component instance - MUST be before any conditional returns
		// This is the key optimization: only recreate circles if the data ID changes
		const stableRef = React.useRef<{
			lastDataId: string;
			circleElements: React.ReactNode[];
		}>({ lastDataId: '', circleElements: [] });

		// Return null if values aren't valid or circles should be hidden
		if (
			x === undefined ||
			y === undefined ||
			value === undefined ||
			value === null ||
			!showCircles
		) {
			return null;
		}

		// Convert to number and validate
		const numValue = Number(value);
		if (Number.isNaN(numValue) || numValue <= 0) {
			return null;
		}

		// Get bar width - ensure we have a stable width
		const barWidth = Number(width || 20);

		// Calculate circle properties
		// Make circles 40% of bar width
		const circleSize = barWidth * 0.4;

		// Center the circle horizontally
		const xCenter = barWidth / 2;

		// Display all circles - no limit
		const displayCount = Math.floor(numValue);

		// Get stable data identifier from payload
		const dataId = payload?.seriesId || `data-${index || 0}`;

		// Only regenerate circles if the dataId has changed or first render
		if (stableRef.current.lastDataId !== dataId) {
			stableRef.current.lastDataId = dataId;
			stableRef.current.circleElements = Array.from({
				length: displayCount,
			}).map((_, i) => {
				const yPos = -(i * (circleSize * 2 + 2)) - 5;
				const circleKey = `follow-circle-${dataId}-${i}`;

				return (
					<FollowCircle
						key={circleKey}
						keyValue={circleKey}
						cx={xCenter}
						cy={yPos}
						r={circleSize}
						fill="currentColor"
					/>
				);
			});
		}

		return (
			<g
				transform={`translate(${x}, ${Number(y) - circleSize})`}
				className="text-foreground"
			>
				{stableRef.current.circleElements}
			</g>
		);
	},
	// Very strict comparison function
	(prevProps, nextProps) => {
		const prev = prevProps as FollowStreakLabelProps;
		const next = nextProps as FollowStreakLabelProps;

		// If showCircles changed, we need to re-render
		if (prev.showCircles !== next.showCircles) {
			return false;
		}

		// Skip updates entirely for the same data point
		if (prev.payload?.seriesId === next.payload?.seriesId) {
			return true; // Prevent update
		}

		// If the position changed but not the content, allow the update
		return prev.value === next.value && prev.width === next.width;
	}
);
FollowStreakLabel.displayName = 'FollowStreakLabel';
