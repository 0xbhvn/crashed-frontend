'use client';

import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
	getComparisonBadgeColor,
	getChangeSymbol,
} from '@/components/analytics/widgets/occurrences/utils';
import {
	calculatePercentileThresholds,
	calculateCategoryProbabilities,
} from '@/utils/crash-probability';
import { RadioTowerIcon } from 'lucide-react';

interface QuartileData {
	label: string;
	rangeFormat: string;
	expectedPercentage: number;
	actualCount: number;
	actualPercentage: number;
	roundedExpectedCount: number;
	differenceFromExpectedCount: number;
	differencePercentageValue: number;
}

interface SeriesQuartileTableProps {
	seriesData: Array<{ length: number }>;
	onHoverRange?: (range: string | null) => void;
	onLeaveRange?: () => void;
	value: number;
}

export function SeriesQuartileTable({
	seriesData,
	onHoverRange,
	onLeaveRange,
	value,
}: SeriesQuartileTableProps) {
	const dynamicQuartileDefinitions = React.useMemo(() => {
		const thresholds = calculatePercentileThresholds(value);
		const categoryProbs = calculateCategoryProbabilities(value, 0);

		return [
			{
				label: '<p25',
				rangeFormat: thresholds.p25 === 1 ? '1' : `1-${thresholds.p25}`,
				min: 1,
				max: thresholds.p25,
				expectedPercentage: categoryProbs.p25 || 0,
				colorClasses:
					'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
			},
			{
				label: 'p25-p50',
				rangeFormat:
					thresholds.p25 + 1 === thresholds.p50
						? `${thresholds.p50}`
						: `${thresholds.p25 + 1}-${thresholds.p50}`,
				min: thresholds.p25 + 1,
				max: thresholds.p50,
				expectedPercentage: categoryProbs['p25-p50'] || 0,
				colorClasses:
					'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
			},
			{
				label: 'p50-p75',
				rangeFormat:
					thresholds.p50 + 1 === thresholds.p75
						? `${thresholds.p75}`
						: `${thresholds.p50 + 1}-${thresholds.p75}`,
				min: thresholds.p50 + 1,
				max: thresholds.p75,
				expectedPercentage: categoryProbs['p50-p75'] || 0,
				colorClasses:
					'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
			},
			{
				label: '>p75',
				rangeFormat: `>${thresholds.p75}`,
				min: thresholds.p75 + 1,
				max: Number.POSITIVE_INFINITY,
				expectedPercentage: categoryProbs['>p75'] || 0,
				colorClasses:
					'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
			},
		];
	}, [value]);

	const calculateQuartileData = React.useCallback((): QuartileData[] => {
		if (!seriesData || seriesData.length === 0) {
			return [];
		}
		const totalSeries = seriesData.length;

		return dynamicQuartileDefinitions.map((def) => {
			const countInQuartile = seriesData.filter(
				(s) => s.length >= def.min && s.length <= def.max
			).length;

			const actualPercentage =
				totalSeries > 0 ? (countInQuartile / totalSeries) * 100 : 0;
			const rawExpectedCount =
				(def.expectedPercentage / 100) * totalSeries;
			const roundedExpectedCount = Math.round(rawExpectedCount);
			const differenceFromExpectedCount =
				countInQuartile - roundedExpectedCount;
			const differencePercentageValue =
				actualPercentage - def.expectedPercentage;

			return {
				label: def.label,
				rangeFormat: def.rangeFormat,
				expectedPercentage: def.expectedPercentage,
				actualCount: countInQuartile,
				actualPercentage: actualPercentage,
				roundedExpectedCount: roundedExpectedCount,
				differenceFromExpectedCount: differenceFromExpectedCount,
				differencePercentageValue: differencePercentageValue,
			};
		});
	}, [seriesData, dynamicQuartileDefinitions]);

	const quartileData = calculateQuartileData();

	const mostOverdueQuartileLabel = React.useMemo(() => {
		if (!quartileData || quartileData.length === 0) return null;

		let minDifference = Number.POSITIVE_INFINITY; // Start with a very high number
		let targetLabel: string | null = null;

		for (const q of quartileData) {
			if (q.differencePercentageValue < minDifference) {
				minDifference = q.differencePercentageValue;
				targetLabel = q.label;
			}
		}

		// Always return the label of the row with the smallest differencePercentageValue
		return targetLabel;
	}, [quartileData]);

	// Now the main early return can happen after all hooks and necessary calculations
	if (!seriesData || seriesData.length === 0) {
		return null;
	}

	const handleMouseEnter = (label: string) => {
		if (!onHoverRange) return;

		const def = dynamicQuartileDefinitions.find((d) => d.label === label);
		if (def) {
			onHoverRange(def.label);
		}
	};

	const handleMouseLeave = () => {
		if (!onLeaveRange) return;

		onLeaveRange();
	};

	return (
		<div className="my-4 flex justify-center">
			<div className="min-w-[50%] w-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[20px] p-0" />
							<TableHead>Label</TableHead>
							<TableHead>Range</TableHead>
							<TableHead>Expected Distribution</TableHead>
							<TableHead>Actual Distribution</TableHead>
							<TableHead>Difference</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{quartileData.map((row) => {
							const defColorInfo =
								dynamicQuartileDefinitions.find(
									(def) => def.label === row.label
								);
							const currentQuartileColorClasses = defColorInfo
								? defColorInfo.colorClasses
								: 'bg-gray-100 text-gray-800';

							let iconTextColor = 'text-orange-500'; // Default icon color
							if (defColorInfo) {
								const colorParts =
									defColorInfo.colorClasses.split(' ');
								const textPart = colorParts.find(
									(part) =>
										part.startsWith('text-') &&
										!part.includes('/')
								); // find non-dark mode text color
								if (textPart) {
									iconTextColor = textPart;
								}
							}

							return (
								<TableRow
									key={row.label}
									onMouseEnter={() =>
										handleMouseEnter(row.label)
									}
									onMouseLeave={handleMouseLeave}
									className="cursor-default"
								>
									<TableCell className="w-[20px] p-1 text-center">
										{row.label ===
											mostOverdueQuartileLabel && (
											<RadioTowerIcon
												className={`h-4 w-4 ${iconTextColor} animate-pulse inline-block`}
											/>
										)}
									</TableCell>
									<TableCell className="font-medium">
										{row.label}
									</TableCell>
									<TableCell>{row.rangeFormat}</TableCell>
									<TableCell>
										<span className="mr-2">
											{row.roundedExpectedCount}
										</span>
										<Badge
											className={`px-2.5 py-0.5 font-semibold ${currentQuartileColorClasses}`}
										>
											{row.expectedPercentage.toFixed(2)}%
										</Badge>
									</TableCell>
									<TableCell>
										<span className="mr-2">
											{row.actualCount}
										</span>
										<Badge
											className={`px-2.5 py-0.5 font-semibold ${currentQuartileColorClasses}`}
										>
											{row.actualPercentage.toFixed(2)}%
										</Badge>
									</TableCell>
									<TableCell>
										<span className="mr-2">
											{getChangeSymbol(
												row.differenceFromExpectedCount
											)}
											{row.differenceFromExpectedCount}
										</span>
										<Badge
											className={cn(
												'px-2.5 py-0.5 font-semibold',
												getComparisonBadgeColor(
													row.differencePercentageValue
												)
											)}
										>
											{getChangeSymbol(
												row.differencePercentageValue
											)}
											{row.differencePercentageValue.toFixed(
												2
											)}
											%
										</Badge>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
