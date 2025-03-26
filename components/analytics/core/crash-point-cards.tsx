'use client';
/* eslint-disable react-hooks/exhaustive-deps */

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
	// Callback for when a crash point is changed or added
	onCrashPointChange?: (newPoint: number) => void;
	// Default points to consider when checking if a point is custom
	defaultPoints?: number[];
	// Function to check if a specific point is loading
	isValueLoading?: (value: number) => boolean;
}

export function CrashPointCards({
	selectedType,
	batchData,
	timeAgoMap: externalTimeAgoMap,
	onCrashPointChange,
	defaultPoints = [],
	isValueLoading,
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
	const [cardPositions, setCardPositions] = useState<Record<number, number>>(
		{}
	);
	const originalPointsRef = useRef<Record<number, number>>({});

	// Use externally provided timeAgoMap if available, otherwise use internal one
	const timeAgoMap = externalTimeAgoMap || internalTimeAgoMap;

	// Initialize card positions - only once on component mount
	const initializedRef = useRef(false);
	useEffect(() => {
		// Skip if already initialized to prevent re-initialization
		if (initializedRef.current) return;

		// Use a function to safely access the current displayPoints
		function initializeCardPositions() {
			const initialPositions: Record<number, number> = {};
			// Access displayPoints directly from current scope
			INITIAL_DISPLAY_POINTS.forEach((point, index) => {
				initialPositions[point] = index;
			});
			setCardPositions(initialPositions);
		}

		initializeCardPositions();
		initializedRef.current = true;
	}, []);

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

	// Custom hook to safely access the latest values without triggering effect dependency cycles
	const getLatestValues = useRef(() => ({
		displayPoints,
		cardPositions,
		onCrashPointChange,
	})).current;

	// React to selectedType changes with a ref to prevent infinite updates
	const selectedTypeRef = useRef(selectedType);
	useEffect(() => {
		// Skip if the selectedType hasn't actually changed to prevent unnecessary updates
		if (selectedTypeRef.current === selectedType) return;

		// Update our ref with the new type first to prevent re-entry
		selectedTypeRef.current = selectedType;

		// Get latest values using the stable getter
		const { displayPoints, cardPositions, onCrashPointChange } =
			getLatestValues();

		// When switching to unique mode, floor decimal values
		if (selectedType === 'unique') {
			const newDisplayPoints = [...displayPoints];
			let positionsUpdated = false;

			// Process all points in a single update
			for (let i = 0; i < newDisplayPoints.length; i++) {
				const point = newDisplayPoints[i];
				if (point !== Math.floor(point)) {
					const flooredPoint = Math.floor(point);

					// Remember original value to restore later
					originalPointsRef.current[flooredPoint] = point;

					// Update the point in our copy
					newDisplayPoints[i] = flooredPoint;
					positionsUpdated = true;
				}
			}

			// Only update state if we actually made changes
			if (positionsUpdated) {
				// Update positions in one batch
				const newPositions = { ...cardPositions };
				for (let i = 0; i < displayPoints.length; i++) {
					const oldPoint = displayPoints[i];
					const newPoint = newDisplayPoints[i];
					if (oldPoint !== newPoint) {
						newPositions[newPoint] = newPositions[oldPoint];
						delete newPositions[oldPoint];
					}
				}

				// Apply all changes in one go
				setCardPositions(newPositions);
				// Use a callback to ensure we're working with the latest state
				setDisplayPoints(() => [...newDisplayPoints]);
			}
		}
		// When switching to current mode, restore original decimal values
		else if (selectedType === 'current') {
			const newDisplayPoints = [...displayPoints];
			let positionsUpdated = false;
			let needsDataRefresh = false;

			// Process all points in a single update
			for (let i = 0; i < newDisplayPoints.length; i++) {
				const point = newDisplayPoints[i];
				if (originalPointsRef.current[point]) {
					const originalValue = originalPointsRef.current[point];

					// Update the point in our copy
					newDisplayPoints[i] = originalValue;
					positionsUpdated = true;
					needsDataRefresh = true;
				}
			}

			// Only update state if we actually made changes
			if (positionsUpdated) {
				// Update positions in one batch
				const newPositions = { ...cardPositions };
				for (let i = 0; i < displayPoints.length; i++) {
					const oldPoint = displayPoints[i];
					const newPoint = newDisplayPoints[i];
					if (oldPoint !== newPoint) {
						newPositions[newPoint] = newPositions[oldPoint];
						delete newPositions[oldPoint];
					}
				}

				// Apply all changes in one go - use function form to ensure we're using latest state
				setCardPositions(() => ({ ...newPositions }));
				setDisplayPoints(() => [...newDisplayPoints]);

				// Notify parent we need data for restored values (only once)
				if (needsDataRefresh && onCrashPointChange) {
					// Find the first restored value and use setTimeout to break potential update cycles
					setTimeout(() => {
						for (let i = 0; i < newDisplayPoints.length; i++) {
							const newPoint = newDisplayPoints[i];
							const oldPoint = displayPoints[i];
							if (newPoint !== oldPoint) {
								onCrashPointChange(newPoint);
								break; // Just fetch one to trigger refresh
							}
						}
					}, 0);
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedType, getLatestValues]);

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
		const inputValue = e.target.value;

		// For unique/exact mode, only allow integers
		if (selectedType === 'unique') {
			// Only allow digits (no decimal point)
			if (/^\d*$/.test(inputValue)) {
				setEditingValue(inputValue);
			}
		} else {
			// Allow decimals for current mode
			if (/^\d*\.?\d*$/.test(inputValue)) {
				setEditingValue(inputValue);
			}
		}
	};

	// Finish editing and update values
	const finishEditing = () => {
		if (editingPoint === null) return;

		// Validate input
		let newPointValue = Number.parseFloat(editingValue);
		if (Number.isNaN(newPointValue) || newPointValue <= 0) {
			setEditingPoint(null);
			return;
		}

		// For unique/exact mode, ensure we use integers only
		if (selectedType === 'unique') {
			newPointValue = Math.floor(newPointValue);
		}

		// Check if this is a new value or just editing the same value
		const isNewValue = newPointValue !== editingPoint;

		const positionIndex = cardPositions[editingPoint];

		// Update the display points by replacing the edited point with the new value
		const updatedPoints = [...displayPoints];
		updatedPoints[positionIndex] = newPointValue;

		// Update cardPositions to track the new value's position
		const updatedPositions = { ...cardPositions };
		delete updatedPositions[editingPoint];
		updatedPositions[newPointValue] = positionIndex;

		// Add the new value to all crash points (if it's not already there)
		const updatedAllPoints = [...allCrashPoints];
		if (!updatedAllPoints.includes(newPointValue)) {
			updatedAllPoints.push(newPointValue);
		}

		setDisplayPoints(updatedPoints);
		setCardPositions(updatedPositions);
		setAllCrashPoints(updatedAllPoints);
		setEditingPoint(null);

		// Notify parent component about the change if value actually changed
		if (isNewValue && onCrashPointChange) {
			onCrashPointChange(newPointValue);
		}
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

	// Check if a point is custom (not in default points)
	const isCustomPoint = (point: number): boolean => {
		return !defaultPoints.includes(point);
	};

	return (
		<div className="w-full mb-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
				{displayPoints.map((point) => {
					// Get data for this point
					const pointData = batchData?.[point];
					const streakValue = pointData?.[selectedType] ?? null;
					// Show loading state when entire batchData is null OR when this specific point's data is missing
					const isLoading = isValueLoading
						? isValueLoading(point)
						: batchData === null || pointData === undefined;

					// Use the appropriate game data based on selected type
					const gameData =
						selectedType === 'current'
							? pointData?.currentGame
							: pointData?.uniqueGame;

					const exact = gameData?.crashPoint;
					const isCustom = isCustomPoint(point);

					return (
						<Card key={`card-${point}-${cardPositions[point]}`}>
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
														onChange={
															handleEditChange
														}
														onBlur={finishEditing}
														onKeyDown={
															handleKeyDown
														}
														className="w-28 bg-transparent border-b border-input focus:border-primary outline-none text-5xl font-semibold"
													/>
												) : (
													<button
														onClick={() =>
															startEditing(point)
														}
														className={cn(
															'bg-transparent border-none p-0 cursor-pointer hover:text-primary text-5xl font-semibold',
															isCustom &&
																'text-primary'
														)}
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
															streakValue || 0,
															point
														)
													)}
												>
													{isLoading
														? '-'
														: streakValue !== null
														? streakValue
														: '-'}
												</Badge>
											</div>
											<div className="text-sm text-muted-foreground mt-1">
												{selectedType === 'current'
													? 'Current streak ≥'
													: 'Unique streak ='}{' '}
												{point}x
												{selectedType === 'unique' &&
													originalPointsRef.current[
														point
													] && (
														<span className="text-yellow-600 dark:text-yellow-400 ml-1">
															(floored from{' '}
															{
																originalPointsRef
																	.current[
																	point
																]
															}
															x)
														</span>
													)}
											</div>
										</div>

										{/* Exact Value moved to top section */}
										{isLoading ? (
											<div className="flex flex-col items-end self-end">
												<Skeleton className="w-14 h-5 mb-1 rounded-sm" />
												<div className="text-xs text-muted-foreground">
													Exact Value
												</div>
											</div>
										) : gameData && exact !== undefined ? (
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
												<div className="text-sm font-medium">
													-
												</div>
												<div className="text-xs text-muted-foreground">
													Exact Value
												</div>
											</div>
										)}
									</div>

									{/* Bottom section: Game ID and time ago */}
									<div className="flex justify-between items-end mt-2">
										{/* Time Since (left side) */}
										<div className="flex flex-col">
											{isLoading ? (
												<Skeleton className="w-28 h-7 mb-1 rounded-sm" />
											) : gameData ? (
												<div className="text-lg font-medium">
													{timeAgoMap[point] ||
														'calculating...'}
												</div>
											) : (
												<div className="text-lg font-medium">
													-
												</div>
											)}
											<div className="text-xs text-muted-foreground">
												Time Since
											</div>
										</div>

										{/* Game ID (right side) */}
										<div className="flex flex-col items-end">
											{isLoading ? (
												<Skeleton className="w-20 h-5 rounded-sm" />
											) : gameData ? (
												<div className="text-sm font-medium">
													{`#${gameData.gameId}`}
												</div>
											) : (
												<div className="text-sm font-medium">
													-
												</div>
											)}
											<div className="text-xs text-muted-foreground">
												Last Game
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
