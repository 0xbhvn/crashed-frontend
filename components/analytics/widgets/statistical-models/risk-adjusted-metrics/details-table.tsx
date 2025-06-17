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
import { getRiskBadgeColor } from './utils';
import type { RiskAdjustedMetricsData } from './types';
import { cn } from '@/lib/utils';

interface DetailsTableProps {
	data: RiskAdjustedMetricsData;
}

export function DetailsTable({ data }: DetailsTableProps) {
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow className="h-9">
						<TableHead className="px-2 py-1.5">Target</TableHead>
						<TableHead className="px-2 py-1.5">Total Bets</TableHead>
						<TableHead className="px-2 py-1.5">Wins</TableHead>
						<TableHead className="px-2 py-1.5">Win Rate</TableHead>
						<TableHead className="px-2 py-1.5">Average Return</TableHead>
						<TableHead className="px-2 py-1.5">Total Return</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Object.entries(data.strategies).map(([key, strategy]) => (
						<TableRow key={key} className="h-10 hover:bg-muted/50">
							<TableCell className="font-medium">{key}</TableCell>
							<TableCell>{strategy.performance.total_bets}</TableCell>
							<TableCell>{strategy.performance.wins}</TableCell>
							<TableCell>
								<Badge
									className={cn(
										'text-xs',
										getRiskBadgeColor(
											strategy.performance.win_rate,
											'win_rate'
										)
									)}
								>
									{strategy.performance.win_rate.toFixed(2)}%
								</Badge>
							</TableCell>
							<TableCell>
								{strategy.performance.average_return.toFixed(2)}
							</TableCell>
							<TableCell>
								{strategy.performance.total_return.toFixed(2)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}