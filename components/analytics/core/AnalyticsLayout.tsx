'use client';

import type React from 'react';

interface AnalyticsLayoutProps {
	children: React.ReactNode;
}

export default function AnalyticsLayout({ children }: AnalyticsLayoutProps) {
	return <div className="flex flex-col gap-6 w-full">{children}</div>;
}
