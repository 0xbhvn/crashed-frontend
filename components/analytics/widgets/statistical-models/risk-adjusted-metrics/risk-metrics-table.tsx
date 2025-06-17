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
import type { RiskAdjustedMetricsData } from './types';

interface RiskMetricsTableProps {
	data: RiskAdjustedMetricsData;
}

export function RiskMetricsTable({ data }: RiskMetricsTableProps) {
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow className="h-9">
						<TableHead className="px-2 py-1.5">Target</TableHead>
						<TableHead className="px-2 py-1.5">Sortino Ratio</TableHead>
						<TableHead className="px-2 py-1.5">Std Dev</TableHead>
						<TableHead className="px-2 py-1.5">VaR (95%)</TableHead>
						<TableHead className="px-2 py-1.5">CVaR (95%)</TableHead>
						<TableHead className="px-2 py-1.5">Profit Factor</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Object.entries(data.strategies).map(([key, strategy]) => (
						<TableRow key={key} className="h-10 hover:bg-muted/50">
							<TableCell className="font-medium">{key}</TableCell>
							<TableCell>
								{strategy.risk_metrics.sortino_ratio.toFixed(2)}
							</TableCell>
							<TableCell>
								{strategy.risk_metrics.standard_deviation.toFixed(2)}
							</TableCell>
							<TableCell className="text-red-600 dark:text-red-400">
								{strategy.risk_metrics.value_at_risk_95.toFixed(2)}
							</TableCell>
							<TableCell className="text-red-600 dark:text-red-400">
								{strategy.risk_metrics.conditional_var_95.toFixed(2)}
							</TableCell>
							<TableCell>
								{strategy.risk_metrics.profit_factor === Infinity
									? '∞'
									: strategy.risk_metrics.profit_factor.toFixed(2)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}