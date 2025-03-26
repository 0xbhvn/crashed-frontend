'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
	getPercentageBadgeColor,
	getChangeSymbol,
	getChangeTextColor,
	getComparisonTextColor,
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
	// If we have data and it's not a comparison structure
	if (dataItem && !isComparisonData(dataItem)) {
		// The data structure might be either a simple object with count/percentage
		// or a nested structure with current_period
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
							'px-2.5 py-0.5 text-xs font-semibold',
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

	// Handle situation where we have comparison data structure but need to show it as regular
	if (dataItem && isComparisonData(dataItem)) {
		// Extract count and percentage from the current period or directly from data
		const currentData =
			'current_period' in dataItem ? dataItem.current_period : dataItem;

		const count = currentData.count ?? 0;
		const percentage = currentData.percentage ?? 0;

		return (
			<React.Fragment>
				<td className="font-medium px-2 py-1.5">
					{formatCrashPoint(point, selectedType)}
				</td>
				<td className="px-2 py-1.5">{count}</td>
				<td className="px-2 py-1.5">
					<Badge
						className={cn(
							'px-2.5 py-0.5 text-xs font-semibold',
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
						'px-2.5 py-0.5 text-xs font-semibold',
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
							'px-2.5 py-0.5 text-xs font-semibold',
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

	// Handle both formats - either direct data object with comparison field
	// or the OccurrenceComparisonData structure with current_period
	const currentData =
		'current_period' in dataItem ? dataItem.current_period : dataItem;

	// Define a type for the comparison data to avoid using 'any'
	type ComparisonFields = {
		count_diff?: number;
		count_change?: number;
		percentage_diff?: number;
		percentage_change?: number;
		count_percent_change?: number;
	};

	const comparisonObj =
		'current_period' in dataItem
			? dataItem.comparison
			: (dataItem as { comparison: ComparisonFields }).comparison;

	// Get count difference - prefer count_diff but fallback to count_change
	let countDiff = 0;
	if (
		'count_diff' in comparisonObj &&
		comparisonObj.count_diff !== undefined
	) {
		countDiff = comparisonObj.count_diff;
	} else if (
		'count_change' in comparisonObj &&
		comparisonObj.count_change !== undefined
	) {
		countDiff = comparisonObj.count_change;
	}

	// Get percentage change based on analysis type
	let percentChange = 0;
	if (analyzeBy === 'games') {
		if (
			'count_percent_change' in comparisonObj &&
			comparisonObj.count_percent_change !== undefined
		) {
			percentChange = comparisonObj.count_percent_change;
		} else if (
			'percentage_change' in comparisonObj &&
			comparisonObj.percentage_change !== undefined
		) {
			percentChange = comparisonObj.percentage_change;
		}
	} else {
		if (
			'percentage_diff' in comparisonObj &&
			comparisonObj.percentage_diff !== undefined
		) {
			percentChange = comparisonObj.percentage_diff;
		} else if (
			'percentage_change' in comparisonObj &&
			comparisonObj.percentage_change !== undefined
		) {
			percentChange = comparisonObj.percentage_change;
		}
	}

	return (
		<React.Fragment>
			<td className="font-medium px-2 py-1.5">
				{formatCrashPoint(point, selectedType)}
			</td>
			<td className="px-2 py-1.5">{currentData.count}</td>
			<td className="px-2 py-1.5">
				<span
					className={cn(
						'text-sm font-medium',
						getChangeTextColor(countDiff)
					)}
				>
					{getChangeSymbol(countDiff)}
					{Math.abs(countDiff)}
				</span>
			</td>
			<td className="px-2 py-1.5">
				<Badge
					className={cn(
						'px-2.5 py-0.5 text-xs font-semibold',
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
				<span
					className={cn(
						'text-sm font-medium flex items-center',
						getComparisonTextColor(percentChange)
					)}
				>
					{getPercentChangeIcon(percentChange)}
					{Math.abs(percentChange).toFixed(2)}%
				</span>
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
						'px-2.5 py-0.5 text-xs font-semibold',
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
