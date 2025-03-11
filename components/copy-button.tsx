'use client';

import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import type { Row } from '@tanstack/react-table';
import type { Game } from '@/models/game';
import { useClipboard } from '@/hooks/use-clipboard';

interface CopyButtonProps {
	rows: Row<Game>[];
	disabled?: boolean;
}

export function CopyButton({ rows, disabled = false }: CopyButtonProps) {
	const { copySuccess, copyTableDataToClipboard } = useClipboard();

	return (
		<Button
			variant="outline"
			size="sm"
			onClick={() => copyTableDataToClipboard(rows)}
			className="h-8 gap-1"
			title="Copy data to clipboard for spreadsheet"
			disabled={disabled || !rows.length}
		>
			{copySuccess ? (
				<>
					<Check className="h-3.5 w-3.5" />
					<span>Copied!</span>
				</>
			) : (
				<>
					<Copy className="h-3.5 w-3.5" />
					<span>Copy Data</span>
				</>
			)}
		</Button>
	);
}
