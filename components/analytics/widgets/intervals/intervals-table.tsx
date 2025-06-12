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
import { IntervalsTableSkeleton } from '@/components/analytics/loading-skeleton';
import type { IntervalData, IntervalGridData } from '@/utils/analytics-types';
import type {
	TimeIntervalDuration,
	GameIntervalSize,
} from '@/utils/export-utils/types';
import type { HourTotalsMap } from './types';
import {
	formatHourLabel,
	getPercentageBadgeColor,
	getIntervalColumns,
} from './intervals-utils';

interface IntervalsTableProps {
	intervalMinutes: TimeIntervalDuration | GameIntervalSize;
	gridData: IntervalGridData;
	hourLabels: string[];
	isLoading: boolean;
	value: number;
	hourTotals: HourTotalsMap;
	currentTime: Date;
	analyzeBy?: 'time' | 'games';
}

export function IntervalsTable({
	intervalMinutes,
	gridData,
	hourLabels,
	isLoading,
	value,
	hourTotals,
	currentTime,
	analyzeBy = 'time',
}: IntervalsTableProps) {
	// Get the interval columns
	const intervalColumns = React.useMemo(() => {
		return getIntervalColumns(intervalMinutes);
	}, [intervalMinutes]);

	// Check if we're in game sets mode
	const isGameSetsMode = analyzeBy === 'games';

	// Calculate how many game columns we need based on game interval size
	const gameColumnCount = React.useMemo(() => {
		// For game sets, calculate columns based on interval size (100/interval)
		return isGameSetsMode ? Math.ceil(100 / Number(intervalMinutes)) : 0;
	}, [isGameSetsMode, intervalMinutes]);

	// Generate game column headers based on interval size
	const gameColumnHeaders = React.useMemo(() => {
		if (!isGameSetsMode) return [];

		const columns = [];
		const interval = Number(intervalMinutes);

		for (let i = 0; i < gameColumnCount; i++) {
			const start = i * interval;
			const end = Math.min((i + 1) * interval - 1, 99);
			columns.push({
				key: `game-column-${i}`,
				label: `${start.toString().padStart(2, '0')}-${end
					.toString()
					.padStart(2, '0')}`,
				index: i,
			});
		}

		return columns;
	}, [isGameSetsMode, intervalMinutes, gameColumnCount]);

	// Format interval data for display
	const formatIntervalData = (data: IntervalData | undefined) => {
		if (!data) {
			return (
				<div className="text-center text-muted-foreground text-sm">
					-
				</div>
			);
		}

		// Check if this interval is currently active
		// For time mode: check if interval_end is after current time
		// For game mode: check using is_most_recent flag
		const isCurrentInterval =
			data.interval_end &&
			(analyzeBy === 'time'
				? new Date(data.interval_end) > currentTime
				: !!data.is_most_recent);

		// Get the badge color based on percentage
		const badgeColorClass = getPercentageBadgeColor(data.percentage, value);

		return (
			<div className="flex items-stretch w-full divide-x divide-border">
				{/* Left side - Count (larger) */}
				<div
					className={`flex-1 flex items-center justify-center text-2xl ${
						isCurrentInterval ? 'animate-pulse text-primary' : ''
					}`}
				>
					{data.count}
				</div>

				{/* Right side - Percentage and Total */}
				<div className="flex-1 flex flex-col items-center divide-y divide-border">
					{/* Top - Percentage */}
					<div className="py-1 w-full flex justify-center">
						<Badge
							className={`px-2.5 py-0.5 text-xs font-semibold ${badgeColorClass}`}
						>
							{data.percentage.toFixed(1)}%
						</Badge>
					</div>

					{/* Bottom - Total games */}
					<div className="py-1 w-full flex justify-center">
						<span className="text-xs text-muted-foreground">
							{data.total_games}
						</span>
					</div>
				</div>
			</div>
		);
	};

	// Format hour total
	const formatHourTotal = (hourKey: string) => {
		const hourTotal = hourTotals[hourKey];
		if (!hourTotal) return null;

		// Get the badge color based on percentage
		const badgeColorClass = getPercentageBadgeColor(
			hourTotal.percentage,
			value
		);

		return (
			<div className="flex items-stretch w-full divide-x divide-border">
				{/* Left side - Count (larger) */}
				<div className="flex-1 flex items-center justify-center text-2xl font-medium">
					{hourTotal.count}
				</div>

				{/* Right side - Percentage and Total */}
				<div className="flex-1 flex flex-col items-center divide-y divide-border">
					{/* Top - Percentage */}
					<div className="py-1 w-full flex justify-center">
						<Badge
							className={`px-2.5 py-0.5 text-xs font-semibold ${badgeColorClass}`}
						>
							{hourTotal.percentage.toFixed(1)}%
						</Badge>
					</div>

					{/* Bottom - Total games */}
					<div className="py-1 w-full flex justify-center">
						<span className="text-xs text-muted-foreground">
							{hourTotal.totalGames}
						</span>
					</div>
				</div>
			</div>
		);
	};

	if (isLoading) {
		return <IntervalsTableSkeleton />;
	}

	return (
		<div className="rounded-md border overflow-x-auto">
			<Table className="border-collapse [&_td]:border [&_th]:border [&_td]:border-border [&_th]:border-border">
				<TableHeader>
					<TableRow>
						<TableHead className="w-20 text-center border-r">
							{isGameSetsMode ? 'Range' : 'Hour'}
						</TableHead>
						{/* For game sets, show dynamic interval numbers based on selected interval */}
						{isGameSetsMode
							? gameColumnHeaders.map((column) => (
									<TableHead
										key={column.key}
										className="text-center whitespace-nowrap"
									>
										{column.label}
									</TableHead>
							  ))
							: // For time intervals, show minute ranges
							  intervalColumns.map((startMinute) => {
									const endMinute =
										startMinute + Number(intervalMinutes);
									return (
										<TableHead
											key={startMinute}
											className="text-center whitespace-nowrap"
										>
											{startMinute}-{endMinute}
										</TableHead>
									);
							  })}
						<TableHead className="text-center whitespace-nowrap bg-muted/30 font-bold border-l-2 border-l-muted-foreground/20 pl-4">
							{isGameSetsMode ? 'Range Total' : 'Hour Total'}
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{hourLabels.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={
									isGameSetsMode
										? gameColumnCount + 2
										: intervalColumns.length + 2
								}
								className="h-24 text-center"
							>
								<div className="text-muted-foreground">
									No data available
									<br />
									<button
										onClick={() => window.location.reload()}
										className="text-sm text-primary hover:underline mt-2"
										type="button"
									>
										Refresh page
									</button>
								</div>
							</TableCell>
						</TableRow>
					) : (
						hourLabels.map((hourKey) => (
							<TableRow key={hourKey}>
								<TableCell className="font-medium text-center border-r">
									{formatHourLabel(hourKey)}
								</TableCell>
								{isGameSetsMode
									? // For game sets, render dynamic game columns
									  gameColumnHeaders.map((column) => {
											const columnKey = column.index
												.toString()
												.padStart(2, '0');
											const data =
												gridData[hourKey]?.[columnKey];
											return (
												<TableCell
													key={`${hourKey}-${column.key}`}
													className="text-center"
												>
													{formatIntervalData(data)}
												</TableCell>
											);
									  })
									: // For time intervals, render interval columns
									  intervalColumns.map((startMinute) => {
											const columnKey = startMinute
												.toString()
												.padStart(2, '0');
											const data =
												gridData[hourKey]?.[columnKey];
											return (
												<TableCell
													key={`${hourKey}-${columnKey}`}
													className="text-center"
												>
													{formatIntervalData(data)}
												</TableCell>
											);
									  })}
								<TableCell className="text-center bg-muted/30 border-l-2 border-l-muted-foreground/20 pl-4">
									{formatHourTotal(hourKey)}
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}
