'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [isMounted, setIsMounted] = useState(false);

	// Avoid hydration mismatch
	useEffect(() => {
		setIsMounted(true);
	}, []);

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	if (!isMounted) {
		return null;
	}

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<div className="flex items-center border border-border rounded-md h-8 px-2">
						<Button
							variant="ghost"
							size="icon"
							onClick={toggleTheme}
							className="h-6 w-6 p-0"
						>
							{theme === 'dark' ? (
								<Moon className="h-4 w-4 text-muted-foreground" />
							) : (
								<Sun className="h-4 w-4 text-muted-foreground" />
							)}
						</Button>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p>Switch to {theme === 'dark' ? 'light' : 'dark'} mode</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
