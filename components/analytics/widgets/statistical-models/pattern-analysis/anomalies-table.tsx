'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getAnomalyColor } from './utils';
import type { PatternAnalysisData } from './types';

interface AnomaliesTableProps {
  data: PatternAnalysisData;
  anomalyThreshold: number;
}

export function AnomaliesTable({ data, anomalyThreshold }: AnomaliesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Anomalous Games</CardTitle>
        <CardDescription>
          Games with crash points that deviate significantly from the norm (Z-score &gt; {anomalyThreshold})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">IQR Bounds</Label>
              <p className="font-semibold">
                {data.anomalies.iqr_bounds.lower.toFixed(2)}x - {data.anomalies.iqr_bounds.upper.toFixed(2)}x
              </p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">IQR Anomalies</Label>
              <p className="font-semibold">{data.anomalies.iqr_anomaly_count} games</p>
            </div>
          </div>

          {data.anomalies.anomalous_games.length > 0 ? (
            <div className="rounded-md border max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow className="h-9">
                    <TableHead className="px-2 py-1.5">Game ID</TableHead>
                    <TableHead className="px-2 py-1.5">Crash Point</TableHead>
                    <TableHead className="px-2 py-1.5">Z-Score</TableHead>
                    <TableHead className="px-2 py-1.5">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.anomalies.anomalous_games.map((game) => (
                    <TableRow key={game.game_id} className="h-10">
                      <TableCell className="px-2 py-1.5 font-mono text-sm">
                        {game.game_id}
                      </TableCell>
                      <TableCell className="px-2 py-1.5">
                        {game.crash_point.toFixed(2)}x
                      </TableCell>
                      <TableCell className="px-2 py-1.5">
                        <Badge
                          variant="outline"
                          className={`text-xs ${getAnomalyColor(game.z_score)}`}
                        >
                          {game.z_score > 0 ? '+' : ''}{game.z_score.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-2 py-1.5 text-xs text-muted-foreground">
                        {new Date(game.time).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No anomalous games detected with current threshold
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}