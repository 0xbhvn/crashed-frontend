# Risk/Reward Profiles Widget

This widget has been refactored following the patterns established in the Risk-Adjusted Metrics widget.

## File Structure

```text
risk-reward-profiles/
├── index.tsx                     # Export only
├── risk-reward-profiles-widget.tsx # Main widget component
├── controls.tsx                  # Control components (multi-select crash points, games input)
├── types.ts                      # TypeScript type definitions
├── utils.ts                      # Utility functions (color logic, data transforms)
├── scatter-plot.tsx              # Risk vs Reward scatter plot
├── efficient-frontier.tsx        # Sharpe ratio and win rate chart
├── strategy-radar.tsx            # Performance profile radar charts
├── risk-categories.tsx           # Risk categorization component
├── excel-export.ts               # Excel export configuration
├── html-export.ts                # HTML export configuration
└── README.md                     # This file
```

## Key Features

1. **Modular Structure**: Each visualization is in its own component
2. **Type Safety**: All types defined in `types.ts`
3. **Consistent Styling**: Follows the established patterns
4. **Export Support**: Both Excel and HTML export configurations
5. **Real-time Updates**: Uses the real-time hook for auto-refresh

## Components

### Main Widget

- Uses tab navigation with black active state
- Implements proper controls layout
- Handles state management for targets and limit

### Controls

- Multi-select crash points input
- Games limit input with Dices icon
- Export button integration

### Visualizations

1. **Scatter Plot**: Risk vs Reward analysis
2. **Efficient Frontier**: Sharpe ratio efficiency
3. **Strategy Radar**: Multi-dimensional performance comparison
4. **Risk Categories**: Strategy grouping by risk level

### Utilities

- Color functions for badges and text
- Data transformation functions
- Risk categorization logic

## Export Configurations

### Excel Export

- Multiple sheets: Overview, Risk Metrics, Performance, Drawdown Analysis, Summary
- Proper column definitions with widths
- Formatted data with appropriate decimal places

### HTML Export

- Custom HTML with styled tables
- Color-coded metrics
- Risk categorization display
- Responsive grid layouts
