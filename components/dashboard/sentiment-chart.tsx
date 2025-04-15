"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface SentimentData {
  name: string;
  value: number;
  count: number;
}

interface SentimentChartProps {
  data: SentimentData[];
}

const SENTIMENT_COLORS = {
  "Positive": "hsl(142, 76%, 36%)", // Green
  "Neutral": "hsl(45, 93%, 47%)",   // Yellow
  "Negative": "hsl(0, 84%, 60%)",   // Red
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border rounded-lg p-2 shadow-lg">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          {data.count} reviews ({data.value}%)
        </p>
      </div>
    );
  }
  return null;
};

export function SentimentChart({ data }: SentimentChartProps) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Sentiment Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, value, count }) =>
                  `${name}: ${count} (${value}%)`
                }
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={SENTIMENT_COLORS[entry.name as keyof typeof SENTIMENT_COLORS]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
