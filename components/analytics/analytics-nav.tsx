'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export function AnalyticsNav() {
    const pathname = usePathname();
    
    const navItems = [
        { href: '/analytics/last-games', label: 'Last Games' },
        { href: '/analytics/occurrences', label: 'Occurrences' },
        { href: '/analytics/series', label: 'Series' },
        { href: '/analytics/intervals', label: 'Intervals' },
    ];

    const statisticalItems = [
        { href: '/analytics/statistical-models/psychology', label: 'Psychology' },
        { href: '/analytics/statistical-models/expected-values', label: 'Expected Values' },
        { href: '/analytics/statistical-models/risk-reward', label: 'Risk/Reward' },
        { href: '/analytics/statistical-models/patterns', label: 'Patterns' },
        { href: '/analytics/statistical-models/risk-metrics', label: 'Risk Metrics' },
    ];

    const isStatisticalActive = pathname.startsWith('/analytics/statistical-models');

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-between">
            <h1 className="text-2xl font-bold text-center sm:text-left">
                Crash Analytics
            </h1>

            <div className="order-3 sm:order-2 flex-1 flex justify-center max-w-lg">
                <div className="bg-muted/50 p-0.5 rounded-md grid grid-cols-5 w-full">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                                    isActive
                                        ? "bg-black text-white shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                    <div className="relative group/statistical">
                        <Link
                            href="/analytics/statistical-models"
                            className={cn(
                                "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                                isStatisticalActive
                                    ? "bg-black text-white shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Statistical
                            <ChevronDown className="ml-1 h-3 w-3 transition-transform group-hover/statistical:rotate-180" />
                        </Link>
                        <div className="absolute top-full left-0 mt-1 w-48 opacity-0 invisible group-hover/statistical:opacity-100 group-hover/statistical:visible transition-all duration-200 z-50">
                            <div className="bg-popover text-popover-foreground border border-border rounded-md shadow-md overflow-hidden">
                                {statisticalItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "block px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                                                isActive && "bg-accent font-medium text-accent-foreground"
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 order-2 sm:order-3">
                <ThemeToggle />
                <Link href="/">
                    <Button variant="outline">Back to Instances</Button>
                </Link>
            </div>
        </div>
    );
}