'use client';

import GamesTableWrapper from '@/components/games-table-wrapper';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-5xl">
				<div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-between">
					<h1 className="text-2xl font-bold text-center">
						Crash Instances
					</h1>
					<Link href="/analytics">
						<Button variant="outline">Analytics</Button>
					</Link>
				</div>
				<div className="w-full">
					<GamesTableWrapper />
				</div>
			</main>
		</div>
	);
}
