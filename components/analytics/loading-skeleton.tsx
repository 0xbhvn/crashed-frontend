import { Skeleton } from '@/components/ui/skeleton';
import { AnalyticsNav } from '@/components/analytics/analytics-nav';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

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
    // For games mode with 25 intervals: 00-24, 25-49, 50-74, 75-99
    const columnHeaders = ['00-24', '25-49', '50-74', '75-99'];
    const rowCount = 20; // Show 20 rows for 2000 games

    return (
        <div className="rounded-md border overflow-x-auto">
            <Table className="border-collapse [&_td]:border [&_th]:border [&_td]:border-border [&_th]:border-border">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-20 text-center border-r">
                            <Skeleton className="h-4 w-14 mx-auto" />
                        </TableHead>
                        {columnHeaders.map((header, i) => (
                            <TableHead
                                key={i}
                                className="text-center whitespace-nowrap"
                            >
                                <Skeleton className="h-4 w-14 mx-auto" />
                            </TableHead>
                        ))}
                        <TableHead className="text-center whitespace-nowrap bg-muted/30 font-bold border-l-2 border-l-muted-foreground/20 pl-4">
                            <Skeleton className="h-4 w-24 mx-auto" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: rowCount }).map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                            <TableCell className="font-medium text-center border-r">
                                <Skeleton className="h-4 w-16 mx-auto" />
                            </TableCell>
                            {columnHeaders.map((_, colIndex) => (
                                <TableCell key={colIndex} className="text-center">
                                    <div className="flex items-stretch w-full divide-x divide-border">
                                        <div className="flex-1 flex items-center justify-center text-2xl">
                                            <Skeleton className="h-7 w-8" />
                                        </div>
                                        <div className="flex-1 flex flex-col items-center divide-y divide-border">
                                            <div className="py-1 w-full flex justify-center">
                                                <Skeleton className="h-5 w-14 rounded" />
                                            </div>
                                            <div className="py-1 w-full flex justify-center">
                                                <Skeleton className="h-3 w-10" />
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                            ))}
                            <TableCell className="text-center bg-muted/30 border-l-2 border-l-muted-foreground/20 pl-4">
                                <div className="flex items-stretch w-full divide-x divide-border">
                                    <div className="flex-1 flex items-center justify-center text-2xl font-medium">
                                        <Skeleton className="h-7 w-12" />
                                    </div>
                                    <div className="flex-1 flex flex-col items-center divide-y divide-border">
                                        <div className="py-1 w-full flex justify-center">
                                            <Skeleton className="h-5 w-14 rounded" />
                                        </div>
                                        <div className="py-1 w-full flex justify-center">
                                            <Skeleton className="h-3 w-12" />
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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