'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { formatClusterData, COLORS } from './utils';
import type { PatternAnalysisData } from './types';

interface ClusteringChartProps {
  data: PatternAnalysisData;
}

const chartConfig = {
  value: {
    label: 'Percentage',
  },
} satisfies ChartConfig;

export function ClusteringChart({ data }: ClusteringChartProps) {
  const clusterData = formatClusterData(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Crash Point Distribution</CardTitle>
        <CardDescription>
          Distribution of crash points across different categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={clusterData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {clusterData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <ChartTooltip
                content={(props) => {
                  if (!props.active || !props.payload?.length) return null;
                  const data = props.payload[0].payload;
                  
                  return (
                    <div className="border-border/50 bg-background rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
                      <div className="p-2 space-y-1">
                        <p className="text-sm font-medium">{data.name}</p>
                        <div className="rounded overflow-hidden border border-border/30 mt-2">
                          <table className="w-full">
                            <tbody>
                              <tr className="bg-muted/30">
                                <td className="px-2 py-1 font-medium">Count</td>
                                <td className="px-2 py-1 text-right">{data.count} games</td>
                              </tr>
                              <tr>
                                <td className="px-2 py-1 font-medium">Percentage</td>
                                <td className="px-2 py-1 text-right">{data.value.toFixed(2)}%</td>
                              </tr>
                              <tr className="bg-muted/30">
                                <td className="px-2 py-1 font-medium">Range</td>
                                <td className="px-2 py-1 text-right">{data.range}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="h-9">
                <TableHead className="px-2 py-1.5">Category</TableHead>
                <TableHead className="px-2 py-1.5 text-right">Count</TableHead>
                <TableHead className="px-2 py-1.5">Percentage</TableHead>
                <TableHead className="px-2 py-1.5">Range</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(data.clustering).map(([name, info], index) => (
                <TableRow key={name} className="h-10">
                  <TableCell className="px-2 py-1.5">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <span className="font-medium capitalize">{name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-2 py-1.5 text-right font-semibold">
                    {info.count}
                  </TableCell>
                  <TableCell className="px-2 py-1.5">
                    <Badge variant="outline" className="text-xs">
                      {info.percentage.toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="px-2 py-1.5 text-xs text-muted-foreground">
                    {info.range}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}