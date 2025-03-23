'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';
import type { KeyboardEvent, ChangeEvent } from 'react';
import { formatDuration, intervalToDuration } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import {
	CURRENT_STREAK_POINTS,
	UNIQUE_STREAK_POINTS,
} from '@/utils/export-utils/types';
import type { BatchLastGamesData } from '@/utils/analytics-types';

// Initial points to display in the cards
const INITIAL_DISPLAY_POINTS = [2, 10];

interface CrashPointCardsProps {
	selectedType: 'current' | 'unique';
	batchData: BatchLastGamesData | null;
	// Optional timeAgoMap - if not provided, we'll calculate it internally
	timeAgoMap?: Record<number, string>;
}

export function CrashPointCards({
	selectedType,
	batchData,
	timeAgoMap: externalTimeAgoMap,
}: CrashPointCardsProps) {
	const [displayPoints, setDisplayPoints] = useState<number[]>(
		INITIAL_DISPLAY_POINTS
	);
	const [internalTimeAgoMap, setInternalTimeAgoMap] = useState<
		Record<number, string>
	>({});
	const [allCrashPoints, setAllCrashPoints] = useState<number[]>([
		...new Set([...CURRENT_STREAK_POINTS, ...UNIQUE_STREAK_POINTS]),
	]);
	const [editingPoint, setEditingPoint] = useState<number | null>(null);
	const [editingValue, setEditingValue] = useState<string>('');
	const editInputRef = useRef<HTMLInputElement>(null);

	// Use externally provided timeAgoMap if available, otherwise use internal one
	const timeAgoMap = externalTimeAgoMap || internalTimeAgoMap;

	// Update time ago strings every second (only if externalTimeAgoMap is not provided)
	useEffect(() => {
		// Skip if external timeAgoMap is provided
		if (externalTimeAgoMap) return;

		// Skip if no batchData
		if (!batchData) return;

		const updateTimeAgo = () => {
			const newTimeAgoMap: Record<number, string> = {};

			for (const point of displayPoints) {
				const pointData = batchData[point];
				if (!pointData) continue;

				// Use the appropriate game data based on selected tab
				const gameData =
					selectedType === 'current'
						? pointData?.currentGame
						: pointData?.uniqueGame;

				if (gameData?.beginTime) {
					const interval = intervalToDuration({
						start: new Date(gameData.beginTime),
						end: new Date(),
					});

					const formatted = formatDuration(interval, {
						format: ['hours', 'minutes'],
						delimiter: ', ',
					});

					newTimeAgoMap[point] = formatted
						? `${formatted} ago`
						: 'just now';
				}
			}

			setInternalTimeAgoMap(newTimeAgoMap);
		};

		// Initial update
		updateTimeAgo();

		// Set up interval to update every second
		const intervalId = setInterval(updateTimeAgo, 1000);

		// Clean up on unmount
		return () => clearInterval(intervalId);
	}, [batchData, selectedType, displayPoints, externalTimeAgoMap]);

	// Get streak badge color based on value and crash point
	const getStreakBadgeColor = (value: number, point: number): string => {
		// For unique selection, always use blue badges
		if (selectedType === 'unique') {
			return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
		}

		// For current selection, use color coding based on value
		if (value <= point / 2) {
			return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'; // Red - bad
		}
		if (value <= point) {
			return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'; // Yellow - warning
		}
		return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'; // Green - good
	};

	// Format exact crash value
	const formatExactCrash = (value: number): string => {
		if (value.toFixed(2).endsWith('.00')) {
			return Math.floor(value).toString();
		}
		if (value.toFixed(2).endsWith('0')) {
			return value.toFixed(1);
		}
		return value.toFixed(2);
	};

	// Start editing a crash point
	const startEditing = (point: number) => {
		setEditingPoint(point);
		setEditingValue(point.toString());
		// Focus after state update
		setTimeout(() => {
			if (editInputRef.current) {
				editInputRef.current.focus();
			}
		}, 0);
	};

	// Handle input changes when editing
	const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEditingValue(e.target.value);
	};

	// Finish editing and update values
	const finishEditing = () => {
		if (editingPoint === null) return;

		// Validate input
		const newPointValue = Number.parseFloat(editingValue);
		if (Number.isNaN(newPointValue) || newPointValue <= 0) {
			setEditingPoint(null);
			return;
		}

		// Replace the edited point with the new value
		const updatedPoints = displayPoints.map((p) =>
			p === editingPoint ? newPointValue : p
		);

		// Add the new value to all crash points (if it's not already there)
		const updatedAllPoints = [
			...new Set([...allCrashPoints, newPointValue]),
		];

		setDisplayPoints(updatedPoints);
		setAllCrashPoints(updatedAllPoints);
		setEditingPoint(null);
	};

	// Handle keyboard events during editing
	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' || e.key === 'Tab') {
			e.preventDefault();
			finishEditing();
		} else if (e.key === 'Escape') {
			setEditingPoint(null);
		}
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-6">
			{displayPoints.map((point) => {
				// Get data for this point
				const pointData = batchData?.[point];
				const streakValue = pointData?.[selectedType] ?? 0;

				// Use the appropriate game data based on selected type
				const gameData =
					selectedType === 'current'
						? pointData?.currentGame
						: pointData?.uniqueGame;

				const exact = gameData?.crashPoint;

				return (
					<Card key={point}>
						<CardContent className="p-4">
							<div className="flex flex-col gap-2">
								{/* Top section: Crash point and streak count */}
								<div className="flex justify-between items-start">
									<div className="flex flex-col">
										<div className="flex items-center gap-3">
											{editingPoint === point ? (
												<input
													ref={editInputRef}
													type="text"
													value={editingValue}
													onChange={handleEditChange}
													onBlur={finishEditing}
													onKeyDown={handleKeyDown}
													className="w-28 bg-transparent border-b border-input focus:border-primary outline-none text-5xl font-semibold"
												/>
											) : (
												<button
													onClick={() =>
														startEditing(point)
													}
													className="bg-transparent border-none p-0 cursor-pointer hover:text-primary text-5xl font-semibold"
													aria-label={`Edit ${point}x crash point`}
													type="button"
												>
													{point}x
												</button>
											)}

											<Badge
												className={cn(
													'px-5 py-2.5 font-semibold text-3xl h-12',
													getStreakBadgeColor(
														streakValue,
														point
													)
												)}
											>
												{streakValue}
											</Badge>
										</div>
										<div className="text-sm text-muted-foreground mt-1">
											{selectedType === 'current'
												? 'Current streak ≥'
												: 'Unique streak ='}{' '}
											{point}x
										</div>
									</div>

									{/* Exact Value moved to top section */}
									{gameData && exact !== undefined ? (
										<div className="flex flex-col items-end self-end">
											<div className="text-sm font-medium">
												{formatExactCrash(exact)}x
											</div>
											<div className="text-xs text-muted-foreground">
												Exact Value
											</div>
										</div>
									) : (
										<div className="flex flex-col items-end self-end">
											<Skeleton className="w-14 h-5 mb-1 rounded-sm" />
											<div className="text-xs text-muted-foreground">
												Exact Value
											</div>
										</div>
									)}
								</div>

								{/* Bottom section: Game ID and time ago */}
								<div className="flex justify-between items-end mt-2">
									<div className="flex flex-col">
										<div className="text-sm font-medium">
											{gameData ? (
												`#${gameData.gameId}`
											) : (
												<Skeleton className="w-20 h-5 rounded-sm" />
											)}
										</div>
										<div className="text-xs text-muted-foreground">
											Last Game
										</div>
									</div>

									<div className="flex flex-col items-end">
										<div className="text-sm font-medium">
											{gameData ? (
												timeAgoMap[point] ||
												'calculating...'
											) : (
												<Skeleton className="w-24 h-5 rounded-sm" />
											)}
										</div>
										<div className="text-xs text-muted-foreground">
											Time Since
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}
