'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnalyticsFilters } from '@/components/analytics/core/AnalyticsFilters';
import { LastOccurrenceWidget } from '@/components/analytics/widgets/LastOccurrenceWidget';
import { BatchLastGamesWidget } from '@/components/analytics/widgets/BatchLastGamesWidget';
import { AnalyticsCard } from '@/components/analytics/core/AnalyticsCard';

export default function AnalyticsPage() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-5xl">
				<div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-between">
					<h1 className="text-2xl font-bold text-center">
						Crash Analytics
					</h1>
					<Link href="/">
						<Button variant="outline">Back to Instances</Button>
					</Link>
				</div>

				<AnalyticsFilters className="w-full" />

				<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
					<LastOccurrenceWidget className="w-full" />

					<BatchLastGamesWidget className="w-full" />

					<AnalyticsCard
						title="Series Analysis"
						description="Track series of games without specific crash points"
						className="w-full"
					>
						<p className="text-muted-foreground">Coming soon</p>
					</AnalyticsCard>

					<AnalyticsCard
						title="Interval Analysis"
						description="Analyze crash points across time intervals"
						className="w-full"
					>
						<p className="text-muted-foreground">Coming soon</p>
					</AnalyticsCard>
				</div>
			</main>
		</div>
	);
}
