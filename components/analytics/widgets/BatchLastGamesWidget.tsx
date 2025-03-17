'use client';

import React, { useEffect } from 'react';
import { AnalyticsCard } from '@/components/analytics/core/AnalyticsCard';
import { useBatchLastGames } from '@/hooks/analytics/useBatchLastGames';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

// Min crash points (current streak) - all values
const CURRENT_STREAK_POINTS = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 30, 40, 50, 100, 150, 200, 500, 1000,
];

// Exact crash points (unique streak) - only 1-10
const UNIQUE_STREAK_POINTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Union of both sets for API requests
const ALL_CRASH_POINTS = [
	...new Set([...CURRENT_STREAK_POINTS, ...UNIQUE_STREAK_POINTS]),
];

interface BatchLastGamesWidgetProps {
	className?: string;
}

export function BatchLastGamesWidget({ className }: BatchLastGamesWidgetProps) {
	const [type, setType] = React.useState<'current' | 'unique'>('current');
	const { data, isLoading, error } = useBatchLastGames({
		values: ALL_CRASH_POINTS,
	});

	// Log data when it changes
	useEffect(() => {
		console.log('BatchLastGamesWidget data:', data);
	}, [data]);

	const renderContent = () => {
		if (error) {
			return (
				<Alert
					variant="destructive"
					className="mt-4"
				>
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>{error.message}</AlertDescription>
				</Alert>
			);
		}

		return (
			<Tabs
				value={type}
				onValueChange={(value) =>
					setType(value as 'current' | 'unique')
				}
			>
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="current">Current Streak</TabsTrigger>
					<TabsTrigger value="unique">Unique Streak</TabsTrigger>
				</TabsList>
				<TabsContent value="current">
					<ScrollArea className="h-[300px] w-full">
						<div className="space-y-2 p-4">
							{isLoading ? (
								<div className="flex justify-center py-4">
									Loading data...
								</div>
							) : !data ? (
								<div className="flex justify-center py-4">
									No data available
								</div>
							) : (
								CURRENT_STREAK_POINTS.map((point) => (
									<div
										key={point}
										className="flex justify-between items-center"
									>
										<span>≥ {point}</span>
										<span>
											{data[point]?.current ?? 'N/A'}
										</span>
									</div>
								))
							)}
						</div>
					</ScrollArea>
				</TabsContent>
				<TabsContent value="unique">
					<ScrollArea className="h-[300px] w-full">
						<div className="space-y-2 p-4">
							{isLoading ? (
								<div className="flex justify-center py-4">
									Loading data...
								</div>
							) : !data ? (
								<div className="flex justify-center py-4">
									No data available
								</div>
							) : (
								UNIQUE_STREAK_POINTS.map((point) => (
									<div
										key={point}
										className="flex justify-between items-center"
									>
										<span>= {point}</span>
										<span>
											{data[point]?.unique ?? 'N/A'}
										</span>
									</div>
								))
							)}
						</div>
					</ScrollArea>
				</TabsContent>
			</Tabs>
		);
	};

	return (
		<AnalyticsCard
			title="Batch Analysis"
			description="Analysis of crash points across multiple values"
			className={className}
		>
			{renderContent()}
		</AnalyticsCard>
	);
}
