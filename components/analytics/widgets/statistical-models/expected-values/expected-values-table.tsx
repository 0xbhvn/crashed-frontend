'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from '@/components/ui/chart';
import type { ExpectedValuesData } from './types';
import { formatNumber, formatChartData } from './utils';

interface ExpectedValuesTableProps {
  data: ExpectedValuesData;
}

const chartConfig = {
  scatter: {
    label: 'Target',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function ExpectedValuesTable({ data }: ExpectedValuesTableProps) {
  const chartData = formatChartData(data);

  // Color based on expected value
  const getPointColor = (expectedValue: number) => {
    if (expectedValue > 0.1) return 'hsl(160, 84%, 40%)'; // Teal
    if (expectedValue > 0) return 'hsl(199, 89%, 48%)'; // Blue
    if (expectedValue > -0.05) return 'hsl(36, 100%, 50%)'; // Amber
    return 'hsl(0, 84%, 60%)'; // Red
  };

  return (
    <div className="space-y-6">
      {/* EV Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Expected Value by Target</CardTitle>
          <CardDescription>
            Comparison of expected values across different target multipliers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 60,
                  left: 60,
                }}
                data={chartData}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="target"
                  type="number"
                  scale="log"
                  domain={['dataMin', 'dataMax']}
                  tickLine={false}
                  axisLine={false}
                  label={{
                    value: 'Target Multiplier (x)',
                    position: 'insideBottom',
                    offset: -10,
                  }}
                />
                <YAxis
                  dataKey="expectedValue"
                  tickLine={false}
                  axisLine={false}
                  label={{
                    value: 'Expected Value',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                  tickFormatter={(value) => formatNumber(value, 4)}
                />
                <ChartTooltip
                  content={(props) => {
                    if (!props.active || !props.payload?.length) return null;
                    const data = props.payload[0].payload;
                    
                    return (
                      <div className="border-border/50 bg-background rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
                        <div className="p-2 space-y-1">
                          <p className="text-sm font-medium">Target {data.target}x</p>
                          <div className="rounded overflow-hidden border border-border/30 mt-2">
                            <table className="w-full">
                              <tbody>
                                <tr className="bg-muted/30">
                                  <td className="px-2 py-1 font-medium">Expected Value</td>
                                  <td className="px-2 py-1 text-right">{formatNumber(data.expectedValue, 6)}</td>
                                </tr>
                                <tr>
                                  <td className="px-2 py-1 font-medium">Empirical Prob</td>
                                  <td className="px-2 py-1 text-right">{formatNumber(data.empiricalProb, 2)}%</td>
                                </tr>
                                <tr className="bg-muted/30">
                                  <td className="px-2 py-1 font-medium">Theoretical Prob</td>
                                  <td className="px-2 py-1 text-right">{formatNumber(data.theoreticalProb, 2)}%</td>
                                </tr>
                                <tr>
                                  <td className="px-2 py-1 font-medium">Edge</td>
                                  <td className="px-2 py-1 text-right">{formatNumber(data.edge, 2)}%</td>
                                </tr>
                                <tr className="bg-muted/30">
                                  <td className="px-2 py-1 font-medium">Kelly %</td>
                                  <td className="px-2 py-1 text-right">{formatNumber(data.kellyFraction, 2)}%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                />
                <ReferenceLine y={0} stroke="#666" strokeDasharray="3 3" />
                
                <Scatter name="Targets" data={chartData} fill="#8884d8">
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getPointColor(entry.expectedValue)}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Target Analysis Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="h-9">
                  <TableHead className="px-2 py-1.5 font-medium">Target</TableHead>
                  <TableHead className="px-2 py-1.5 font-medium">Empirical</TableHead>
                  <TableHead className="px-2 py-1.5 font-medium">Theoretical</TableHead>
                  <TableHead className="px-2 py-1.5 font-medium">Expected Value</TableHead>
                  <TableHead className="px-2 py-1.5 font-medium">Edge</TableHead>
                  <TableHead className="px-2 py-1.5 font-medium">Kelly %</TableHead>
                  <TableHead className="px-2 py-1.5 font-medium">Recommendation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(data.target_analysis).map(([key, analysis]) => (
                  <TableRow key={key} className="h-10 hover:bg-muted/30">
                    <TableCell className="px-2 py-1.5">
                      <Badge variant="outline" className="font-mono">
                        {key}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-2 py-1.5">
                      <Badge 
                        variant={
                          analysis.empirical_probability >= 75 ? 'default' :
                          analysis.empirical_probability >= 50 ? 'secondary' :
                          analysis.empirical_probability >= 25 ? 'outline' :
                          'destructive'
                        }
                        className={
                          analysis.empirical_probability >= 75 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-0' :
                          analysis.empirical_probability >= 50 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-0' :
                          analysis.empirical_probability >= 25 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-0' :
                          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-0'
                        }
                      >
                        {analysis.empirical_probability.toFixed(2)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="px-2 py-1.5 text-muted-foreground text-sm">
                      {analysis.theoretical_probability.toFixed(2)}%
                    </TableCell>
                    <TableCell className="px-2 py-1.5">
                      <span className={`font-mono text-sm ${
                        analysis.expected_value > 0.1 ? 'text-green-600 dark:text-green-400 font-semibold' :
                        analysis.expected_value > 0 ? 'text-green-600 dark:text-green-400' :
                        analysis.expected_value > -0.05 ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-red-600 dark:text-red-400'
                      }`}>
                        {analysis.expected_value > 0 ? '+' : ''}
                        {formatNumber(analysis.expected_value, 4)}
                      </span>
                    </TableCell>
                    <TableCell className="px-2 py-1.5">
                      <Badge 
                        variant={analysis.edge > 0 ? 'default' : 'destructive'}
                        className={
                          analysis.edge > 0 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-0 font-semibold' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-0 font-semibold'
                        }
                      >
                        {analysis.edge > 0 ? '+' : ''}
                        {analysis.edge.toFixed(2)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="px-2 py-1.5">
                      <span className="font-mono text-sm text-muted-foreground">
                        {analysis.kelly_criterion.toFixed(2)}%
                      </span>
                    </TableCell>
                    <TableCell className="px-2 py-1.5">
                      <Badge 
                        variant={
                          analysis.recommendation.includes('Strongly favorable') ? 'default' :
                          analysis.recommendation.includes('Favorable') ? 'secondary' :
                          analysis.recommendation.includes('Neutral') ? 'outline' :
                          'destructive'
                        }
                        className={`text-xs ${
                          analysis.recommendation.includes('Strongly favorable') ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-0' :
                          analysis.recommendation.includes('Favorable') ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-0' :
                          analysis.recommendation.includes('Neutral') ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-0' :
                          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-0'
                        }`}
                      >
                        {analysis.recommendation}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}