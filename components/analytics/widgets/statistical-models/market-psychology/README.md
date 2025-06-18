# Market Psychology Widget

## Overview
The Market Psychology widget provides comprehensive sentiment and behavioral analysis of market patterns, helping traders understand the psychological state of the market and make informed decisions.

## Key Features

### 1. Fear & Greed Index
- **Composite Score**: 0-100 scale indicating market sentiment
- **Components**:
  - Performance: Recent winning performance metrics
  - Volatility (inverted): Lower volatility indicates greed
  - High Multipliers: Frequency of high multiplier outcomes
  - Bust Frequency (inverted): Lower bust rate indicates greed
- **Visual Representation**: Radial gauge chart with color-coded sentiment

### 2. Market State Analysis
- **Current States**: Real-time market condition flags
- **Risk Level**: Categorized from Low to Very High
- **Opportunity Score**: 0-100 scale for potential opportunities
- **Trading Recommendations**: AI-generated actionable insights

### 3. Detailed Indicators

#### Bust Frequency Index
- Compares recent bust rates to historical averages
- Index > 100: Higher than average bust frequency
- Helps identify periods of increased risk

#### Volatility Regime
- Current volatility vs. historical levels
- Percentile ranking for context
- Regime classification (Low/Normal/High/Extreme)

#### Momentum Indicators
- RSI (Relative Strength Index)
- Trend classification (Bullish/Bearish/Neutral)
- Momentum score indicating strength of trend

## Interpretation Guide

### Fear & Greed Index
- **0-25**: Extreme Fear (Green) - Potential buying opportunity
- **25-40**: Fear (Light Green) - Market pessimism
- **40-60**: Neutral (Yellow) - Balanced sentiment
- **60-75**: Greed (Orange) - Market optimism
- **75-100**: Extreme Greed (Red) - Potential selling opportunity

### Risk Levels
- **Low**: Favorable conditions for trading
- **Medium**: Normal market conditions
- **High**: Increased caution recommended
- **Very High**: Consider reducing exposure

### Momentum Trends
- **Bullish**: Upward momentum, positive outlook
- **Bearish**: Downward momentum, negative outlook
- **Neutral**: No clear directional bias

## Technical Details

### Parameters
- **Games to Analyze**: Number of recent games to include (default: 2000)
- **Window Sizes**: Short/Long periods for moving averages (default: 50/200)

### Data Requirements
- Minimum 200 games for reliable momentum indicators
- Minimum 50 games for volatility calculations
- Real-time updates as new game data arrives

### Export Options
- **Excel**: Comprehensive data tables with all metrics and components
- **HTML**: Interactive charts with visual representations

## Use Cases

1. **Risk Management**: Monitor market conditions to adjust position sizes
2. **Timing Entries**: Use extreme fear/greed levels for contrarian trades
3. **Trend Confirmation**: Combine momentum indicators with other analysis
4. **Volatility Trading**: Identify regime changes for strategy adjustments

## Best Practices

1. **Don't Trade on Single Indicator**: Combine with other analysis tools
2. **Context Matters**: Consider overall market conditions
3. **Regular Monitoring**: Psychology can shift rapidly
4. **Risk Management**: Use higher risk levels to reduce exposure
5. **Contrarian Approach**: Extreme readings often precede reversals