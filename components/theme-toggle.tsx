'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

export function ThemeToggle() {
	const { theme, setTheme, systemTheme } = useTheme();
	const [isMounted, setIsMounted] = useState(false);

	// Avoid hydration mismatch
	useEffect(() => {
		setIsMounted(true);
	}, []);

	const toggleTheme = () => {
		if (theme === 'system') {
			setTheme('light');
		} else if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('system');
		}
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
							{theme === 'system' ? (
								<Monitor className="h-4 w-4 text-foreground" />
							) : theme === 'dark' ? (
								<Moon className="h-4 w-4 text-foreground" />
							) : (
								<Sun className="h-4 w-4 text-foreground" />
							)}
						</Button>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p>
						{theme === 'system'
							? `Using system theme (${systemTheme})`
							: theme === 'dark'
							? 'Switch to system theme'
							: 'Switch to dark mode'}
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
