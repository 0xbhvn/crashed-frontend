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

interface DrawdownTableProps {
	data: RiskAdjustedMetricsData;
}

export function DrawdownTable({ data }: DrawdownTableProps) {
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow className="h-9">
						<TableHead className="px-2 py-1.5">Target</TableHead>
						<TableHead className="px-2 py-1.5">Max Drawdown</TableHead>
						<TableHead className="px-2 py-1.5">Drawdown Periods</TableHead>
						<TableHead className="px-2 py-1.5">Avg Duration</TableHead>
						<TableHead className="px-2 py-1.5">Longest Duration</TableHead>
						<TableHead className="px-2 py-1.5">
							Max Consecutive Losses
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Object.entries(data.strategies).map(([key, strategy]) => (
						<TableRow key={key} className="h-10 hover:bg-muted/50">
							<TableCell className="font-medium">{key}</TableCell>
							<TableCell>
								<Badge
									className={cn(
										'text-xs',
										getRiskBadgeColor(
											strategy.drawdown_analysis.max_drawdown_percent,
											'drawdown'
										)
									)}
								>
									{strategy.drawdown_analysis.max_drawdown_percent.toFixed(2)}%
								</Badge>
							</TableCell>
							<TableCell>
								{strategy.drawdown_analysis.drawdown_periods}
							</TableCell>
							<TableCell>
								{strategy.drawdown_analysis.avg_drawdown_duration.toFixed(2)}{' '}
								games
							</TableCell>
							<TableCell>
								{strategy.drawdown_analysis.longest_drawdown} games
							</TableCell>
							<TableCell>
								<Badge
									className={cn(
										'text-xs',
										getRiskBadgeColor(
											strategy.risk_metrics.max_consecutive_losses,
											'consecutive_losses'
										)
									)}
								>
									{strategy.risk_metrics.max_consecutive_losses}
								</Badge>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}