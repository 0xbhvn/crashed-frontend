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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3 } from 'lucide-react';
import { RiskAdjustedMetricsWidget } from './risk-adjusted-metrics';
import { RiskRewardProfilesWidget } from './risk-reward-profiles';
import { PatternAnalysisWidget } from './pattern-analysis';
import { ExpectedValuesWidget } from './expected-values';
import { MarketPsychologyWidget } from './market-psychology';
import type { BaseWidgetProps } from '@/utils/export-utils/types';

export function StatisticalModelsWidget({ className }: BaseWidgetProps) {
	return (
		<div className={className}>
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<BarChart3 className="h-5 w-5" />
						Statistical Models
						<Badge
							variant="secondary"
							className="text-xs uppercase"
						>
							Beta
						</Badge>
					</CardTitle>
					<CardDescription>
						Advanced crash game analysis for risk management and
						strategy optimization
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs
						defaultValue="psychology"
						className="w-full"
					>
						<div className="bg-muted/50 p-0.5 rounded-md">
							<TabsList className="grid w-full grid-cols-5 bg-transparent p-0">
								<TabsTrigger
									value="psychology"
									className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:!bg-black data-[state=active]:!text-white data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground border-0 data-[state=active]:border-0"
								>
									Psychology
								</TabsTrigger>
								<TabsTrigger
									value="expected-values"
									className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:!bg-black data-[state=active]:!text-white data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground border-0 data-[state=active]:border-0"
								>
									Expected Values
								</TabsTrigger>
								<TabsTrigger
									value="risk-reward"
									className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:!bg-black data-[state=active]:!text-white data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground border-0 data-[state=active]:border-0"
								>
									Risk/Reward
								</TabsTrigger>
								<TabsTrigger
									value="patterns"
									className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:!bg-black data-[state=active]:!text-white data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground border-0 data-[state=active]:border-0"
								>
									Patterns
								</TabsTrigger>
								<TabsTrigger
									value="risk-metrics"
									className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:!bg-black data-[state=active]:!text-white data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground border-0 data-[state=active]:border-0"
								>
									Risk Metrics
								</TabsTrigger>
							</TabsList>
						</div>

						<TabsContent
							value="psychology"
							className="mt-6"
						>
							<MarketPsychologyWidget />
						</TabsContent>

						<TabsContent
							value="expected-values"
							className="mt-6"
						>
							<ExpectedValuesWidget />
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
							value="risk-metrics"
							className="mt-6"
						>
							<RiskAdjustedMetricsWidget />
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}
