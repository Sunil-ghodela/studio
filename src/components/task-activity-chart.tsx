"use client"

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { format, subDays } from "date-fns";
import type { Task } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Activity } from "lucide-react";

interface TaskActivityChartProps {
  tasks: Task[];
}

const chartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function TaskActivityChart({ tasks }: TaskActivityChartProps) {
  const chartData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }).map((_, i) => subDays(new Date(), i)).reverse();
    
    return last7Days.map(day => {
      const completedOnDate = tasks.filter(task => {
          if (!task.completed || !task.completedAt) return false;
          
          const completedDate = new Date(task.completedAt);
          return format(completedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
      }).length;

      return {
        date: format(day, "MMM d"),
        shortDate: format(day, "E"),
        completed: completedOnDate,
      };
    });
  }, [tasks]);

  const yAxisDomain = [0, Math.max(5, ...chartData.map(d => d.completed))];

  return (
    <div>
      <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold tracking-tight">
        <Activity className="text-primary" />
        <span>Recent Activity</span>
      </h2>
      <Card>
        <CardHeader>
          <CardTitle>Completed Tasks</CardTitle>
          <CardDescription>Tasks completed in the last 7 days.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData} margin={{ right: 16 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="shortDate"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={yAxisDomain} 
                allowDecimals={false}
                stroke="#888888"
                fontSize={12}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent 
                    indicator="dot" 
                    labelFormatter={(_, payload) => {
                        if (payload && payload.length > 0) {
                            return `${payload[0].payload.date}`;
                        }
                        return '';
                    }}
                />}
              />
              <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
