'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { TableRow, TableCell } from '@/components/ui/table';
import type { Game } from '@/models/game';

interface TableSkeletonProps {
	columns: ColumnDef<Game>[];
	count: number;
	page: number;
}

export function TableSkeleton({ columns, count, page }: TableSkeletonProps) {
	return (
		<>
			{Array.from({ length: count }).map((_, i) => {
				const rowKey = `skeleton-row-${page}-${i}`;
				return (
					<TableRow key={rowKey}>
						{columns.map((column, j) => {
							const cellKey = `${rowKey}-cell-${column.id || j}`;
							return (
								<TableCell
									key={cellKey}
									className="h-10 py-2"
								>
									<div className="h-3 bg-muted/30 animate-pulse rounded" />
								</TableCell>
							);
						})}
					</TableRow>
				);
			})}
		</>
	);
}
