"use client";

import { useMemo } from "react";
import type { Task } from "@/lib/types";
import { Progress } from "@/components/ui/progress";

interface TaskProgressProps {
  tasks: Task[];
}

export default function TaskProgress({ tasks }: TaskProgressProps) {
  const { completedCount, totalCount, progress } = useMemo(() => {
    const total = tasks.length;
    if (total === 0) {
      return { completedCount: 0, totalCount: 0, progress: 100 };
    }
    const completed = tasks.filter((t) => t.completed).length;
    return {
      completedCount: completed,
      totalCount: total,
      progress: (completed / total) * 100,
    };
  }, [tasks]);

  if (totalCount === 0) {
    return (
       <div className="space-y-2 rounded-lg border bg-card p-4 text-center shadow-sm">
         <h3 className="text-lg font-semibold">Welcome to TaskMaster!</h3>
         <p className="text-sm text-muted-foreground">Add your first task to get started.</p>
       </div>
    );
  }

  return (
    <div className="space-y-2 rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold">Your Progress</h3>
        <p className="text-sm font-medium text-muted-foreground">
          {completedCount} / {totalCount} tasks completed
        </p>
      </div>
      <Progress value={progress} aria-label={`${Math.round(progress)}% of tasks complete`} />
    </div>
  );
}
