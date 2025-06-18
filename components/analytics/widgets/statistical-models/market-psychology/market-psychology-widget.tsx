'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Brain } from 'lucide-react';
import { StatisticalModelsSkeleton } from '@/components/analytics/loading-skeleton';
import { useRealTimeMarketPsychology } from '@/hooks/analytics/statistical-models';
import { MarketPsychologyControls } from './controls';
import { FearGreedIndex } from './fear-greed-index';
import { MarketStateAnalysis } from './market-state-analysis';
import { DetailedIndicators } from './detailed-indicators';
import { getExcelConfig } from './excel-export';
import { getHtmlExportConfig } from './html-export';
import type { BaseWidgetProps } from '@/utils/export-utils/types';

export function MarketPsychologyWidget({ className }: BaseWidgetProps) {
  const [limit, setLimit] = React.useState<number>(2000);
  const [limitInput, setLimitInput] = React.useState<string>('2000');
  const [shortWindow, setShortWindow] = React.useState<number>(50);
  const [shortWindowInput, setShortWindowInput] = React.useState<string>('50');
  const [longWindow, setLongWindow] = React.useState<number>(200);
  const [longWindowInput, setLongWindowInput] = React.useState<string>('200');

  const { data, isLoading, error, refreshData } = useRealTimeMarketPsychology({
    limit,
    shortWindow,
    longWindow,
    enabled: true,
  });

  const handleLimitChange = () => {
    const newLimit = parseInt(limitInput);
    if (!isNaN(newLimit) && newLimit > 0) {
      setLimit(newLimit);
    } else {
      setLimitInput(limit.toString());
    }
  };

  const handleWindowChange = () => {
    const newShort = parseInt(shortWindowInput);
    const newLong = parseInt(longWindowInput);
    if (
      !isNaN(newShort) &&
      newShort > 0 &&
      !isNaN(newLong) &&
      newLong > newShort
    ) {
      setShortWindow(newShort);
      setLongWindow(newLong);
    } else {
      setShortWindowInput(shortWindow.toString());
      setLongWindowInput(longWindow.toString());
    }
  };

  const getExcelConfigCallback = React.useCallback(async () => {
    if (!data) throw new Error('No data available');
    return getExcelConfig({ data, limit, shortWindow, longWindow });
  }, [data, limit, shortWindow, longWindow]);

  const getHtmlConfigCallback = React.useCallback(async () => {
    if (!data) throw new Error('No data available');
    const config = getHtmlExportConfig({ data, limit, shortWindow, longWindow });
    return {
      title: 'Market Psychology Analysis',
      subtitle: `${limit} games | Windows: ${shortWindow}/${longWindow}`,
      fileName: config.fileName,
      customHtml: config.content,
    };
  }, [data, limit, shortWindow, longWindow]);

  React.useEffect(() => {
    refreshData();
  }, [limit, shortWindow, longWindow, refreshData]);

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Market Psychology Indicators
          </CardTitle>
          <CardDescription>
            Advanced sentiment analysis including Fear & Greed index and momentum indicators
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <MarketPsychologyControls
            limit={limit}
            limitInput={limitInput}
            shortWindow={shortWindow}
            shortWindowInput={shortWindowInput}
            longWindow={longWindow}
            longWindowInput={longWindowInput}
            onLimitChange={setLimitInput}
            onLimitApply={handleLimitChange}
            onShortWindowChange={setShortWindowInput}
            onLongWindowChange={setLongWindowInput}
            onWindowApply={handleWindowChange}
            getExcelConfig={getExcelConfigCallback}
            getChartConfig={getHtmlConfigCallback}
          />

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {data && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FearGreedIndex data={data.fear_greed_index} />
                <MarketStateAnalysis
                  data={data.market_state}
                  recommendations={data.trading_recommendations}
                />
              </div>

              <DetailedIndicators
                bustFrequency={data.bust_frequency_index}
                volatilityRegime={data.volatility_regime}
                momentumIndicators={data.momentum_indicators}
              />
            </>
          )}

          {isLoading && !data && <StatisticalModelsSkeleton />}
        </CardContent>
      </Card>
    </div>
  );
}