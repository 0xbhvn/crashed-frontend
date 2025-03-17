'use client';

import type { ReactNode } from 'react';
import { AnalyticsProvider } from '@/context/analytics-context';

export default function AnalyticsLayout({ children }: { children: ReactNode }) {
	return <AnalyticsProvider>{children}</AnalyticsProvider>;
}
