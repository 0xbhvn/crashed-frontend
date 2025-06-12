import { Skeleton } from '@/components/ui/skeleton';
import { AnalyticsNav } from '@/components/analytics/analytics-nav';

export function AnalyticsPageSkeleton({ showNav = true }: { showNav?: boolean }) {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-5xl">
                {showNav && <AnalyticsNav />}
                <div className="w-full space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-64 w-full" />
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                </div>
            </main>
        </div>
    );
}

export function TableSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-[250px]" />
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-[100px]" />
                    <Skeleton className="h-10 w-[100px]" />
                </div>
            </div>
            <div className="border rounded-lg">
                <div className="p-4 space-y-3">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function CardsSkeleton() {
    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border rounded-lg p-4 space-y-3">
                    <Skeleton className="h-6 w-[150px]" />
                    <Skeleton className="h-10 w-[100px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            ))}
        </div>
    );
}

export function QuartileTableSkeleton() {
    return (
        <div className="border rounded-lg p-4">
            <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-20" />
                </div>
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-4 w-24" />
                        <div className="flex items-center gap-1">
                            <Skeleton className="h-4 w-8" />
                            <Skeleton className="h-5 w-12 rounded" />
                        </div>
                        <div className="flex items-center gap-1">
                            <Skeleton className="h-4 w-8" />
                            <Skeleton className="h-5 w-12 rounded" />
                        </div>
                        <div className="flex items-center gap-1">
                            <Skeleton className="h-4 w-8" />
                            <Skeleton className="h-5 w-12 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function IntervalsTableSkeleton() {
    return (
        <div className="border rounded-lg overflow-hidden">
            <div className="p-4">
                <div className="grid grid-cols-7 gap-2">
                    <Skeleton className="h-8 w-full" />
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-full" />
                    ))}
                </div>
                {Array.from({ length: 8 }).map((_, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-7 gap-2 mt-2">
                        <Skeleton className="h-16 w-full" />
                        {Array.from({ length: 6 }).map((_, colIndex) => (
                            <div key={colIndex} className="space-y-1">
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-4 w-12 mx-auto" />
                                <Skeleton className="h-3 w-16 mx-auto" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function StatisticalModelsSkeleton() {
    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="border rounded-lg p-6 space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-[200px]" />
                                <Skeleton className="h-4 w-[150px]" />
                            </div>
                            <Skeleton className="h-9 w-9 rounded-md" />
                        </div>
                        <Skeleton className="h-20 w-full" />
                        <div className="flex justify-between">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-6 w-[80px] rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}