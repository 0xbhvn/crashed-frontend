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

interface OverviewTableProps {
	data: RiskAdjustedMetricsData;
}

export function OverviewTable({ data }: OverviewTableProps) {
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow className="h-9">
						<TableHead className="px-2 py-1.5">Target</TableHead>
						<TableHead className="px-2 py-1.5">Win Rate</TableHead>
						<TableHead className="px-2 py-1.5">Sharpe Ratio</TableHead>
						<TableHead className="px-2 py-1.5">Max Drawdown</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Object.entries(data.strategies).map(([key, strategy]) => (
						<TableRow key={key} className="h-10">
							<TableCell className="font-medium">{key}</TableCell>
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
								<Badge
									className={cn(
										'text-xs',
										getRiskBadgeColor(
											strategy.risk_metrics.sharpe_ratio,
											'sharpe'
										)
									)}
								>
									{strategy.risk_metrics.sharpe_ratio.toFixed(2)}
								</Badge>
							</TableCell>
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
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}