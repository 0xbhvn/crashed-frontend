'use client';

import React from 'react';
import { AnalyticsCard } from '../core/AnalyticsCard';
import { Button } from '@/components/ui/button';
import { useLastOccurrence } from '@/hooks/analytics/useLastOccurrence';
import { useAnalytics } from '@/context/analytics-context';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface LastOccurrenceWidgetProps {
	className?: string;
}

export function LastOccurrenceWidget({ className }: LastOccurrenceWidgetProps) {
	const { crashPoint, setCrashPoint } = useAnalytics();
	const { data, isLoading, error } = useLastOccurrence({
		crashPoint: crashPoint || 2.0,
	});

	const handleCrashPointClick = () => {
		const currentPoint = crashPoint || 2.0;
		setCrashPoint(currentPoint < 10 ? currentPoint + 1 : 2.0);
	};

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
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={handleCrashPointClick}
							className="text-lg font-medium hover:text-primary"
						>
							{crashPoint || 2.0}x
						</button>
						<span className="text-sm text-muted-foreground">
							Crash Point
						</span>
					</div>
					<div className="flex flex-col">
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
									{data.game.endTime})
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
							) : data.gamesSince !== undefined ? (
								<span>{data.gamesSince}</span>
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
			className={className}
			footer={
				<Button
					variant="outline"
					size="sm"
				>
					View Details
				</Button>
			}
		>
			{renderContent()}
		</AnalyticsCard>
	);
}
