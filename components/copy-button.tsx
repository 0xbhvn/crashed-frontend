'use client';

import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import type { Row } from '@tanstack/react-table';
import type { Game } from '@/models/game';
import { useClipboard } from '@/hooks/useClipboard';
import { useEffect, useCallback, useState } from 'react';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';

interface CopyButtonProps {
	rows?: Row<Game>[];
	disabled?: boolean;
	onClick?: () => void;
	className?: string;
	showTextLabel?: boolean;
	tooltipText?: string;
	// If copySuccess is passed externally, use it, otherwise use internal state from useClipboard
	externalCopySuccess?: boolean;
}

export function CopyButton({
	rows,
	disabled = false,
	onClick,
	className = 'h-8 gap-1',
	showTextLabel = true,
	tooltipText,
	externalCopySuccess,
}: CopyButtonProps) {
	const { copySuccess: internalCopySuccess, copyTableDataToClipboard } =
		useClipboard();
	const [isMac, setIsMac] = useState(false);

	// Use externally provided copySuccess if available, otherwise use internal state
	const copySuccess =
		externalCopySuccess !== undefined
			? externalCopySuccess
			: internalCopySuccess;

	// Detect if user is on Mac for correct keyboard shortcut display
	useEffect(() => {
		if (typeof window !== 'undefined') {
			// Check for Mac platform
			const userAgent = window.navigator.userAgent;
			setIsMac(userAgent.includes('Mac'));
		}
	}, []);

	// Handle keyboard shortcut (Cmd+C on Mac, Ctrl+C on Windows/Linux)
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			const isCmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
			if (
				isCmdOrCtrl &&
				e.key === 'c' &&
				!disabled &&
				!e.shiftKey &&
				!e.altKey &&
				!copySuccess // Don't trigger again if already copying
			) {
				// Only handle if it's a simple Cmd+C or Ctrl+C without modifiers
				// and if there's no text selection (which would trigger the browser's default copy)
				const selection = window.getSelection();
				if (!selection || selection.toString() === '') {
					e.preventDefault();
					if (onClick) {
						onClick();
					} else if (rows) {
						copyTableDataToClipboard(rows);
					}
				}
			}
		},
		[isMac, disabled, onClick, rows, copyTableDataToClipboard, copySuccess]
	);

	// Add keyboard shortcut listeners
	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);

	// Handle button click
	const handleClick = () => {
		if (!copySuccess) {
			// Prevent triggering again while already copying
			if (onClick) {
				onClick();
			} else if (rows) {
				copyTableDataToClipboard(rows);
			}
		}
	};

	// Generate tooltip text based on OS
	const getTooltipText = () => {
		if (tooltipText) return tooltipText;

		const shortcut = isMac ? '⌘+C' : 'Ctrl+C';
		return copySuccess
			? 'Copied to clipboard!'
			: `Copy table data to clipboard (${shortcut})`;
	};

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					onClick={handleClick}
					className={className}
					title="Copy data to clipboard for spreadsheet"
					disabled={disabled || (rows && !rows.length) || copySuccess}
				>
					{copySuccess ? (
						<>
							<Check className="h-3.5 w-3.5" />
							{showTextLabel && <span>Copied!</span>}
						</>
					) : (
						<>
							<Copy className="h-3.5 w-3.5" />
							{showTextLabel && <span>Copy Data</span>}
						</>
					)}
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>{getTooltipText()}</p>
			</TooltipContent>
		</Tooltip>
	);
}
