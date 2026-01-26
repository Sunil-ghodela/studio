"use client";

import { useMemo } from "react";
import type { Task, LifeGoal, Plan, VisionBoard } from "@/lib/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { MapPlaceholder } from "./map-placeholder";
import { ScrollArea } from "./ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { ListTodo, ClipboardList, HeartHandshake, GalleryHorizontal } from "lucide-react";

interface ActivityOverviewSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tasks: Task[];
  lifeGoals: LifeGoal[];
  plans: Plan[];
  visionBoards: VisionBoard[];
}

export function ActivityOverviewSheet({
  open,
  onOpenChange,
  tasks,
  lifeGoals,
  plans,
  visionBoards,
}: ActivityOverviewSheetProps) {
  const activityDates = useMemo(() => {
    const dates = new Set<Date>();
    tasks.forEach((task) => {
      dates.add(task.dueDate);
      if (task.completedAt) {
        dates.add(task.completedAt);
      }
    });
    lifeGoals.forEach((goal) => {
        if(goal.targetDate) {
            dates.add(goal.targetDate);
        }
    });
    return Array.from(dates);
  }, [tasks, lifeGoals]);

  const summaryStats = useMemo(() => ({
    pendingTasks: tasks.filter(t => !t.completed).length,
    activePlans: plans.length,
    inProgressGoals: lifeGoals.filter(g => g.status === 'In Progress').length,
    totalVisionBoards: visionBoards.length,
  }), [tasks, plans, lifeGoals, visionBoards]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full sm:max-w-3xl flex flex-col">
        <SheetHeader>
          <SheetTitle>Activity Overview</SheetTitle>
          <SheetDescription>
            A comprehensive summary of your activities and progress.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 -mx-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 px-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Current Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                        <ListTodo className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{summaryStats.pendingTasks}</div>
                    </CardContent>
                  </Card>
                   <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
                        <ClipboardList className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{summaryStats.activePlans}</div>
                    </CardContent>
                  </Card>
                   <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">In-Progress Goals</CardTitle>
                        <HeartHandshake className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{summaryStats.inProgressGoals}</div>
                    </CardContent>
                  </Card>
                   <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Vision Boards</CardTitle>
                        <GalleryHorizontal className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{summaryStats.totalVisionBoards}</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Activity Map</h3>
                <MapPlaceholder />
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Activity Calendar</h3>
                <Card>
                  <CardContent className="p-0">
                    <Calendar
                      mode="multiple"
                      selected={activityDates}
                      ISOWeek
                      className="w-full"
                    />
                  </CardContent>
                </Card>
                 <p className="text-xs text-muted-foreground mt-2">Dates with due tasks, completed tasks, and goal targets are highlighted.</p>
              </div>
            </div>
          </div>
        </ScrollArea>
        <SheetFooter className="mt-auto pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
