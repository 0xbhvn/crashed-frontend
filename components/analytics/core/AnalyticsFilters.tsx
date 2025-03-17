'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAnalytics } from '@/context/analytics-context';

interface AnalyticsFilters {
	crashPoint?: number;
}

interface AnalyticsFiltersProps {
	onFilterChange?: (filters: AnalyticsFilters) => void;
	className?: string;
}

const CRASH_POINTS = ['2.0', '3.0', '4.0', '5.0', '10.0'];

export function AnalyticsFilters({
	onFilterChange,
	className,
}: AnalyticsFiltersProps) {
	const { setCrashPoint } = useAnalytics();

	const handleCrashPointChange = (value: string) => {
		const numValue = Number.parseFloat(value);
		setCrashPoint(numValue);
		onFilterChange?.({
			crashPoint: numValue,
		});
	};

	return (
		<Card className={className}>
			<CardContent className="flex flex-wrap gap-4 p-4">
				<div className="flex flex-col gap-1.5">
					<span className="text-sm font-medium">Crash Point</span>
					<Tabs
						defaultValue="2.0"
						onValueChange={handleCrashPointChange}
						aria-label="Select crash point"
					>
						<TabsList className="grid grid-cols-5 w-[300px]">
							{CRASH_POINTS.map((point) => (
								<TabsTrigger
									key={point}
									value={point}
								>
									{point}x
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
				</div>
			</CardContent>
		</Card>
	);
}
