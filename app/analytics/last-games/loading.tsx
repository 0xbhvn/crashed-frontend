import { AnalyticsNav } from '@/components/analytics/analytics-nav';
import { TableSkeleton, CardsSkeleton } from '@/components/analytics/loading-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-5xl">
                <AnalyticsNav />
                <div className="w-full space-y-6">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-8 w-[200px]" />
                        <Skeleton className="h-10 w-[150px]" />
                    </div>
                    <CardsSkeleton />
                    <TableSkeleton />
                </div>
            </main>
        </div>
    );
}