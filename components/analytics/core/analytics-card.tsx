import type React from 'react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card';

interface AnalyticsCardProps {
	title: string;
	description?: string;
	children: React.ReactNode;
	footer?: React.ReactNode;
	className?: string;
	stats?: {
		label: string;
		value: number | string;
	};
}

export function AnalyticsCard({
	title,
	description,
	children,
	footer,
	className,
	stats,
}: AnalyticsCardProps) {
	return (
		<Card className={className}>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<div>
					<CardTitle>{title}</CardTitle>
					{description && (
						<CardDescription>{description}</CardDescription>
					)}
				</div>
				{stats && (
					<div className="flex items-center bg-muted px-3 py-1 rounded-md">
						<span className="text-sm font-medium mr-1">
							{stats.label}:
						</span>
						<span className="text-sm font-bold">{stats.value}</span>
					</div>
				)}
			</CardHeader>
			<CardContent>{children}</CardContent>
			{footer && <CardFooter>{footer}</CardFooter>}
		</Card>
	);
}
