'use client';

import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { AnalyticsCard } from '../core/AnalyticsCard';
import { useLastOccurrence } from '@/hooks/analytics/useLastOccurrence';
import { useAnalytics } from '@/context/analytics-context';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDuration, intervalToDuration } from 'date-fns';
import { cn } from '@/lib/utils';

interface LastOccurrenceWidgetProps {
	className?: string;
}

export function LastOccurrenceWidget({ className }: LastOccurrenceWidgetProps) {
	const { crashPoint, setCrashPoint } = useAnalytics();
	const { data, isLoading, error } = useLastOccurrence({
		crashPoint: crashPoint || 10.0,
	});
	const [timeAgo, setTimeAgo] = useState<string>('');

	// Update the time ago every second
	useEffect(() => {
		if (!data?.game?.beginTime) return;

		const updateTimeAgo = () => {
			if (data?.game?.beginTime) {
				const interval = intervalToDuration({
					start: new Date(data.game.beginTime),
					end: new Date(),
				});

				const formatted = formatDuration(interval, {
					format: ['hours', 'minutes', 'seconds'],
					delimiter: ', ',
				});

				setTimeAgo(formatted ? `${formatted} ago` : 'just now');
			}
		};

		// Initial update
		updateTimeAgo();

		// Set up interval to update every second
		const intervalId = setInterval(updateTimeAgo, 1000);

		// Clean up on unmount or when data changes
		return () => clearInterval(intervalId);
	}, [data]);

	const handleCrashPointChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setCrashPoint(Number(e.target.value));
	};

	const renderContent = () => {
		if (error) {
			return (
				<Alert
					variant="destructive"
					className="mt-2"
				>
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>{error.message}</AlertDescription>
				</Alert>
			);
		}

		return (
			<div className="flex flex-col">
				<div className="flex flex-col gap-1.5">
					<div className="flex items-center gap-2">
						<select
							className="h-8 w-fit rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
							value={crashPoint || 10.0}
							onChange={handleCrashPointChange}
							aria-label="Crash point"
						>
							{/* Options 1-10 individually */}
							{Array.from({ length: 10 }, (_, i) => i + 1).map(
								(value) => (
									<option
										key={value}
										value={value}
									>
										{value}x
									</option>
								)
							)}
							{/* Higher options with larger increments */}
							{[15, 20, 30, 40, 50, 100, 150, 200, 500, 1000].map(
								(value) => (
									<option
										key={value}
										value={value}
									>
										{value}x
									</option>
								)
							)}
						</select>
						<span className="text-sm text-muted-foreground">
							Crash Point
						</span>
						{data?.game?.crashPoint && (
							<Badge
								variant="outline"
								className="ml-2"
							>
								Exact: {data.game.crashPoint}x
							</Badge>
						)}
					</div>
					<div className="flex flex-col pt-1">
						<span className="text-sm">
							Last:{' '}
							{isLoading ? (
								<span className="text-muted-foreground">
									Loading...
								</span>
							) : !data ? (
								<span className="text-muted-foreground">
									No data available
								</span>
							) : data.game ? (
								<span>
									Game #{data.game.gameId} (
									{timeAgo || 'calculating...'})
								</span>
							) : (
								<span className="text-muted-foreground">
									No matching games found
								</span>
							)}
						</span>
						<span className="text-sm">
							Games since:{' '}
							{isLoading ? (
								<span className="text-muted-foreground">
									Loading...
								</span>
							) : !data ? (
								<span className="text-muted-foreground">-</span>
							) : data.games_since !== undefined ? (
								<span>{data.games_since}</span>
							) : (
								<span className="text-muted-foreground">-</span>
							)}
						</span>
					</div>
				</div>
			</div>
		);
	};

	return (
		<AnalyticsCard
			title="Last Occurrence"
			description="Find when specific crash points last occurred"
			className={cn('h-auto max-h-[200px]', className)}
		>
			{renderContent()}
		</AnalyticsCard>
	);
}
