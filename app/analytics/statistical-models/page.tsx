import { StatisticalModelsWidget } from '@/components/analytics/widgets';
import { AnalyticsNav } from '@/components/analytics/analytics-nav';

export default function StatisticalModelsPage() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-5xl">
                <AnalyticsNav />
                <StatisticalModelsWidget className="w-full" />
            </main>
        </div>
    );
}