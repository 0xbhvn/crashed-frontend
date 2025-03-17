'use client';

import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AnalyticsContextType {
	crashPoint: number | null;
	setCrashPoint: (value: number | null) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
	undefined
);

interface AnalyticsProviderProps {
	children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
	const [crashPoint, setCrashPoint] = useState<number | null>(null);

	const value = {
		crashPoint,
		setCrashPoint,
	};

	return (
		<AnalyticsContext.Provider value={value}>
			{children}
		</AnalyticsContext.Provider>
	);
}

export function useAnalytics() {
	const context = useContext(AnalyticsContext);
	if (context === undefined) {
		throw new Error(
			'useAnalytics must be used within an AnalyticsProvider'
		);
	}
	return context;
}
