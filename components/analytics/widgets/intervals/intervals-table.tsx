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
import type { IntervalData, IntervalGridData } from '@/utils/analytics-types';
import type { IntervalDuration } from '@/utils/export-utils/types';
import type { HourTotalsMap } from './types';
import {
	formatHourLabel,
	getPercentageBadgeColor,
	getIntervalColumns,
} from './intervals-utils';

interface IntervalsTableProps {
	intervalMinutes: IntervalDuration;
	gridData: IntervalGridData;
	hourLabels: string[];
	isLoading: boolean;
	value: number;
	hourTotals: HourTotalsMap;
	currentTime: Date;
}

export function IntervalsTable({
	intervalMinutes,
	gridData,
	hourLabels,
	isLoading,
	value,
	hourTotals,
	currentTime,
}: IntervalsTableProps) {
	// Get the interval columns
	const intervalColumns = React.useMemo(() => {
		return getIntervalColumns(intervalMinutes);
	}, [intervalMinutes]);

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
		const isCurrentInterval =
			data.interval_end && new Date(data.interval_end) > currentTime;

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

	return (
		<div className="rounded-md border overflow-x-auto">
			<Table className="border-collapse [&_td]:border [&_th]:border [&_td]:border-border [&_th]:border-border">
				<TableHeader>
					<TableRow>
						<TableHead className="w-20 text-center border-r">
							Hour
						</TableHead>
						{intervalColumns.map((startMinute) => {
							const endMinute = startMinute + intervalMinutes;
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
							Hour Total
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{isLoading ? (
						<TableRow>
							<TableCell
								colSpan={intervalColumns.length + 2}
								className="h-24 text-center"
							>
								<div className="flex flex-col items-center justify-center gap-2">
									<div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
									<span className="text-sm text-muted-foreground">
										Loading data...
									</span>
								</div>
							</TableCell>
						</TableRow>
					) : hourLabels.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={intervalColumns.length + 2}
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
								{intervalColumns.map((startMinute) => {
									// Format the minute as a padded string to use as key in grid data
									const intervalKey = startMinute
										.toString()
										.padStart(2, '0');

									return (
										<TableCell
											key={`${hourKey}-${startMinute}`}
											className="text-center"
										>
											{formatIntervalData(
												gridData[hourKey]?.[intervalKey]
											)}
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
