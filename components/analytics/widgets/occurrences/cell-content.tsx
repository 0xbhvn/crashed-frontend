'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
	getPercentageBadgeColor,
	getChangeSymbol,
	getComparisonBadgeColor,
	formatCrashPoint,
} from './utils';
import { ArrowDownIcon, ArrowUpIcon, ArrowDownUpIcon } from 'lucide-react';
import { isComparisonData } from './types';
import type { CellContentProps } from './types';
import type { OccurrenceData } from '@/utils/analytics-types';

// Get percentage change icon component (moved from utils)
export function getPercentChangeIcon(changePercent: number): React.ReactNode {
	if (changePercent > 0) return <ArrowUpIcon className="mr-1 h-3 w-3" />;
	if (changePercent < 0) return <ArrowDownIcon className="mr-1 h-3 w-3" />;
	return <ArrowDownUpIcon className="mr-1 h-3 w-3" />; // for zero change
}

// Regular data cell (no comparison)
export function RegularCell({
	point,
	selectedType,
	dataItem,
}: Pick<CellContentProps, 'point' | 'selectedType' | 'dataItem'>) {
	// Type guard to ensure we're working with OccurrenceData
	if (dataItem && !isComparisonData(dataItem)) {
		const occurrenceData = dataItem as OccurrenceData;
		const count = occurrenceData.count ?? 0;
		const percentage = occurrenceData.percentage ?? 0;

		return (
			<React.Fragment>
				<td className="font-medium px-2 py-1.5">
					{formatCrashPoint(point, selectedType)}
				</td>
				<td className="px-2 py-1.5">{count}</td>
				<td className="px-2 py-1.5">
					<Badge
						className={cn(
							'px-2 py-0.5 text-xs font-semibold',
							getPercentageBadgeColor(
								percentage,
								point,
								selectedType
							)
						)}
					>
						{percentage.toFixed(2)}%
					</Badge>
				</td>
			</React.Fragment>
		);
	}

	// Fallback for undefined or unexpected data
	return (
		<React.Fragment>
			<td className="font-medium px-2 py-1.5">
				{formatCrashPoint(point, selectedType)}
			</td>
			<td className="px-2 py-1.5">0</td>
			<td className="px-2 py-1.5">
				<Badge
					className={cn(
						'px-2 py-0.5 text-xs font-semibold',
						getPercentageBadgeColor(0, point, selectedType)
					)}
				>
					0.00%
				</Badge>
			</td>
		</React.Fragment>
	);
}

// Comparison data cell
export function ComparisonCell({
	point,
	selectedType,
	dataItem,
	analyzeBy,
}: Pick<
	CellContentProps,
	'point' | 'selectedType' | 'dataItem' | 'analyzeBy'
>) {
	if (!isComparisonData(dataItem)) {
		return (
			<React.Fragment>
				<td className="font-medium px-2 py-1.5">
					{formatCrashPoint(point, selectedType)}
				</td>
				<td className="px-2 py-1.5">0</td>
				<td className="px-2 py-1.5">-</td>
				<td className="px-2 py-1.5">
					<Badge
						className={cn(
							'px-2 py-0.5 text-xs font-semibold',
							getPercentageBadgeColor(0, point, selectedType)
						)}
					>
						0.00%
					</Badge>
				</td>
				<td className="px-2 py-1.5">-</td>
			</React.Fragment>
		);
	}

	const currentData = dataItem.current_period;
	const comparison = dataItem.comparison;

	return (
		<React.Fragment>
			<td className="font-medium px-2 py-1.5">
				{formatCrashPoint(point, selectedType)}
			</td>
			<td className="px-2 py-1.5">{currentData.count}</td>
			<td className="px-2 py-1.5">
				<Badge
					className={cn(
						'px-2 py-0.5 text-xs font-semibold',
						comparison.count_diff > 0
							? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
							: comparison.count_diff < 0
							? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
							: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
					)}
				>
					{getChangeSymbol(comparison.count_diff)}
					{comparison.count_diff}
				</Badge>
			</td>
			<td className="px-2 py-1.5">
				<Badge
					className={cn(
						'px-2 py-0.5 text-xs font-semibold',
						getPercentageBadgeColor(
							currentData.percentage,
							point,
							selectedType
						)
					)}
				>
					{currentData.percentage.toFixed(2)}%
				</Badge>
			</td>
			<td className="px-2 py-1.5">
				<Badge
					className={cn(
						'px-2 py-0.5 text-xs font-semibold',
						getComparisonBadgeColor(
							analyzeBy === 'games'
								? comparison.count_percent_change
								: comparison.percentage_diff
						)
					)}
				>
					<span className="flex items-center">
						{getPercentChangeIcon(
							analyzeBy === 'games'
								? comparison.count_percent_change
								: comparison.percentage_diff
						)}
						{Math.abs(
							analyzeBy === 'games'
								? comparison.count_percent_change
								: comparison.percentage_diff
						).toFixed(2)}
						%
					</span>
				</Badge>
			</td>
		</React.Fragment>
	);
}

// Empty cell (for no data)
export function EmptyCell({
	point,
	selectedType,
	showComparison,
}: Pick<CellContentProps, 'point' | 'selectedType' | 'showComparison'>) {
	return (
		<React.Fragment>
			<td className="font-medium px-2 py-1.5">
				{formatCrashPoint(point, selectedType)}
			</td>
			<td className="px-2 py-1.5">0</td>
			{showComparison && <td className="px-2 py-1.5">-</td>}
			<td className="px-2 py-1.5">
				<Badge
					className={cn(
						'px-2 py-0.5 text-xs font-semibold',
						getPercentageBadgeColor(0, point, selectedType)
					)}
				>
					0.00%
				</Badge>
			</td>
			{showComparison && <td className="px-2 py-1.5">-</td>}
		</React.Fragment>
	);
}
