"use client";

import { useMemo } from "react";
import { ClipboardList, Trash2, Edit, MoreVertical } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Plan, Task } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";


interface PlanCardProps {
  plan: Plan;
  tasks: Task[];
  onSelectPlan: (planId: string | null) => void;
  onEdit: (plan: Plan) => void;
  onDelete: (planId: string) => void;
  isSelected: boolean;
}

export default function PlanCard({ plan, tasks, onSelectPlan, onEdit, onDelete, isSelected }: PlanCardProps) {
  const { completedTasks, totalTasks, progress } = useMemo(() => {
    const relevantTasks = tasks.filter((t) => t.planId === plan.id);
    const completed = relevantTasks.filter((t) => t.completed).length;
    const total = relevantTasks.length;
    return {
      completedTasks: completed,
      totalTasks: total,
      progress: total > 0 ? (completed / total) * 100 : 0,
    };
  }, [tasks, plan.id]);

  return (
    <Card
      onClick={() => onSelectPlan(isSelected ? null : plan.id)}
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        isSelected ? 'border-primary ring-2 ring-primary' : 'border-border'
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
                <ClipboardList className="h-6 w-6 text-primary" />
                <div>
                    <CardTitle>{plan.title}</CardTitle>
                    {plan.description && <CardDescription className="mt-1">{plan.description}</CardDescription>}
                </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem onClick={() => onEdit(plan)}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(plan.id)}
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {totalTasks > 0 ? (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="text-sm font-medium">{completedTasks} / {totalTasks} Tasks</span>
            </div>
            <Progress value={progress} />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No tasks in this plan yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
