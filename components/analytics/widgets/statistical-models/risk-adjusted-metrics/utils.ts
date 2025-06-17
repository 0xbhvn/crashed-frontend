export function getRiskLevelColor(value: number, metric: string): string {
	switch (metric) {
		case 'sharpe':
			if (value > 1) return 'text-green-600 dark:text-green-400';
			if (value > 0.5) return 'text-yellow-600 dark:text-yellow-400';
			return 'text-red-600 dark:text-red-400';
		case 'drawdown':
			if (value < 10) return 'text-green-600 dark:text-green-400';
			if (value < 20) return 'text-yellow-600 dark:text-yellow-400';
			return 'text-red-600 dark:text-red-400';
		case 'win_rate':
			if (value > 50) return 'text-green-600 dark:text-green-400';
			if (value > 30) return 'text-yellow-600 dark:text-yellow-400';
			return 'text-red-600 dark:text-red-400';
		default:
			return '';
	}
}

export function getRiskBadgeVariant(value: number, metric: string): 'default' | 'secondary' | 'destructive' | 'outline' {
	switch (metric) {
		case 'sharpe':
			if (value > 1) return 'default'; // green
			if (value > 0.5) return 'secondary'; // yellow
			return 'destructive'; // red
		case 'drawdown':
			if (value < 10) return 'default'; // green
			if (value < 20) return 'secondary'; // yellow
			return 'destructive'; // red
		case 'win_rate':
			if (value > 50) return 'default'; // green
			if (value > 30) return 'secondary'; // yellow
			return 'destructive'; // red
		default:
			return 'outline';
	}
}

export function getRiskBadgeColor(value: number, metric: string): string {
	switch (metric) {
		case 'sharpe':
			if (value > 1) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
			if (value > 0.5) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
			return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
		case 'drawdown':
			if (value < 10) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
			if (value < 20) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
			return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
		case 'win_rate':
			if (value > 50) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
			if (value > 30) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
			return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
		case 'profit_factor':
			if (value > 1.5) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
			if (value > 1) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
			return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
		case 'consecutive_losses':
			if (value <= 3) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
			if (value <= 5) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
			return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
		default:
			return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
	}
}