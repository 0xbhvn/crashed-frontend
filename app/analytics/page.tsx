'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnalyticsTable } from '@/components/analytics/widgets/AnalyticsTable';

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

				<AnalyticsTable className="w-full" />
			</main>
		</div>
	);
}
