'use client';

import * as React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getStreakBadgeColor, formatCrashPoint } from './utils';
import type { LastGamesDataTableProps } from './types';

export function DataTable({
	selectedType,
	pointsToShow,
	batchData,
	timeAgoMap,
	isLoading,
	isValueLoading,
}: LastGamesDataTableProps) {
	// Get probability badge color based on 4 stages
	const getProbabilityBadgeColor = (
		value: number | null | undefined
	): string => {
		if (value === null || value === undefined) return '';

		if (value < 25) {
			return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
		}
		if (value < 50) {
			return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
		}
		if (value < 75) {
			return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
		}
		return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
	};

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
						{selectedType === 'current' && (
							<TableCell className="py-1">
								<div className="h-4 w-12 animate-pulse rounded bg-muted" />
							</TableCell>
						)}
					</TableRow>
				))}
			</>
		);
	};

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow className="h-9">
						<TableHead className="px-2 py-1.5 w-[100px]">
							Crash Point
						</TableHead>
						<TableHead className="px-2 py-1.5 w-[120px]">
							Streak Count
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
						{selectedType === 'current' && (
							<TableHead className="px-2 py-1.5 w-[120px]">
								Probability
							</TableHead>
						)}
					</TableRow>
				</TableHeader>
				<TableBody>
					{isLoading || !batchData ? (
						<TableSkeleton />
					) : (
						pointsToShow.map((point) => {
							const pointData = batchData?.[point];
							// Check if this specific point is loading
							const isPointLoading = isValueLoading
								? isValueLoading(point)
								: pointData === undefined;
							const streakValue = pointData?.[selectedType] ?? 0;

							// Use the appropriate game data based on selected tab
							const gameData =
								selectedType === 'current'
									? pointData?.currentGame
									: pointData?.uniqueGame;

							// Get the probability value based on selected type (only for current mode)
							const probability =
								selectedType === 'current'
									? pointData?.currentProbability
									: null;

							const exact = gameData?.crashPoint;

							// If this specific point's data is still loading, show a row skeleton
							if (isPointLoading) {
								return (
									<TableRow
										key={`loading-row-${point}`}
										className="h-10"
									>
										<TableCell className="font-medium">
											{formatCrashPoint(
												point,
												selectedType
											)}
										</TableCell>
										<TableCell>
											<Badge
												className={cn(
													'px-2.5 py-0.5 font-semibold',
													selectedType === 'current'
														? getStreakBadgeColor(
																0,
																point
														  )
														: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
												)}
											>
												-
											</Badge>
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
										{selectedType === 'current' && (
											<TableCell className="py-1">
												<div className="h-4 w-12 animate-pulse rounded bg-muted" />
											</TableCell>
										)}
									</TableRow>
								);
							}

							return (
								<TableRow
									key={point}
									className="h-10"
								>
									<TableCell className="font-medium">
										{formatCrashPoint(point, selectedType)}
									</TableCell>
									<TableCell>
										<Badge
											className={cn(
												'px-2.5 py-0.5 font-semibold',
												selectedType === 'current'
													? getStreakBadgeColor(
															streakValue,
															point
													  )
													: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
											)}
										>
											{!pointData ? '-' : streakValue}
										</Badge>
									</TableCell>
									<TableCell>
										{!gameData ? (
											<span className="text-muted-foreground">
												-
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
											<span>{exact?.toFixed(2)}x</span>
										)}
									</TableCell>
									{selectedType === 'current' && (
										<TableCell>
											{!probability ? (
												<span className="text-muted-foreground">
													-
												</span>
											) : (
												<Badge
													className={cn(
														'px-2.5 py-0.5 font-semibold',
														getProbabilityBadgeColor(
															probability
														)
													)}
												>
													{probability.toFixed(2)}%
												</Badge>
											)}
										</TableCell>
									)}
								</TableRow>
							);
						})
					)}
				</TableBody>
			</Table>
		</div>
	);
}
