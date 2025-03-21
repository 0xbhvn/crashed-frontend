'use client';

import * as React from 'react';
import { useEffect } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { RegularCell, ComparisonCell, EmptyCell } from './cell-content';
import type { OccurrencesTableProps } from './types';

export function DataTable({
	selectedType,
	analyzeBy,
	showComparison,
	pointsToShow,
	occurrencesData,
	isLoading,
}: OccurrencesTableProps) {
	// Debug logging for occurrencesData
	useEffect(() => {
		console.log('DataTable received occurrencesData:', occurrencesData);
		console.log('DataTable selected type:', selectedType);
		console.log('DataTable points to show:', pointsToShow);

		// Check if data is structured as expected
		if (occurrencesData) {
			const firstPoint = pointsToShow[0];
			const pointKey =
				firstPoint === Math.floor(firstPoint)
					? `${firstPoint}.0`
					: firstPoint.toString();

			console.log(
				`Data for first point (${pointKey}):`,
				occurrencesData[pointKey]
			);
			if (occurrencesData[pointKey]) {
				console.log(
					`${selectedType} data for first point:`,
					occurrencesData[pointKey][selectedType]
				);
			}
		}
	}, [occurrencesData, selectedType, pointsToShow]);

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
							<div className="h-5 w-12 animate-pulse rounded bg-muted" />
						</TableCell>
						{showComparison && (
							<TableCell className="py-1">
								<div className="h-5 w-12 animate-pulse rounded bg-muted" />
							</TableCell>
						)}
						<TableCell className="py-1">
							<div className="h-5 w-16 animate-pulse rounded bg-muted" />
						</TableCell>
						{showComparison && (
							<TableCell className="py-1">
								<div className="h-5 w-16 animate-pulse rounded bg-muted" />
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
						<TableHead className="px-2 py-1.5 w-[120px]">
							Crash Point
						</TableHead>
						<TableHead className="px-2 py-1.5 w-[80px]">
							Occurrences
						</TableHead>
						{showComparison && (
							<TableHead className="px-2 py-1.5 w-[80px]">
								Change
							</TableHead>
						)}
						<TableHead className="px-2 py-1.5 w-[100px]">
							Percentage
						</TableHead>
						{showComparison && (
							<TableHead className="px-2 py-1.5 w-[120px]">
								{analyzeBy === 'games' ? '% Change' : '% Diff'}
							</TableHead>
						)}
					</TableRow>
				</TableHeader>
				<TableBody>
					{isLoading && !occurrencesData ? (
						<TableSkeleton />
					) : (
						pointsToShow.map((point) => {
							// Format the key to match exactly what the API returns (with decimal)
							const pointKey =
								point === Math.floor(point)
									? `${point}.0`
									: point.toString();

							// Get the data for the selected type (current or unique)
							const dataItem =
								occurrencesData?.[pointKey]?.[selectedType];

							if (!dataItem) {
								return (
									<TableRow
										key={pointKey}
										className="h-10"
									>
										<EmptyCell
											point={point}
											selectedType={selectedType}
											showComparison={showComparison}
										/>
									</TableRow>
								);
							}

							return (
								<TableRow
									key={pointKey}
									className="h-10"
								>
									{showComparison ? (
										<ComparisonCell
											point={point}
											selectedType={selectedType}
											dataItem={dataItem}
											analyzeBy={analyzeBy}
										/>
									) : (
										<RegularCell
											point={point}
											selectedType={selectedType}
											dataItem={dataItem}
										/>
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
