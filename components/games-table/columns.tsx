import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import type { Game } from '@/models/game';
import { formatDate, calculateDuration } from '@/utils/date-utils';

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
		cell: ({ row }) => {
			// Safely parse the value
			const rawValue = row.getValue('crashPoint');

			// Handle missing or invalid values
			if (
				rawValue === null ||
				rawValue === undefined ||
				(typeof rawValue === 'number' && !Number.isFinite(rawValue))
			) {
				return (
					<div className="rounded font-semibold px-2 py-0.5 bg-yellow-600/20 text-yellow-600 dark:bg-yellow-800/30 dark:text-yellow-400 flex items-center gap-1">
						<AlertTriangle size={12} />
						<span>Invalid</span>
					</div>
				);
			}

			const value =
				typeof rawValue === 'number'
					? rawValue
					: Number.parseFloat(String(rawValue));

			if (Number.isNaN(value)) {
				return (
					<div className="rounded font-semibold px-2 py-0.5 bg-yellow-600/20 text-yellow-600 dark:bg-yellow-800/30 dark:text-yellow-400 flex items-center gap-1">
						<AlertTriangle size={12} />
						<span>Invalid</span>
					</div>
				);
			}

			return (
				<div
					className={cn(
						'rounded font-semibold px-2 py-0.5 inline-block',
						value < 10
							? 'bg-red-600/20 text-red-600 dark:bg-red-800/30 dark:text-red-400'
							: 'bg-green-600/20 text-green-600 dark:bg-green-800/30 dark:text-green-400'
					)}
				>
					{value.toFixed(2)}
				</div>
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
