import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import type { Game } from '@/models/game';
import { formatDate, calculateDuration } from '@/utils/date-utils';
import { Badge } from '@/components/ui/badge';

// Define an interface for the extended table state
interface ExtendedTableState {
	crashPointThreshold?: number;
}

// Column definitions with robust error handling
export const columns: ColumnDef<Game>[] = [
	{
		header: 'Game ID',
		accessorKey: 'gameId',
		cell: ({ row }) => {
			const gameId = row.getValue('gameId');
			return (
				<div className="font-medium">
					{gameId ? String(gameId) : 'Unknown ID'}
				</div>
			);
		},
	},
	{
		header: 'Crash Point',
		accessorKey: 'crashPoint',
		cell: ({ row, table }) => {
			// Get the crash point threshold from table state
			const state = table.getState() as ExtendedTableState;
			const threshold = state.crashPointThreshold ?? 10; // Default to 10 if not provided

			// Safely parse the value
			const rawValue = row.getValue('crashPoint');

			// Handle missing or invalid values
			if (
				rawValue === null ||
				rawValue === undefined ||
				(typeof rawValue === 'number' && !Number.isFinite(rawValue))
			) {
				return (
					<Badge className="font-semibold px-2.5 py-0.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 flex items-center gap-1">
						<AlertTriangle size={12} />
						<span>Invalid</span>
					</Badge>
				);
			}

			const value =
				typeof rawValue === 'number'
					? rawValue
					: Number.parseFloat(String(rawValue));

			if (Number.isNaN(value)) {
				return (
					<Badge className="font-semibold px-2.5 py-0.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 flex items-center gap-1">
						<AlertTriangle size={12} />
						<span>Invalid</span>
					</Badge>
				);
			}

			return (
				<Badge
					className={cn(
						'font-semibold px-2.5 py-0.5',
						value < threshold
							? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
							: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
					)}
				>
					{value.toFixed(2)}
				</Badge>
			);
		},
	},
	{
		header: 'Begin Time',
		accessorKey: 'beginTime',
		cell: ({ row }) => {
			const beginTime = row.getValue('beginTime');
			return formatDate(beginTime as string | null | undefined);
		},
	},
	{
		header: 'Duration (sec)',
		accessorKey: 'endTime',
		cell: ({ row }) => {
			const endTime = row.getValue('endTime') as
				| string
				| null
				| undefined;
			const beginTime = row.original?.beginTime as
				| string
				| null
				| undefined;
			return <div>{calculateDuration(endTime, beginTime)}</div>;
		},
	},
];
