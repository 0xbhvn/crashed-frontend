import { AnalyticsNav } from '@/components/analytics/analytics-nav';
import { TableSkeleton, QuartileTableSkeleton } from '@/components/analytics/loading-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-5xl">
                <AnalyticsNav />
                <div className="w-full space-y-6">
                    <div className="border rounded-lg p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Skeleton className="h-8 w-[200px] mb-2" />
                                <Skeleton className="h-4 w-[300px]" />
                            </div>
                            <div className="flex gap-4">
                                <Skeleton className="h-10 w-[150px]" />
                                <Skeleton className="h-10 w-[120px]" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="h-10 w-[100px]" />
                            <Skeleton className="h-10 w-[120px]" />
                            <Skeleton className="h-10 w-[100px]" />
                            <Skeleton className="h-10 w-[100px]" />
                        </div>
                    </div>
                    <Skeleton className="h-64 w-full rounded-lg" />
                    <QuartileTableSkeleton />
                    <TableSkeleton />
                </div>
            </main>
        </div>
    );
}