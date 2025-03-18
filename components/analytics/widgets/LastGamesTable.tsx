'use client';

import { useState, useEffect } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useRealTimeBatchGames } from '@/hooks/analytics/useRealTimeBatchGames';
import { AnalyticsCard } from '../core/AnalyticsCard';
import { Badge } from '@/components/ui/badge';
import { formatDuration, intervalToDuration } from 'date-fns';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LastGamesTableProps {
	className?: string;
}

// Min crash points (current streak) - all values
const CURRENT_STREAK_POINTS = [
	2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 30, 40, 50, 100, 150, 200, 500, 1000,
];

// Exact crash points (unique streak) - only 2-10
const UNIQUE_STREAK_POINTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// All crash points for API requests
const ALL_CRASH_POINTS = [
	...new Set([...CURRENT_STREAK_POINTS, ...UNIQUE_STREAK_POINTS]),
];

export function LastGamesTable({ className }: LastGamesTableProps) {
	const [selectedType, setSelectedType] = useState<'current' | 'unique'>(
		'current'
	);
	const [timeAgoMap, setTimeAgoMap] = useState<Record<number, string>>({});

	// Get the current points to display based on selected tab
	const pointsToShow =
		selectedType === 'current'
			? CURRENT_STREAK_POINTS
			: UNIQUE_STREAK_POINTS;

	// Fetch data with real-time updates
	const {
		data: batchData,
		isLoading: batchLoading,
		error: batchError,
	} = useRealTimeBatchGames({
		values: ALL_CRASH_POINTS,
	});

	// Skeleton component for loading state
	const TableSkeleton = () => {
		return (
			<>
				{Array.from({ length: pointsToShow.length }).map((_, index) => (
					<TableRow
						key={`skeleton-row-${index}-${selectedType}`}
						className="h-10"
					>
						<TableCell className="py-1">
							<div className="h-4 w-14 animate-pulse rounded bg-muted" />
						</TableCell>
						<TableCell className="py-1">
							<div className="h-5 w-10 animate-pulse rounded bg-muted" />
						</TableCell>
						<TableCell className="py-1">
							<div className="h-4 w-20 animate-pulse rounded bg-muted" />
						</TableCell>
						<TableCell className="py-1">
							<div className="h-4 w-14 animate-pulse rounded bg-muted" />
						</TableCell>
						<TableCell className="py-1">
							<div className="h-4 w-12 animate-pulse rounded bg-muted" />
						</TableCell>
					</TableRow>
				))}
			</>
		);
	};

	// Update time ago strings every second
	useEffect(() => {
		const updateTimeAgo = () => {
			if (!batchData) return;

			const newTimeAgoMap: Record<number, string> = {};

			for (const point of pointsToShow) {
				const pointData = batchData[point];
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

			setTimeAgoMap(newTimeAgoMap);
		};

		// Initial update
		updateTimeAgo();

		// Set up interval to update every second
		const intervalId = setInterval(updateTimeAgo, 1000);

		// Clean up on unmount
		return () => clearInterval(intervalId);
	}, [batchData, pointsToShow, selectedType]);

	// Get streak badge color based on value and crash point
	const getStreakBadgeColor = (streakValue: number, crashPoint: number) => {
		if (streakValue <= crashPoint / 2) {
			return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'; // Red
		}

		if (streakValue <= crashPoint) {
			return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'; // Yellow
		}

		return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'; // Green
	};

	// Render content
	const renderContent = () => {
		if (batchError) {
			return (
				<Alert
					variant="destructive"
					className="mt-2"
				>
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>{batchError.message}</AlertDescription>
				</Alert>
			);
		}

		return (
			<div className="w-full">
				<div className="flex mb-4">
					<Tabs
						defaultValue="current"
						value={selectedType}
						onValueChange={(value) =>
							setSelectedType(value as 'current' | 'unique')
						}
					>
						<TabsList className="grid w-[240px] grid-cols-2 bg-muted/50 p-0.5">
							<TabsTrigger
								value="current"
								className="data-[state=active]:bg-black data-[state=active]:text-white"
							>
								Above Value
							</TabsTrigger>
							<TabsTrigger
								value="unique"
								className="data-[state=active]:bg-black data-[state=active]:text-white"
							>
								Exact Value
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow className="h-9">
								<TableHead className="px-2 py-1.5 w-[100px]">
									Crash Point
								</TableHead>
								<TableHead className="px-2 py-1.5 w-[120px]">
									{selectedType === 'current'
										? 'Streak Count'
										: 'Streak Count'}
								</TableHead>
								<TableHead className="px-2 py-1.5">
									Time Since
								</TableHead>
								<TableHead className="px-2 py-1.5 w-[120px]">
									Last Game
								</TableHead>
								<TableHead className="px-2 py-1.5 w-[120px]">
									Exact Crash
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{batchLoading && !batchData ? (
								<TableSkeleton />
							) : (
								pointsToShow.map((point) => {
									const pointData = batchData?.[point];
									const streakValue =
										pointData?.[selectedType] ?? 0;

									// Use the appropriate game data based on selected tab
									const gameData =
										selectedType === 'current'
											? pointData?.currentGame
											: pointData?.uniqueGame;

									const exact = gameData?.crashPoint;

									return (
										<TableRow
											key={point}
											className="h-10"
										>
											<TableCell className="font-medium">
												{selectedType === 'current'
													? `≥ ${point}${
															point ===
															Math.floor(point)
																? '.0'
																: ''
													  }`
													: `= ${point}${
															point ===
															Math.floor(point)
																? '.0'
																: ''
													  }`}
											</TableCell>
											<TableCell>
												<Badge
													className={cn(
														'px-2.5 py-0.5 font-semibold',
														selectedType ===
															'current'
															? getStreakBadgeColor(
																	streakValue,
																	point
															  )
															: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
													)}
												>
													{streakValue}
												</Badge>
											</TableCell>
											<TableCell>
												{!gameData ? (
													<span className="text-muted-foreground">
														No data
													</span>
												) : (
													timeAgoMap[point] ||
													'calculating...'
												)}
											</TableCell>
											<TableCell>
												{!gameData ? (
													<span className="text-muted-foreground">
														-
													</span>
												) : (
													<span>{`#${gameData.gameId}`}</span>
												)}
											</TableCell>
											<TableCell>
												{!gameData ? (
													<span className="text-muted-foreground">
														-
													</span>
												) : (
													<span>
														{exact?.toFixed(2)}x
													</span>
												)}
											</TableCell>
										</TableRow>
									);
								})
							)}
						</TableBody>
					</Table>
				</div>
			</div>
		);
	};

	return (
		<AnalyticsCard
			title="Last Games Analysis"
			description="Recent games meeting crash point thresholds"
			className={className}
		>
			{renderContent()}
		</AnalyticsCard>
	);
}
