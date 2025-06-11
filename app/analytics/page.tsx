'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	OccurrencesTable,
	LastGamesTable,
	SeriesWidget,
	IntervalsWidget,
	StatisticalModelsWidget,
	TabWrapper,
} from '@/components/analytics/widgets';
import { ThemeToggle } from '@/components/theme-toggle';

export default function AnalyticsPage() {
	const [activeTab, setActiveTab] = useState<string>('streaks');
	const [selectedType, setSelectedType] = useState<'current' | 'unique'>(
		'current'
	);

	// Use the activeTab value directly as the key to force remounting
	const componentKey = activeTab;

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-5xl">
				<div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-between">
					<h1 className="text-2xl font-bold text-center sm:text-left">
						Crash Analytics
					</h1>

					<Tabs
						defaultValue="streaks"
						value={activeTab}
						onValueChange={setActiveTab}
						className="order-3 sm:order-2 flex-1 flex justify-center max-w-lg"
					>
						<TabsList className="bg-muted/50 p-0.5 grid grid-cols-5 w-full">
							<TabsTrigger
								value="streaks"
								className="data-[state=active]:bg-black data-[state=active]:text-white text-xs sm:text-sm"
							>
								Last Games
							</TabsTrigger>
							<TabsTrigger
								value="occurrences"
								className="data-[state=active]:bg-black data-[state=active]:text-white text-xs sm:text-sm"
							>
								Occurrences
							</TabsTrigger>
							<TabsTrigger
								value="series"
								className="data-[state=active]:bg-black data-[state=active]:text-white text-xs sm:text-sm"
							>
								Series
							</TabsTrigger>
							<TabsTrigger
								value="interval"
								className="data-[state=active]:bg-black data-[state=active]:text-white text-xs sm:text-sm"
							>
								Intervals
							</TabsTrigger>
							<TabsTrigger
								value="statistical"
								className="data-[state=active]:bg-black data-[state=active]:text-white text-xs sm:text-sm"
							>
								Statistical
							</TabsTrigger>
						</TabsList>
					</Tabs>

					<div className="flex items-center gap-4 order-2 sm:order-3">
						<ThemeToggle />
						<Link href="/">
							<Button variant="outline">Back to Instances</Button>
						</Link>
					</div>
				</div>

				<div className="w-full">
					{activeTab === 'streaks' && (
						<TabWrapper key={`streaks-${componentKey}`}>
							<LastGamesTable
								className="w-full"
								selectedType={selectedType}
								setSelectedType={setSelectedType}
							/>
						</TabWrapper>
					)}
					{activeTab === 'occurrences' && (
						<TabWrapper key={`occurrences-${componentKey}`}>
							<OccurrencesTable className="w-full" />
						</TabWrapper>
					)}
					{activeTab === 'series' && (
						<TabWrapper key={`series-${componentKey}`}>
							<SeriesWidget className="w-full" />
						</TabWrapper>
					)}
					{activeTab === 'interval' && (
						<TabWrapper key={`interval-${componentKey}`}>
							<IntervalsWidget className="w-full" />
						</TabWrapper>
					)}
					{activeTab === 'statistical' && (
						<TabWrapper key={`statistical-${componentKey}`}>
							<StatisticalModelsWidget className="w-full" />
						</TabWrapper>
					)}
				</div>
			</main>
		</div>
	);
}
