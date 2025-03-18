'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LastGamesTable } from '@/components/analytics/widgets/LastGamesTable';
import { OccurrencesTable } from '@/components/analytics/widgets/OccurrencesTable';

export default function AnalyticsPage() {
	const [activeTab, setActiveTab] = useState<string>('streaks');

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
						className="order-3 sm:order-2 flex-1 flex justify-center max-w-md"
					>
						<TabsList className="bg-muted/50 p-0.5 grid grid-cols-4 w-full">
							<TabsTrigger
								value="streaks"
								className="data-[state=active]:bg-black data-[state=active]:text-white text-sm"
							>
								Last Games
							</TabsTrigger>
							<TabsTrigger
								value="occurrences"
								className="data-[state=active]:bg-black data-[state=active]:text-white text-sm"
							>
								Occurrences
							</TabsTrigger>
							<TabsTrigger
								value="charts"
								className="data-[state=active]:bg-black data-[state=active]:text-white text-sm"
							>
								Series
							</TabsTrigger>
							<TabsTrigger
								value="interval"
								className="data-[state=active]:bg-black data-[state=active]:text-white text-sm"
							>
								Intervals
							</TabsTrigger>
						</TabsList>
					</Tabs>

					<Link
						href="/"
						className="order-2 sm:order-3"
					>
						<Button variant="outline">Back to Instances</Button>
					</Link>
				</div>

				<div className="w-full">
					{activeTab === 'streaks' && (
						<LastGamesTable className="w-full" />
					)}
					{activeTab === 'occurrences' && (
						<OccurrencesTable className="w-full" />
					)}
					{activeTab === 'charts' && (
						<div className="w-full text-center p-12 border rounded-md">
							Series view coming soon
						</div>
					)}
					{activeTab === 'interval' && (
						<div className="w-full text-center p-12 border rounded-md">
							Intervals view coming soon
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
