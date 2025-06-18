# Pattern Analysis Widget

This widget provides advanced pattern analysis using entropy, autocorrelation, anomaly detection, and clustering techniques.

## Structure

The widget follows the modular architecture pattern established in the REFACTORING-GUIDE.md:

- `index.tsx` - Main export file
- `pattern-analysis-widget.tsx` - Main widget component with auto-apply functionality
- `controls.tsx` - Control components (auto-apply, no Apply buttons)
- `types.ts` - TypeScript interfaces and types
- `utils.ts` - Utility functions and constants
- `excel-export.ts` - Excel export configuration
- `html-export.ts` - HTML export configuration

### Components

- `summary-cards.tsx` - Summary metrics display cards
- `clustering-chart.tsx` - Pie chart showing crash point distribution
- `anomalies-table.tsx` - Table of anomalous games
- `autocorrelation-chart.tsx` - Bar chart for autocorrelation analysis
- `patterns-analysis.tsx` - Pattern detection visualizations

## Features

- **Auto-apply inputs**: Changes to limit and threshold apply automatically with debouncing
- **Real-time data**: Uses real-time pattern analysis hook
- **Export functionality**: Excel and HTML export support
- **Modular design**: Clean separation of concerns
- **Consistent styling**: Matches other analytics widgets

## Usage

```tsx
import { PatternAnalysisWidget } from '@/components/analytics/widgets/statistical-models/pattern-analysis';

<PatternAnalysisWidget className="w-full" />
```

## Data Analysis

The widget analyzes:

- **Randomness Score**: Entropy-based randomness measurement
- **Anomaly Detection**: Statistical outliers using Z-score analysis
- **Clustering**: Distribution of crash points across categories
- **Autocorrelation**: Temporal correlations in crash sequences
- **Pattern Recognition**: Trend analysis, peak detection, and periodicity
