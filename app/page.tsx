'use client';

import { Component as TableDemo } from '@/components/table-demo';

export default function Home() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-5xl">
				<h1 className="text-2xl font-bold text-center">
					Crash Instances
				</h1>
				<div className="w-full">
					<TableDemo />
				</div>
			</main>
		</div>
	);
}
