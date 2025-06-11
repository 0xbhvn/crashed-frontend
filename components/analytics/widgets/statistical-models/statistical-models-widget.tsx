'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp, Activity, Target } from 'lucide-react';
import { MovingAveragesWidget } from './moving-averages-widget';
import { VolatilityIndicatorsWidget } from './volatility-indicators-widget';
import { ProbabilityDistributionWidget } from './probability-distribution-widget';
import { StreakAnalysisWidget } from './streak-analysis-widget';
import type { BaseWidgetProps } from '@/utils/export-utils/types';

export function StatisticalModelsWidget({ className }: BaseWidgetProps) {
	return (
		<div className={className}>
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<BarChart3 className="h-5 w-5" />
						Advanced Statistical Models
					</CardTitle>
					<CardDescription>
						Comprehensive statistical analysis of crash game patterns including moving averages, 
						volatility indicators, probability distributions, and streak detection
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="moving-averages" className="w-full">
						<TabsList className="grid w-full grid-cols-4">
							<TabsTrigger value="moving-averages" className="flex items-center gap-2">
								<TrendingUp className="h-4 w-4" />
								<span className="hidden sm:inline">Moving Averages</span>
								<span className="sm:hidden">MA</span>
							</TabsTrigger>
							<TabsTrigger value="volatility" className="flex items-center gap-2">
								<Activity className="h-4 w-4" />
								<span className="hidden sm:inline">Volatility</span>
								<span className="sm:hidden">Vol</span>
							</TabsTrigger>
							<TabsTrigger value="distribution" className="flex items-center gap-2">
								<BarChart3 className="h-4 w-4" />
								<span className="hidden sm:inline">Distribution</span>
								<span className="sm:hidden">Dist</span>
							</TabsTrigger>
							<TabsTrigger value="streaks" className="flex items-center gap-2">
								<Target className="h-4 w-4" />
								<span className="hidden sm:inline">Streaks</span>
								<span className="sm:hidden">Str</span>
							</TabsTrigger>
						</TabsList>

						<TabsContent value="moving-averages" className="mt-6">
							<MovingAveragesWidget />
						</TabsContent>

						<TabsContent value="volatility" className="mt-6">
							<VolatilityIndicatorsWidget />
						</TabsContent>

						<TabsContent value="distribution" className="mt-6">
							<ProbabilityDistributionWidget />
						</TabsContent>

						<TabsContent value="streaks" className="mt-6">
							<StreakAnalysisWidget />
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}