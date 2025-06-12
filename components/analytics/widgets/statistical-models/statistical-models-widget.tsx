'use client';

import * as React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	BarChart3,
	AlertCircle,
} from 'lucide-react';
import { RiskAdjustedMetricsWidget } from './risk-adjusted-metrics-widget';
import { PatternAnalysisWidget } from './pattern-analysis-widget';
import { ExpectedValuesWidget } from './expected-values-widget';
import { MarketPsychologyWidget } from './market-psychology-widget';
import { RiskRewardProfilesWidget } from './risk-reward-profiles-widget';
import type { BaseWidgetProps } from '@/utils/export-utils/types';

export function StatisticalModelsWidget({ className }: BaseWidgetProps) {
	return (
		<div className={className}>
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<BarChart3 className="h-5 w-5" />
						Enhanced Statistical Models
						<Badge
							variant="secondary"
							className="text-xs uppercase"
						>
							Beta
						</Badge>
					</CardTitle>
					<CardDescription>
						Advanced statistical analysis specifically designed for
						BC.game crash mechanics, providing actionable insights
						for risk management and strategy optimization
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Alert className="mb-6">
						<AlertCircle className="h-4 w-4" />
						<AlertDescription>
							All recommendations are based on historical data and
							do not guarantee future results. Always gamble
							responsibly.
						</AlertDescription>
					</Alert>

					<Tabs
						defaultValue="risk-metrics"
						className="w-full"
					>
						<TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
							<TabsTrigger value="risk-metrics">
								<span className="hidden sm:inline">
									Risk Metrics
								</span>
								<span className="sm:hidden">Risk</span>
							</TabsTrigger>
							<TabsTrigger value="risk-reward">
								<span className="hidden sm:inline">
									Risk/Reward
								</span>
								<span className="sm:hidden">R/R</span>
							</TabsTrigger>
							<TabsTrigger value="patterns">
								<span className="hidden sm:inline">
									Patterns
								</span>
								<span className="sm:hidden">Pattern</span>
							</TabsTrigger>
							<TabsTrigger value="expected-values">
								<span className="hidden sm:inline">
									Expected Values
								</span>
								<span className="sm:hidden">EV</span>
							</TabsTrigger>
							<TabsTrigger value="psychology">
								<span className="hidden sm:inline">
									Psychology
								</span>
								<span className="sm:hidden">Psych</span>
							</TabsTrigger>
						</TabsList>

						<TabsContent
							value="risk-metrics"
							className="mt-6"
						>
							<RiskAdjustedMetricsWidget />
						</TabsContent>

						<TabsContent
							value="risk-reward"
							className="mt-6"
						>
							<RiskRewardProfilesWidget />
						</TabsContent>

						<TabsContent
							value="patterns"
							className="mt-6"
						>
							<PatternAnalysisWidget />
						</TabsContent>

						<TabsContent
							value="expected-values"
							className="mt-6"
						>
							<ExpectedValuesWidget />
						</TabsContent>

						<TabsContent
							value="psychology"
							className="mt-6"
						>
							<MarketPsychologyWidget />
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}
